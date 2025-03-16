import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Set initial state for the app
const Map = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // GoMapsPro API key and URL
  const apiKey = 'AlzaSyVqDpoF65t_HR_XqnvpccnSk_dnLuK5tqj'; // Replace with your GoMapsPro API Key
  const apiUrl = `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&key=AlzaSyVqDpoF65t_HR_XqnvpccnSk_dnLuK5tqj&origin=${source}`;

  // Function to fetch route directions
  const fetchRoute = async () => {
    if (!source || !destination) {
      setError('Please provide both source and destination.');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      // Call GoMapsPro API for directions
      const response = await axios.get(apiUrl);

      // Assuming GoMapsPro API responds with directions and route data
      const route = response.data;
      console.log(route);
      
      if (route && route.routes && route.routes.length > 0) {
        setDirections(route.routes[0]);
      } else {
        setError('Unable to fetch directions. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while fetching directions.');
    }
    setLoading(false);
  };

  // Handle changes in source and destination input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'source') setSource(value);
    if (name === 'destination') setDestination(value);
  };
  
  // Render the map with the fetched directions
  const renderMap = () => {
    if (!directions) return null;

    const { legs } = directions;
    const routeCoordinates = [];
    let distance = 0;
    let duration = 0;

    legs[0].steps.forEach((step) => {
      const { start_location, end_location } = step;
      routeCoordinates.push([start_location.lat, start_location.lng]);
      routeCoordinates.push([end_location.lat, end_location.lng]);

      distance += step.distance.value;
      duration += step.duration.value;
    });
    console.log(routeCoordinates)
    const totalDistance = (distance / 1000).toFixed(2); // in km
    const totalDuration = (duration / 60).toFixed(0); // in minutes

    return (
      <>
        <h3>Route Info:</h3>
        <p>Distance: {totalDistance} km</p>
        <p>Estimated Time: {totalDuration} min</p>
        <p>Directions:</p>
        <ul>
          {legs[0].steps.map((step, index) => (
            <li key={index}>{step.html_instructions}</li>
          ))}
        </ul>

      

        <MapContainer
          center={[legs[0].start_location.lat, legs[0].start_location.lng]}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={routeCoordinates} color="blue" />
          <Marker position={[legs[0].start_location.lat, legs[0].start_location.lng]}>
            <Popup>Start: {source}</Popup>
          </Marker>
          <Marker position={[legs[0].end_location.lat, legs[0].end_location.lng]}>
            <Popup>Destination: {destination}</Popup>
          </Marker>
        </MapContainer>
      </>
    );
  };

  return (
    <div className="App">
      <h1>Route Finder</h1>
      <div>
        <input
          type="text"
          name="source"
          value={source}
          onChange={handleInputChange}
          placeholder="Enter Source"
        />
        <input
          type="text"
          name="destination"
          value={destination}
          onChange={handleInputChange}
          placeholder="Enter Destination"
        />
        <button onClick={fetchRoute}>Get Route</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {renderMap()}
    </div>
  );
};

export default Map;
