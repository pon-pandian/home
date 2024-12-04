import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5; 

  useEffect(() => {
    fetchUploadedFiles(1); 
  }, []);

  const fetchUploadedFiles = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/files?page=${page}&limit=${itemsPerPage}`);
      setUploadedFiles(response.data.files);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
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
      fetchUploadedFiles(1); 
    } catch (err) {
      console.error("Error uploading files:", err);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/file/${fileId}`);
      fetchUploadedFiles(currentPage + 1);
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
        subject,
        content,
        fileId: selectedFile._id,
      });
      setShowEmailModal(false);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  const handlePageChange = (selectedPage) => {
    const newPage = selectedPage.selected + 1; 
    setCurrentPage(selectedPage.selected);
    fetchUploadedFiles(newPage);
  };

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-center">
        <h1>Upload, Download, Delete and Share Excel and PDF</h1>
      </div>

      <div className="mb-3 d-flex">
        <div className="mr-auto">
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div>
          <Button variant="warning" className="text-white" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="bg-dark text-light">#</th>
            <th className="bg-dark text-light">File Name</th>
            <th className="bg-dark text-light">Uploaded Time</th>
            <th className="bg-dark text-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, index) => (
            <tr key={file._id}>
              <td>{index + 1 + currentPage * itemsPerPage}</td>
              <td>{file.name}</td>
              <td>{new Date(file.uploadTime).toLocaleString()}</td>
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

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Share File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="fw-bold">Recipient Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bold">Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bold">Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
