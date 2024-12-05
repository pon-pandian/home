import React from 'react';
import Map from './Map';
import EventCalendar from './calander';

function View(props) {
    return (
        <div className="container pt-4">
     <div className="d-flex justify-content-center">
        <h4>View Page</h4>
        </div>
        <div className="container mt-5">
      <h1 className="text-center">Location Map</h1>
      <Map />
      <EventCalendar/>
          </div>
            
        </div>
    );
}

export default View;