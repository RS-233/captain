import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const TestSecond = ({source, destination}) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    // Ensure source and destination are valid
    // eslint-disable-next-line react/prop-types
    if (source && destination && Array.isArray(source) && source.length === 2 && Array.isArray(destination) && destination.length === 2) {
      console.log(source);

      // Fetch the route between the two points using OpenRouteService
      const fetchRoute = async () => {
        try {
          const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248136bace681094a669a5df3dc48f1dba0&start=${source.join(',')}&end=${destination.join(',')}`);

          // Log the full response to check its structure
          console.log(response.data); 

          // Check if the response contains valid coordinates
          const coordinates = response?.data?.features?.[0]?.geometry?.coordinates;

          if (!Array.isArray(coordinates)) {
            throw new Error('Coordinates data is not in the expected format');
          }

          const route = coordinates;
          const routeDistance = response.data.features[0].properties.segments[0].distance; // in meters
          const routeDuration = response.data.features[0].properties.segments[0].duration; // in seconds

          // Update the state with the route data, distance, and duration
          setRouteData(route);
          setDistance((routeDistance / 1000).toFixed(2)); // Convert meters to kilometers
          setDuration((routeDuration / 60).toFixed(2)); // Convert seconds to minutes
          // eslint-disable-next-line react/prop-types
          setStart(source.reverse());
          // eslint-disable-next-line react/prop-types
      setEnd(destination.reverse());
        } catch (error) {
          console.error('Error fetching the route:', error);
        }
      };

      fetchRoute();
    }
  }, [source, destination]);

  

  return (
    <div >
      <MapContainer center={start || [28.64864, 77.314916]} zoom={14} style={{ height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Render the Start Marker if start is valid */}
        {start && (
          <Marker position={start.reverse()}>
            <Popup>Start</Popup>
          </Marker>
        )}

        {/* Render the End Marker if end is valid */}
        {end && (
          <Marker position={end.reverse()}>
            <Popup>End</Popup>
          </Marker>
        )}

        {/* Render the Polyline if routeData is available */}
        {routeData && (
          <Polyline 
            positions={routeData.map(coord => [coord[1], coord[0]])} 
            color="#267BF1" 
            weight={6} 
            opacity={1} 
          />
        )}
      </MapContainer>

      {distance && duration && (
        <div>
          <h3>Route Info</h3>
          <p>Distance: {distance} km</p>
          <p>Time: {duration} minutes</p>
        </div>
      )}
    </div>
  );
};

export default TestSecond;
