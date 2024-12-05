import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const EventCalendar = () => {
  const [formData, setFormData] = useState([]); // Data fetched from the server
  const [currentDate, setCurrentDate] = useState(new Date()); // Currently selected date

  // Fetch data from the backend on component mount
  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/formdata"); // Backend API to fetch data
      setFormData(response.data); // Store fetched data
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  // Highlight tiles in the calendar that have events
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      const hasEvent = formData.some(
        (event) =>
          new Date(event.generateDate).toISOString().split("T")[0] === formattedDate
      );

      if (hasEvent) {
        return <div className="event-dot bg-primary"></div>;
      }
    }
    return null;
  };

  // Filter events for the selected date
  const eventsOnCurrentDate = formData.filter(
    (event) =>
      new Date(event.generateDate).toDateString() === currentDate.toDateString()
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Event Calendar</h2>

      {/* Current Date Display */}
      <div className="text-center mb-3">
        <strong>Current Date: </strong>
        {currentDate.toDateString()}
      </div>

      {/* Calendar Component */}
      <Calendar
        tileContent={tileContent}
        onChange={setCurrentDate} // Update currentDate when a date is selected
        value={currentDate}
      />

      {/* Events List */}
      <div className="mt-4">
        <h4>Events on {currentDate.toDateString()}:</h4>
        {eventsOnCurrentDate.length > 0 ? (
          <ul className="list-group">
            {eventsOnCurrentDate.map((event) => (
              <li className="list-group-item" key={event._id}>
                <strong>{event.name}</strong>
                <br />
                Location: Lat {event.location.lat}, Lng {event.location.lng}
                <br />
                Date: {new Date(event.generateDate).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No events on this date.</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
