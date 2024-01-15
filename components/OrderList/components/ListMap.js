import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScriptNext, MarkerF, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const ListMap = ({ address, onDistanceAndDuration }) => {
    const [position, setPosition] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [directions, setDirections] = useState(null);

    useEffect(() => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&sensor=false`)
            .then(response => response.json())
            .then(data => {
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

    useEffect(() => {
        if (position) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: address,
                    destination: '123 Main St, Blackburn VIC 3130',
                    travelMode: 'DRIVING',
                },
                (result, status) => {
                    if (status === 'OK') {
                        setDirections(result);
                        const distance = result.routes[0].legs[0].distance.text;
                        const duration = result.routes[0].legs[0].duration.text;
                        if (onDistanceAndDuration) {
                            onDistanceAndDuration(distance, duration);
                        }
                    } else {
                        console.error('Error fetching directions:', status);
                    }
                }
            );
        }
    }, [position, address, onDistanceAndDuration]);

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
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScriptNext>
    );
};

export default ListMap;
