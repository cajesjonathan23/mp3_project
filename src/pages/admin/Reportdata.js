import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage from '../Homepage';
import { Modal, Button } from 'react-bootstrap';
import './reportdata.css';

const Reportdata = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [imageContent, setImageContent] = useState(null);
  const [modalTextContent, setModalTextContent] = useState('');

  useEffect(() => {
    axios
      .get('https://getcms.online/fetch.php', {
        params: {
          function: 2,
        },
      })
      .then((response) => {
        if (response.data.reports) {
          setReports(response.data.reports);
        } else {
          console.error('Error fetching report data');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleViewClick = (report) => {
    setSelectedReport(report);

    // Generate the modal text content
    const { name, location, title, description, type, date } = report;
    const textContent = `Name: ${name}\nLocation: ${location}\nTitle: ${title}\nDescription: ${description}\nType: ${type}\nDate: ${date}`;

    setModalTextContent(textContent);

    setShowModal(true);
  };

  const handleDelete = (reportId) => {
    axios
      .delete('https://getcms.online/deleteReport.php', {
        data: { reportId: reportId },
      })
      .then((response) => {
        if (response.data.success) {
          // Report deleted successfully
          console.log(`Report with ID ${reportId} deleted successfully`);

          // Update the 'reports' state by filtering out the deleted report
          setReports((prevReports) => prevReports.filter((report) => report.id !== reportId));
        } else {
          // Handle deletion failure or errors
          console.error('Error deleting report:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const renderModalContent = () => {
    if (!selectedReport) {
      return null;
    }

    const handleDownloadText = () => {
      // Create a Blob containing the modal text content
      const blob = new Blob([modalTextContent], { type: 'text/plain' });

      // Create a download link and trigger a click to start the download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'report.txt';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    const { name, location, title, description, type, date } = selectedReport;

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const resolution = event.target.resolution.value;
      localStorage.setItem(`resolution_${selectedReport.id}`, resolution);
      setShowModal(false);
    };

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>View Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {name}</p>
          <p>Location: {location}</p>
          <p>Title: {title}</p>
          <p>Description: {description}</p>
          <p>Type: {type}</p>
          <p>Date: {date}</p>

          <form onSubmit={handleFormSubmit}>
            <label htmlFor="resolution">Status:</label><br />
            <select id="resolution" name="resolution" className="w-100" style={{ padding: '5px' }}>
              <option value="Open by Admin">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <button type="submit" className="btn btn-success w-100 mt-2">Update</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDownloadText}>
            Download Report
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </>
    );
  };

  return (
    <>
      <Homepage />
      <div className="container-fluid d-flex justify-content-center align-items-center make">
        <h4>LIST OF REPORTS</h4>
      </div>
      <div className="container mt-4 tablelayout w-75">
        <table className=" table table-hover table-bordered mt-4 col-md-6" style={{ marginLeft: '130px' }}>
          <thead className="thead-dark">
            <tr>
              <th>No.</th>
              <th>Location</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Date</th>
              <th>Attachment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => {
              let contentType;
              if (report.image_extension === 'png') {
                contentType = 'image/png';
              } else if (report.image_extension === 'jpg' || report.image_extension === 'jpeg') {
                contentType = 'image/jpeg';
              } else {
                contentType = 'image/png';
              }

              return (
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td>{report.location}</td>
                  <td>{report.title}</td>
                  <td>{report.description}</td>
                  <td>{report.type}</td>
                  <td>Reported on: {report.date}</td>
                  <td>
                    {report.image ? (
                      <>
                        <a
                          href={`data:${contentType};base64,${report.image}`}
                          download={`report_${report.id}.${report.image_extension}`}
                        >
                          Download
                        </a>
                        <br />
                        <img
                          src={`data:${contentType};base64,${report.image}`}
                          alt="Report Image"
                          style={{ maxWidth: '100px', height: 'auto' }}
                        />
                      </>
                    ) : (
                      <p>No image available</p>
                    )}
                  </td>
                  <td className="text-center" style={{ margin: '6px' }}>
                    <button className="btn btn-primary mr-2" onClick={() => handleViewClick(report)}>
                      <i className="fas fa-edit"></i> Update
                    </button>
                    <button className="btn btn-danger" style={{ marginTop: '5px' }} onClick={() => handleDelete(report.id)}>
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default Reportdata;
