import  { useState } from 'react';
import axios from 'axios';
import Gmap from './Gmap'

const OpenRouteServiceComponent = () => {
  const[start, setStart] = useState('');
  const[end, setEnd] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [sourceCoords, setSourceCoords] = useState('');
  const [destinationCoords, setDestinationCoords] = useState('');
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = '5b3ce3597851110001cf6248136bace681094a669a5df3dc48f1dba0';
  const GEOCODING_URL = 'https://api.openrouteservice.org/geocode/autocomplete';
  
  const fetchSuggestions = async (query, type) => {
    setIsLoading(true);
    try {
      const response = await axios.get(GEOCODING_URL, {
        params: {
          api_key: API_KEY,
          text: query,
        },
      });

      const suggestions = response.data.features.map((feature) => ({
        name: feature.properties.label,
        coordinates: feature.geometry.coordinates,
      }));

      if (type === 'source') {
        setSourceSuggestions(suggestions);
      } else {
        setDestinationSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    setIsLoading(false);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    if (e.target.value.length > 2) {
      fetchSuggestions(e.target.value, 'source');
    } else {
      setSourceSuggestions([]);
    }
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    if (e.target.value.length > 2) {
      fetchSuggestions(e.target.value, 'destination');
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSourceSelect = (suggestion) => {
    setSource(suggestion.name);
    setSourceCoords(suggestion.coordinates);
    setSourceSuggestions([]);
  };
  const busid = '67c158c4dfa0d9749679e8d7'

  const handleDestinationSelect = (suggestion) => {
    setDestination(suggestion.name);
    setDestinationCoords(suggestion.coordinates);
    setDestinationSuggestions([]);
  };

  const logCoordinates = () => {
    if (sourceCoords && destinationCoords) {
       setStart(`${sourceCoords[0]},${sourceCoords[1]}`)
       setEnd(`${destinationCoords[0]},${destinationCoords[1]}`)
    } else {
      console.log('Please select valid source and destination locations.');
    }
  };

  const clickButton = async() => {
    const response = await axios.post(`http://localhost:4000/api/bus/get-bus-by-id/${busid}`);
    console.log(response);
    console.log(response.data.bus.location)
  }

  return (
    <div className="container">
      <div>
        <h1>Source and Destination Input</h1>
        <input
          type="text"
          value={source}
          onChange={handleSourceChange}
          placeholder="Enter source"
        />
        {sourceSuggestions.length > 0 && (
          <ul>
            {sourceSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSourceSelect(suggestion)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <input
          type="text"
          value={destination}
          onChange={handleDestinationChange}
          placeholder="Enter destination"
        />
        {destinationSuggestions.length > 0 && (
          <ul>
            {destinationSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleDestinationSelect(suggestion)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={logCoordinates}>Log Coordinates</button>

      {isLoading && <p>Loading...</p>}

      <div>
        <h2>Coordinates:</h2>
        {sourceCoords && destinationCoords ? (
          <div>
            <p>Source Coordinates: {sourceCoords[1]}, {sourceCoords[0]}</p>
            <p>Destination Coordinates: {destinationCoords[1]}, {destinationCoords[0]}</p>
          </div>
        ) : (
          <p>Please select source and destination.</p>
        )}
      </div>
      <div>
        <Gmap source={source} destination={destination}/>

        <button onClick={() => {clickButton()}}>locate bus</button>
      </div>
    </div>
  );
};

export default OpenRouteServiceComponent;
