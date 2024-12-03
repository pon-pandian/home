import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setUploadedFiles(response.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setUploadedFiles(response.data); 
    } catch (err) {
      console.error("Error uploading files:", err);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/file/${fileId}`);
      setUploadedFiles(uploadedFiles.filter((file) => file._id !== fileId));
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  const handleDownload = (file) => {
    window.open(`http://localhost:5000/download/${file._id}`, "_blank");
  };

  const handleShare = (file) => {
    setSelectedFile(file);
    setShowEmailModal(true);
  };

  const handleSendEmail = async () => {
    try {
      await axios.post("http://localhost:5000/share", {
        email,
        fileId: selectedFile._id,
      });
      setShowEmailModal(false);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  return (
    <div className="container pt-4">
      <h1>Upload, Download, Delete and Share Excel and Pdf</h1>
      <div className="mb-3">
        <input className="" type="file" multiple onChange={handleFileChange} />
        <Button variant="warning" className="text-white" onClick={handleUpload}>Upload</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr >
            <th className="bg-dark text-light">File Name</th>
            <th className="bg-dark text-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file) => (
            <tr key={file._id}>
              <td>{file.name}</td>
              <td>
                <Button variant="success" onClick={() => handleDownload(file)}>
                  Download
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(file._id)}>
                  Delete
                </Button>{" "}
                <Button variant="primary" onClick={() => handleShare(file)}>
                  Share
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Share File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Recipient Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowEmailModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleSendEmail}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Upload;
