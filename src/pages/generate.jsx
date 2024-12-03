import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const Generate = () => {

  const [location, setLocation] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [generateDate, setGenerateDate] = useState("");
  const [isSameDate, setIsSameDate] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fileFormat, setFileFormat] = useState("pdf");

  const handleDateCheckbox = () => {
    setIsSameDate(!isSameDate);
    if (!isSameDate && currentDate) {
      setGenerateDate(currentDate);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileFormat === "pdf") {
      try {
        const newFileData = {
          name: `${firstName}_${lastName}_${currentDate}.${fileFormat}`,
          path: `uploads/${firstName}_${lastName}_${currentDate}.${fileFormat}`,
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
          location,
          generateDate,
        };

        await axios.post("http://localhost:5000/upload", newFileData);
        alert("File added successfully!");

        
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    }
  };

  return (
    <Container className="pt-4">
      <h1>Create File and Submit</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Chennai</option>
                <option>Coimbatore</option>
                <option>Madurai</option>
                <option>Trichy</option>
                <option>Erode</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="currentDate">
              <Form.Label>Current Date</Form.Label>
              <Form.Control
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="generateDate">
              <Form.Label>Generate Date</Form.Label>
              <Form.Control
                type="date"
                value={generateDate}
                onChange={(e) => setGenerateDate(e.target.value)}
                disabled={isSameDate}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="sameDateCheckbox">
              <Form.Check
                type="checkbox"
                label="Both Same"
                checked={isSameDate}
                onChange={handleDateCheckbox}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="fileFormat">
              <Form.Label>File Format</Form.Label>
              <Form.Control
                as="select"
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value)}
              >
                <option>pdf</option>
                <option>excel</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Generate;
