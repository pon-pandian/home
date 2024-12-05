import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
   
    axios
      .get("http://localhost:5000/formdata")
      .then((response) => setLocations(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 0, 
    lng: 0,
  };

  return (
        // <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <LoadScript googleMapsApiKey="AIzaSyBkon0DfXRItmQ6AbvCccONbvXrrImZEQg">


      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={locations.length > 0 ? locations[0].location : center}
        zoom={10}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.location.lat, lng: loc.location.lng }}
            title={loc.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
