import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

const Generate = () => {
  const [location, setLocation] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [generateDate, setGenerateDate] = useState("");
  const [isSameDate, setIsSameDate] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [fileFormat, setFileFormat] = useState("");

  const handleLocationChange = (e) => setLocation(e.target.value);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentDate") {
      setCurrentDate(value);
      if (isSameDate) {
        setGenerateDate(value);
      }
    } else if (name === "generateDate") {
      setGenerateDate(value);
    }
  };

  const handleCheckboxChange = () => {
    setIsSameDate(!isSameDate);
    if (!isSameDate) {
      setGenerateDate(currentDate);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileFormatChange = (e) => setFileFormat(e.target.value);

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text("Form Data", 10, 10);
    pdf.text(`Location: ${location}`, 10, 20);
    pdf.text(`Current Date: ${currentDate}`, 10, 30);
    pdf.text(`Generate Date: ${generateDate}`, 10, 40);
    pdf.text(`First Name: ${formData.firstName}`, 10, 50);
    pdf.text(`Last Name: ${formData.lastName}`, 10, 60);
    pdf.text(`Email: ${formData.email}`, 10, 70);
    pdf.text(`Address: ${formData.address}`, 10, 80);
    pdf.text(`Phone Number: ${formData.phoneNumber}`, 10, 90);
    return pdf;
  };

  const generateExcel = () => {
    const data = [
      {
        "Location": location,
        "Current Date": currentDate,
        "Generate Date": generateDate,
        "First Name": formData.firstName,
        "Last Name": formData.lastName,
        "Email": formData.email,
        "Address": formData.address,
        "Phone Number": formData.phoneNumber,
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FormData");
    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    return new Blob([excelFile], { type: "application/octet-stream" });
  };

  const handleSubmit = async () => {
    let file, fileName;

    if (fileFormat === "pdf") {
      const pdf = generatePDF();
      file = new Blob([pdf.output("blob")], { type: "application/pdf" });
      fileName = "FormData.pdf";
      pdf.save(fileName);
    } else if (fileFormat === "excel") {
      file = generateExcel();
      fileName = "FormData.xlsx";
      saveAs(file, fileName);
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append("files", new File([file], fileName));

    try {
      const response = await axios.post("http://localhost:5000/upload", formDataToUpload);
      console.log("Uploaded Successfully:", response.data);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div className="container pt-4">
       <div className="d-flex justify-content-center">
        <h4>Form Page</h4>
        </div>
     
      <Form className="row d-md-flex">
        <Form.Group className="col-12 col-md-4">
          <Form.Label>Location</Form.Label>
          <Form.Control as="select" value={location} onChange={handleLocationChange}>
            <option value="">Select Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Madurai">Madurai</option>
            <option value="Trichy">Trichy</option>
            <option value="Erode">Erode</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Label>Current Date</Form.Label>
          <Form.Control
            type="date"
            name="currentDate"
            value={currentDate}
            onChange={handleDateChange}
          />
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Label>Generate Date</Form.Label>
          <Form.Control
            type="date"
            name="generateDate"
            value={generateDate}
            onChange={handleDateChange}
            disabled={isSameDate}
          />
        </Form.Group>
        <Form.Group className="col-12 mt-3 mb-3 d-flex justify-content-center">
          <Form.Check
            type="checkbox"
            label="Both Dates Same"
            checked={isSameDate}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="col-12 col-md-4">
          <Form.Label>File Format</Form.Label>
          <Form.Control as="select" value={fileFormat} onChange={handleFileFormatChange}>
            <option value="">Select Format</option>
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" className="col-2 ms-3 mt-3" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Generate;
