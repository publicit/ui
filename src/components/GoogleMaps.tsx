import React, { useEffect, useState } from 'react';

// Helpers :
import { uuidV4 } from '../helpers/uuid';

// Models :
import { Location } from '../models/location';

import {
  Marker,
  GoogleMap,
  useLoadScript,
  GoogleMapProps,
} from '@react-google-maps/api';

type params = {
  locations: Location[];
  onClick: (coordinate: Location) => {};
};
export const GoogleMaps = ({ locations, onClick }: params) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const handleMapClick: GoogleMapProps['onClick'] = evnet => {
    const lat = evnet.latLng.lat();
    const lng = evnet.latLng.lng();
    const c = new Location();
    c.lat = lat;
    c.lng = lng;
    onClick(c);
  };

  const handleMarkerClick = (lat: number, lng: number) => {
    //  TODO: figure it out if we still need this
  };

  if (!isLoaded) {
    return <div>Loading</div>;
  }

  return (
    <React.Fragment>
      {currentLocation ? (
        <>
          <GoogleMap
            zoom={17}
            center={currentLocation}
            onClick={handleMapClick}
            mapContainerClassName="map-container"
          >
            {locations.map(el => (
              <Marker
                key={uuidV4()}
                position={el}
                onClick={() =>
                  handleMarkerClick(el.lat as number, el.lng as number)
                }
              />
            ))}
          </GoogleMap>
        </>
      ) : (
        <div className="map-container location-off-message">
          Por favor activa tu ubicación
        </div>
      )}
    </React.Fragment>
  );
};
