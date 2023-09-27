import { useState, useEffect } from "react";
import axios from "axios";
import Home from "../../components/Home";
import { Modal, Button } from "react-bootstrap";
import "./announcement.css";

const Announcementdata = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch announcement data from the server
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

  const handleDelete = (id) => {
    console.log("Deleting announcement with ID:", id);
    axios
      .post("https://getcms.online/deleteAnnouncement.php", { id: id })
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.data.success) {
          setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.filter(
              (announcement) => announcement.id !== id
            )
          );
        } else {
          console.error("Error deleting announcement");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const closeModal = () => {
    setSelectedAnnouncement(null);
    setShowModal(false);
  };

  return (
    <>
      <Home></Home>
      <div className="container-fluid d-flex justify-content-center align-items-center make">
        <h4 className="">Announcement Data</h4>
      </div>
      <div className="container mt-4 table-container ">
        <table className="table table-striped  mt-4 col-md-6" style={{ marginLeft: "70px" }}>
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
                <td>Reported on: <br /><b>{announcement.date}</b></td>
                <td className="text-center">
                  <button className="btn btn-success mr-2" >
                    <i className="fas fa-edit"></i> View
                  </button>
                  {/* <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(announcement.id)}
                    style={{marginTop:'5px'}}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button> */}
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
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAnnouncement && (
            <>
              <p>Title: {selectedAnnouncement.title}</p>
              <p>Description: {selectedAnnouncement.description}</p>
              <p>Date: {selectedAnnouncement.date}</p>
              <p>View Count: {announcements.filter((a) => JSON.parse(localStorage.getItem("viewedAnnouncementIds")).includes(a.id)).length}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Announcementdata;
