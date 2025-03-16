/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect } from 'react'

const Home = ({busDetails, setLogin}) => {

  console.log(busDetails)
  const busnumber = busDetails.busnumber;
  const onLogout = async() => {
    try {
      const response = await axios.post('http://localhost:4000/api/bus/captain-logout', { busnumber: busnumber });
      if(!response){
        console.log("error")
      }else{
        setLogin(false);
        console.log(response);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Send the location to the backend (Optional)
          try {
            const response = await axios.post('http://localhost:4000/api/bus/update-location', {
              busnumber: busnumber,
              latitude: latitude,
              longitude: longitude
            });
            console.log(response.data.response.location);
          } catch (err) {
            console.error("Error sending location:", err);
          }
        },
        (err) => {
          console.log(err.message || "Failed to get location");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  };

  useEffect(() => {
    // Update location every 10 seconds
    const interval = setInterval(updateLocation, 5000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);


  return (
    <div>
      <button onClick={() => onLogout()}>logout</button>
      <h1>WelCome Captain</h1>
      <p>{busDetails.busname}</p>
      <p>{busDetails.busnumber}</p>
    </div>
  )
}

export default Home
