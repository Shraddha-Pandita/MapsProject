import React, { useState, useEffect } from 'react';
import GetDirectionInMap from './GetDirectionInMap';
import Select from 'react-select';
import axios from 'axios'; 
import { LoadScript } from '@react-google-maps/api';
import './App.css';

const App = () => {
  const apiKey = 'AIzaSyC1aJzHHuQ20GxDNljmgBGbNpCHCIxgLKg';
  const citiesApiUrl = 'https://gist.githubusercontent.com/dastagirkhan/00a6f6e32425e0944241/raw/33ca4e2b19695b2b93f490848314268ed5519894/gistfile1.json'

  const [cities, setCities] = useState([]);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [finalState,setFinalState] = useState(null)

  useEffect(() => {

    const fetchCities = async () => {
      try {
        const response = await axios.get(citiesApiUrl);
        setCities(response.data);
        setSource(response.data[0]);
        setDestination(response.data[1]);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [citiesApiUrl]);

  const handleSourceChange = (selectedOption) => {
    setSource(selectedOption);
  };

  const handleDestinationChange = (selectedOption) => {
    setDestination(selectedOption);
  };

  const handleGoClick = () => {
    const cityNameToFetch = 'Mumbai';

    const selectedCity = cities.find(city => city.name === cityNameToFetch);

    
    if (source && destination) {
      console.log('Selected source city value:', source?.value);
      console.log('Selected destination city value:', destination?.value);
    }
  };

  return (
    <div>
      <h1>Path Finder</h1>
      <div className="dropdown-container">
        <label>Source City:</label>
        <Select
          options={cities.map(city => ({ value: city, label: city.name }))}
          value={source}
          onChange={handleSourceChange}
        />
      </div>
      <div className="dropdown-container">
        <label>Destination City:</label>
        <Select
          options={cities.map(city => ({ value: city, label: city.name }))}
          value={destination}
          onChange={handleDestinationChange}
        />
      </div>
      <button className="go-button" onClick={handleGoClick}>
        Go
      </button>
      <LoadScript googleMapsApiKey={apiKey}>
      <GetDirectionInMap apiKey={apiKey} origin={source?.value} destination={destination?.value} />
    </LoadScript>
      
    </div>
  );
};

export default App;