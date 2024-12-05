import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { MdFileDownload } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { RiShareLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";


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
        <h4>Upload, Download, Delete and Share Excel and PDF</h4>
        </div>

       <div className="row">
       <div className="col-6">
          <input className="fw-bold" type="file" multiple onChange={handleFileChange} />
        </div>
        <div className="col-6 d-flex flex-row-reverse">
        <Button variant="warning" className="text-white" onClick={handleUpload}>
          Upload <MdFileUpload />
          </Button>
        </div>
       </div>
        
      

       <div className="mt-3">
       <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th className="bg-purple text-light">S.No</th>
            <th className="bg-purple text-light">File Name</th>
            <th className="bg-purple text-light">Uploaded Time</th>
            <th className="bg-purple text-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, index) => (
            <tr key={file._id}>
              <td className="">{index + 1 + currentPage * itemsPerPage}</td>
              <td>{file.name}</td>
              <td className="">{new Date(file.uploadTime).toLocaleString()}</td>         
              <td className="d-none d-md-block">
                <Button variant="success" onClick={() => handleDownload(file)}>
                 Download <MdFileDownload />
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(file._id)}>
                  Delete <MdOutlineDeleteOutline />
                </Button>{" "}
                <Button variant="primary" onClick={() => handleShare(file)}>
                  Share <RiShareLine />
                </Button>
              </td>
              <td className="d-block d-md-none">
                <Button variant="success" onClick={() => handleDownload(file)}>
                 <MdFileDownload />
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(file._id)}>
                 <MdOutlineDeleteOutline />
                </Button>{" "}
                <Button variant="primary" onClick={() => handleShare(file)}>
                 <RiShareLine />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

       </div>
    
    

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
            Close <CgCloseO />
          </Button>
          <Button variant="success" onClick={handleSendEmail}>
            Send Email <FiSend />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Upload;
