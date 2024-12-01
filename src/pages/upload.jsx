import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table, Button } from "react-bootstrap";

const Upload = () => {
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the first sheet is the one we need
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Separate headers and rows
      setTableHeaders(jsonData[0] || []);
      setTableData(jsonData.slice(1));
    };

    reader.readAsArrayBuffer(file);
  };

  // Pagination Logic
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    
    <div className="container">
      <h2 className="pt-3 mb-3 text-center">Upload &nbsp; Your &nbsp; Excel &nbsp; File,&nbsp; PDF &nbsp; or &nbsp; Image... </h2>
      
      <div className="mb-3">
        <input
          type="file"
          accept=".xlsx, .xls"
          className="form-control"
          onChange={handleFileUpload}
        />
      </div>

      {tableData.length > 0 && (
        <div className="table-responsive">
          <Table bordered hover>
            <thead className="table-dark">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button variant="secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;

