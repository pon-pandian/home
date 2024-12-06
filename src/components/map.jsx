import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const localizer = momentLocalizer(moment);

function Maps() {
  const [events, setEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationCoordinates = {
    Chennai: { lat: 13.08268, lng: 80.27072 },
    Coimbatore: { lat: 11.01684, lng: 76.95583 },
    Erode: { lat: 11.34104, lng: 77.71716 },
    Salem: { lat: 11.664325, lng: 78.146011 },
    Madurai: { lat: 9.92520, lng: 78.11978 },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/datas")
      .then((response) => {
        const formattedEvents = response.data.map((file) => {
          let eventStart = new Date(file.generateDate);

          if (isNaN(eventStart.getTime())) {
            console.error(`Invalid generate date: ${file.generateDate}`);
            eventStart = new Date();
          }

          eventStart.setHours(0, 0, 0, 0);

          let eventEnd = new Date(eventStart);
          eventEnd.setHours(23, 59, 59, 999);

          const location = file.parsedData.Location;
          setSelectedLocation(locationCoordinates[location]);

          return {
            title: file.parsedData.Event || "No Event",
            start: file.parsedData.GenerateDate,
            end: file.parsedData.GenerateDate,
            location: location || "No Location",
            generateDate: file.parsedData.GenerateDate,
            locationDetails: location || "Not Found",
          };
        });

        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching file details:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Event Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'agenda']}
        eventPropGetter={(event) => ({
          title: event.title,
          description: `Location: ${event.locationDetails}`,
        })}
        popup
        onSelectEvent={(event) => {
          alert(`Event: ${event.title}\nLocation: ${event.locationDetails}\nGenerate Date: ${event.generateDate}`);
        }}
      />

      {/* Google Map */}
      {selectedLocation && (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={selectedLocation}
            zoom={10}
          >
            <Marker position={selectedLocation} />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
}

export default Maps;



// import React, { useState } from "react";
// import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";

// const markers = [
//   { id: 1, name: "Chennai", position: { lat: 13.08268, lng: 80.27072 } },
//   { id: 2, name: "Coimbatore", position: { lat: 11.01684, lng: 76.95583 } },
//   { id: 3, name: "Erode", position: { lat: 11.34104, lng: 77.71716 } },
//   { id: 4, name: "Salem", position: { lat: 11.664325, lng: 78.146011 } },
//   { id: 5, name: "Madurai", position: { lat: 9.9252, lng: 78.11978 } },
// ];

// function Map() {
//   const [activeMarker, setActiveMarker] = useState(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "", 
//   });

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   const handleActiveMarker = (marker) => {
//     if (marker === activeMarker) {
//       return;
//     }
//     setActiveMarker(marker);
//   };

//   const handleOnLoad = (map) => {
//     const bounds = new window.google.maps.LatLngBounds();
//     markers.forEach(({ position }) => bounds.extend(position));
//     map.fitBounds(bounds);
//   };

//   return (
//     <div className="d-flex justify-content-center">
//       <GoogleMap
//         onLoad={handleOnLoad}
//         onClick={() => setActiveMarker(null)}
//         mapContainerStyle={{ width: "50vw", height: "50vh" }}
//       >
//         {markers.map(({ id, name, position }) => (
//           <Marker
//             key={id}
//             position={position}
//             onClick={() => handleActiveMarker(id)}
//           >
//             {activeMarker === id ? (
//               <InfoWindow onCloseClick={() => setActiveMarker(null)}>
//                 <div className="text-dark fw-bold">{name}</div>
//               </InfoWindow>
//             ) : null}
//           </Marker>
//         ))}
//       </GoogleMap>
//     </div>
//   );
// }

// export default Map;
