import React, { useState, useEffect } from "react";
import axios from "axios";
import Homepage from "../Homepage";
import { Modal, Button } from "react-bootstrap";
import "./announcementadmindata.css";

const Announcementadmindata = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://getcms.online/fetch.php", {
        params: {
          function: 3,
        },
      })
      .then((response) => {
        if (response.data.announcements) {
          setAnnouncements(response.data.announcements);
        } else {
          console.error("Error fetching announcements data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleViewClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const handleDelete = (announcementId) => {
    axios
      .delete("https://getcms.online/deleteAnnouncement.php", {
        data: { announcementId: announcementId },
      })
      .then((response) => {
        if (response.data.success) {
          console.log(`Announcement with ID ${announcementId} deleted successfully`);
         
          setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.filter((announcement) => announcement.id !== announcementId)
          );
        } else {
          console.error("Error deleting announcement:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Homepage />
      <div className="container-fluid d-flex justify-content-center align-items-center make">
        <h4 className="">Announcement Data</h4>
      </div>
      <div className="container mt-4 table-container">
      

        
        <table className="table table-striped mt-4 col-md-6" style={{ marginLeft: "70px" }}>
          <thead className="thead-dark">
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, index) => (
              <tr key={announcement.id}>
                <td>{index + 1}</td>
                <td>{announcement.title}</td>
                <td>{announcement.description}</td>
                <td>
                  Reported on: <br />
                  <b>{announcement.date}</b>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => handleViewClick(announcement)}
                  >
                    <i className="fas fa-edit"></i> View
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(announcement.id)}
                    style={{ marginTop: "5px" }}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>View Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAnnouncement && (
            <>
              <h5>{selectedAnnouncement.title}</h5>
              <p>{selectedAnnouncement.description}</p>
              <p>Date: {selectedAnnouncement.date}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Announcementadmindata;
