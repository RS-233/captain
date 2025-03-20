import { useState } from 'react'
import Login from './pages/Login'
import axios from 'axios'
import Home from './pages/Home'



const App = () => {
  const [login, setLogin] = useState(false)
  const busNumber = '';
  const [busDetails, setBusDetails] = useState('');
  console.log(busNumber);
  const onLogin = async(busNumber) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = (position.coords.latitude)
          const longitude = (position.coords.longitude)
          console.log(latitude, longitude);
          
          // Send the location to the backend (Optional)
          try {
            const response = await axios.post('https://final-server-gules.vercel.app/api/bus/captain-login', {
              busnumber: busNumber,
              latitude: latitude,
              longitude: longitude
            });
            if(!response){
              console.log('error')
            }else{
              setBusDetails(response.data.response)
              setLogin(true);
            }

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
  //{ login ? <Home /> : <Login setLogin={setLogin} /> }

  // search coordinate by using place name -> 
  https://api.openrouteservice.org /geocode/search? api_key = 5b3ce3597851110001cf6248136bace681094a669a5df3dc48f1dba0& text = new delhi railwar station& sources = geonames& size = 1

  console.log(login);

  return (
    <div>
     { login ? <Home  busDetails={busDetails} setLogin={setLogin} /> : <Login onLogin={onLogin}/> }
    </div>
  )
}

export default App
