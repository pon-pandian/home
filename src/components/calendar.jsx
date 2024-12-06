// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment"; 
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// function FileDataCalendar() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/datas")
//       .then((response) => {
//         const formattedEvents = response.data.map((file) => {
          
//           let eventStart = new Date(file.generateDate);

//           if (isNaN(eventStart.getTime())) {
//             console.error(`Invalid generate date: ${file.generateDate}`);
//             eventStart = new Date(); 
//           }

//           eventStart.setHours(0, 0, 0, 0);

//           let eventEnd = new Date(eventStart);
//           eventEnd.setHours(23, 59, 59, 999); 

//           return {
//             title: file.parsedData.Event || "No Event",
//             start: file.parsedData.GenerateDate,
//             end: file.parsedData.GenerateDate,
//             location: file.parsedData.Location || "No Location",
//             generateDate: file.parsedData.GenerateDate,
//             locationDetails: file.parsedData.Location || "Not Found",
//           };
//         });

//         setEvents(formattedEvents);
//       })
//       .catch((error) => {
//         console.error("Error fetching file details:", error);
//       });
//   }, []);

//   return (
//     <div className="container">
//       <h2>Event Calendar</h2>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//         views={['month', 'agenda']} 
//         eventPropGetter={(event) => ({
//           title: event.title,
//           description: `Location: ${event.locationDetails}`,
//         })}
//         popup
//         onSelectEvent={(event) => {
//           alert(`Event: ${event.title}\nLocation: ${event.locationDetails}\nGenerate Date: ${event.generateDate}`);
//         }}
//       />
//     </div>
//   );
// }

// export default FileDataCalendar;
