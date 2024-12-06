import React from 'react';
import EventCalendar from '../components/calendar';
import Map from '../components/map';
import Datas from '../components/datas';

function View(props) {

    return (
        <div className="container pt-4">
        <div className="d-flex justify-content-center">
        <h4>View Page</h4>
        </div>
        <div className="container mt-3">
        <h4 className="text-center">Location Map</h4>
      
        <div> <Map /> </div>
        {/* <EventCalendar/> */}
        <Datas />
        </div>
        
        </div>
    );
}

export default View;