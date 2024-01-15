import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api';

const ContactMap = ({ address }) => {
  const [position, setPosition] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&sensor=false`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === "OK") {
          const location = data.results[0].geometry.location;
          setPosition({ lat: location.lat, lng: location.lng });
        } else {
          console.error("Error from Google Maps API:", data.status);
        }
      })
      .catch(error => {
        console.error('Error in fetching coordinates:', error);
      });
  }, [address]);

  if (!position) {
    return <p>Loading map...</p>;
  }

  return (
    <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        onLoad={() => setMapLoaded(true)}
        mapContainerStyle={{ height: '15rem', width: '100%' }}
        center={position}
        zoom={13}
      >
        {mapLoaded && <MarkerF position={position} key={`${position.lat}-${position.lng}`} />}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default ContactMap;