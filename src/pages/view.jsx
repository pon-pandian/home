import React from 'react';
import EventCalendar from './calendar';
import Map from './map';
import { useJsApiLoader } from "@react-google-maps/api";

function View(props) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "" 
      });
    return (
        <div className="container pt-4">
        <div className="d-flex justify-content-center">
        <h4>View Page</h4>
        </div>
        <div className="container mt-3">
        <h4 className="text-center">Location Map</h4>
      
        <div> {isLoaded ? <Map /> : null }</div>
        <EventCalendar/>
        </div>
        
        </div>
    );
}

export default View;