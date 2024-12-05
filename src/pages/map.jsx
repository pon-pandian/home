import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const markers = [
  {
    id: 1,
    name: "Chennai",
    position: { lat: 13.08268, lng: 80.27072 }
  },
  {
    id: 2,
    name: "Coimbatore",
    position: { lat: 11.01684, lng: 76.95583}
  },
  {
    id: 3,
    name: "Erode",
    position: { lat: 11.34104, lng:77.71716}
  },
  {
    id: 4,
    name: "Salem",
    position: { lat:11.664325, lng: 78.146011}
  }
  ,
  {
    id: 5,
    name: "Madurai",
    position: { lat:9.92520, lng: 78.11978}
  }
];

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <div className="d-flex justify-content-center">
          <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "50vw", height: "50vh" }}
    >
      {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow className="" onCloseClick={() => setActiveMarker(null)}>
              <div className="text-dark fw-bold">{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>

    </div>
  
  );
}

export default Map;