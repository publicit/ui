import React, {useEffect, useState} from 'react'
import {
    Marker,
    GoogleMap,
    MarkerProps,
    useLoadScript,
    GoogleMapProps,
} from "@react-google-maps/api";
import {Button} from '@mantine/core';
import {Coordinate} from "../models/coordinate";
import {uuidV4} from "../helpers/uuid";

type params = {
    selectedLocation: MarkerProps['position'][]
    setSelectedLocation: React.Dispatch<React.SetStateAction<MarkerProps['position'][]>>
    onClick: (coordinate: Coordinate) => {}
}
export const GoogleMaps = ({selectedLocation, setSelectedLocation, onClick}: params) => {
    const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords;
                setCurrentLocation({lat: latitude, lng: longitude});
            });
        } else {
            console.error("Geolocation is not supported by this browser");
        }
    }, []);

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })

    const handleMapClick: GoogleMapProps['onClick'] = (evnet) => {
        const lat = evnet.latLng.lat();
        const lng = evnet.latLng.lng();
        setSelectedLocation([...selectedLocation, {lat, lng}]);
        const c = new Coordinate()
        c.lat = lat
        c.lng = lng
        onClick(c)
    }

    const handleMarkerClick = (lat: number, lng: number) => {
        //  TODO: figure it out if we still need this
    }

    if (!isLoaded) {
        return (
            <div>
                Loading
            </div>
        );
    }
    return (
        <>
            {currentLocation ?
                <>
                    <GoogleMap
                        zoom={17}
                        center={currentLocation}
                        onClick={handleMapClick}
                        mapContainerClassName="map-container"
                    >
                        {selectedLocation.map((el, index) => (
                            <Marker
                                key={uuidV4()}
                                position={el}
                                onClick={() => handleMarkerClick(el.lat as number, el.lng as number)}
                            />
                        ))}
                    </GoogleMap>
                </> :
                <div className='map-container location-off-message'>Por favor activa tu ubicación</div>}
        </>
    )
}

