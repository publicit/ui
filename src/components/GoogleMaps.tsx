import React, { useEffect, useState } from 'react'
import {
    Marker,
    GoogleMap,
    MarkerProps,
    useLoadScript,
    GoogleMapProps,
} from "@react-google-maps/api";
import { Button } from '@mantine/core';

type params = {
    selectedLocation: MarkerProps['position'][]
    setSelectedLocation: React.Dispatch<React.SetStateAction<MarkerProps['position'][]>>
}
const GoogleMaps = ({ selectedLocation, setSelectedLocation }: params) => {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
            });
        } else {
            console.error("Geolocation is not supported by this browser");
        }
    }, []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })

    const handleMapClick: GoogleMapProps['onClick'] = (evnet) => {
        const lat = evnet.latLng.lat();
        const lng = evnet.latLng.lng();
        setSelectedLocation([...selectedLocation, { lat, lng }]);
    }

    const handleMarkerClick = (lat: number, lng: number) => {
        window.open(`https://www.google.com/maps/@${lat},${lng}`, "__blank");
    }

    if (!isLoaded) {
        return (
            <div>
                Loading
            </div>
        );
    }
    const handleRemovePoint = (index: number) => {
        const updatedPoints = selectedLocation.filter((_, i) => i !== index);
        setSelectedLocation(updatedPoints);
    };
    return (
        <>
            {currentLocation ?
                <React.Fragment>
                    <GoogleMap
                        zoom={17}
                        center={currentLocation}
                        onClick={handleMapClick}
                        mapContainerClassName="map-container"
                    >
                        {selectedLocation.map((el, index) => (
                            <Marker
                                key={index}
                                position={el}
                                onClick={() => handleMarkerClick(el.lat as number, el.lng as number)}
                            />
                        ))}
                    </GoogleMap>
                    <h2>Puntos Seleccionados:</h2>
                    <ul className='locations-list'>
                        {selectedLocation.map((point, index) => (
                            <li key={index}>
                                <a
                                    href={`https://www.google.com/maps/@${point.lat},${point.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {`https://www.google.com/maps/@${point.lat},${point.lng}`}
                                </a>
                                <Button
                                    variant='outline' mt="sm"
                                    onClick={() => handleRemovePoint(index)}
                                >
                                    Eliminar
                                </Button>
                            </li>
                        ))}
                    </ul>
                </React.Fragment> :
                <div className='map-container location-off-message'>Por favor activa tu ubicación</div>}
        </>
    )
}

export default GoogleMaps
