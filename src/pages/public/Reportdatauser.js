import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../../components/Home';
import { Modal, Button } from 'react-bootstrap'; 
import './reportdatauser.css';

const Reportsdatauser = () => {
  const [reportsdatauser, setReportsdatauser] = useState([]);
  const userEmail = localStorage.getItem('user_email');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    if (userEmail) {
      axios
        .get('https://getcms.online/fetch.php', {
          params: {
            function: 4,
            email: userEmail,
          },
        })
        .then((response) => {
          if (response.data && response.data.reports) {
            setReportsdatauser(response.data.reports);
          } else {
            console.error('Error fetching report data');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [userEmail]);


  const getReportResolution = (reportId) => {
    const resolutionKey = `resolution_${reportId}`;
    const resolution = localStorage.getItem(resolutionKey);
    return resolution || 'Submitted'; 
  };

  const handleViewClick = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setSelectedReport(null);
    setShowModal(false);
  };

  return (
    <>
      <Home />
      <div className="container-fluid d-flex justify-content-center align-items-center custom">
        <h4 className="mt-2">YOUR REPORTS</h4>
      </div>
      <div className="container mt-4  table-container">
        <table className="table table-striped  mt-4 col-md-6" style={{ marginLeft: '70px' }}>
          <thead className="thead-dark">
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reportsdatauser.map((report, index) => (
              <tr key={report.id}>
                <td>{index + 1}</td>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>{report.type}</td>
                <td>Reported on: {report.date}</td>
                <td>
                  <button className="btn btn-success">
                    {getReportResolution(report.id)}
                  </button>
                </td>
                <td className="text-center" style={{ margin: '6px' }}>
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: '5px' }}
                    onClick={() => handleViewClick(report)}
                  >
                    <i className="fas fa-edit"></i> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center make footer">
        <h6 className="fixed-bottom"></h6>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Report</Modal.Title>
        </Modal.Header>
        {selectedReport && (
          <Modal.Body>
            <p>Name: {selectedReport.name}</p>
            <p>Location: {selectedReport.location}</p>
            <p>Title: {selectedReport.title}</p>
            <p>Description: {selectedReport.description}</p>
            <p>Type: {selectedReport.type}</p>
            <p>Date: {selectedReport.date}</p>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reportsdatauser;
