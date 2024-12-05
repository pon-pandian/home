// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import axios from "axios";

// const Map = () => {
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
   
//     axios
//       .get("http://localhost:5000/formdata")
//       .then((response) => setLocations(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const mapContainerStyle = {
//     width: "100%",
//     height: "500px",
//   };

//   const center = {
//     lat: 0, 
//     lng: 0,
//   };

  

//   return (
//         // <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//     //       <LoadScript googleMapsApiKey={"AIzaSyCzjUh11-H0A93kd8j_4f7qAWys3j5e3SY"}>
//     //   <GoogleMap
//     //     mapContainerStyle={mapContainerStyle}
//     //     center={locations.length > 0 ? locations[0].location : center}
//     //     zoom={10}
//     //   >
//     //     {locations.map((loc, index) => (
//     //       <Marker
//     //         key={index}
//     //         position={{ lat: loc.location.lat, lng: loc.location.lng }}
//     //         title={loc.name}
//     //       />
//     //     ))}
//     //   </GoogleMap>
//     // </LoadScript>
//     <>

//        <LoadScript googleMapsApiKey={"AIzaSyCzjUh11-H0A93kd8j_4f7qAWys3j5e3SY"}>
//        <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={locations.length > 0 ? locations[0].location : center}
//         zoom={10}
//        >
//         {locations.map((loc, index) => (
//            <Marker
//             key={index}
//             position={{ lat: "48.856614", lng: "2.352221" }}
//             title={loc.name}
//           />
//         ))}
//        </GoogleMap>
//      </LoadScript> 

    
//     </>
//   );
// };

// export default Map;

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