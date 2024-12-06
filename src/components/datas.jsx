import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function Datas() {
  const [fileDetails, setFileDetails] = useState([]);

  useEffect(() => {
    
    axios.get("http://localhost:5000/datas")
      .then(response => {
        setFileDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching file details:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>File Data</h2>
      {fileDetails.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Generate Date</th>
              <th>Current Date</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {fileDetails.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>{new Date(file.generateDate).toLocaleString()}</td>
                <td>{new Date(file.currentDate).toLocaleString()}</td>
                <td>
                  {Object.keys(file.parsedData).map((key) => (
                    <div key={key}>
                      <strong>{key}:</strong> {file.parsedData[key]}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Datas;
