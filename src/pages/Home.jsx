/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect } from 'react'
import './Home.css'
import { assets } from "../assets/assets"
import AllBookings from "../components/AllBookings"

const Home = ({busDetails, setLogin}) => {

  console.log(busDetails)
  const busnumber = busDetails.busnumber;
  const onLogout = async() => {
    try {
      const response = await axios.post('https://server-lime-eight.vercel.app/api/bus/captain-logout', { busnumber: busnumber });
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
            const response = await axios.post('https://server-lime-eight.vercel.app/api/bus/update-location', {
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
    // Update location every 5 seconds
    const interval = setInterval(updateLocation, 5000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);


  return (
    <div className="home">
      <div className="home-upper">
        <div className="captain-details">
         <img src={assets.captain} className="captain-images" alt="" />
         <h3>Welcome Captain</h3>
        </div>
        <div className="bus-details">
        <p>Bus Name : {busDetails.busname}</p>
        <p>Bus Number : {busDetails.busnumber}</p>
        <p>Empty Seats : {busDetails.availableseats}</p>
        <p>Bus Status : {busDetails.status}</p>
        <button onClick={() => onLogout()} className="logout-button">logout</button>
        </div>
        
      </div>
      <hr />
      <div className="home-lower">
         <AllBookings busid = {busDetails._id}/> 
      </div>
    </div>
  )
}

export default Home
