import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const GetDirectionInMap = ({ apiKey, origin, destination }) => {
  const [response, setResponse] = useState(null);

  const directionsCallback = (res) => {
    if (res !== null && res.status === 'OK') {
      setResponse(res);
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={origin}
        zoom={10}
      >
        <DirectionsService
          options={{
            destination,
            origin,
            travelMode: 'DRIVING',
          }}
          callback={directionsCallback}
        />
        {response && <DirectionsRenderer directions={response} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GetDirectionInMap;