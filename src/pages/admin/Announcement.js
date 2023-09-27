import { useState } from 'react';
import axios from 'axios';
import Homepage from "../Homepage";
import './announcement.css'; // Create a CSS file for styling if needed
import { format } from 'date-fns';
const Announcement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!title || !description || !selectedFile) {
      setError('All fields are required');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const addAnnouncement = (e) => {
   
    e.preventDefault();

    if (validateForm()) {
      const currentDate = format(new Date(), 'yyyy-MM-dd');

      let formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', currentDate);
      formData.append('file', selectedFile);
      formData.append('function', 6); // Function identifier for your backend

      axios({
        method: 'POST',
        url: 'https://getcms.online/mp3_db.php', // Update the URL as needed
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          alert('Announcement Submitted Successfully');
          // Optionally, you can reset the form fields here
          setTitle('');
          setDescription('');
          setSelectedFile(null);
        })
        .catch((error) => {
          console.error('Error submitting announcement:', error);
          setError('Error submitting announcement. Please try again later.');
        });
    }
  };

  return (
    <>
     <Homepage></Homepage>
     <div className="container ">
        <div className="d-flex justify-content-center card-container" >
            <div class="card mx-auto mx-md-0 " style={{marginTop:'90px'}}>
          <div className="card-header" >ANNOUNCEMENT FORM</div>

          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form action="#" method="post" encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="title">Announcement Title*</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Announcement Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Announcement Description*</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="Announcement Description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="file">Attachment*</label>
                <br />
                <input
                  className="form-control-file"
                  type="file"
                  name="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
              <br />

              <input
                className="btn btn-success w-100"
                type="submit"
                name="btn"
                value="Submit Announcement"
                onClick={addAnnouncement}
              />
            </form>
          </div>

          <div className="card-footer small text-muted">* must be filled</div>
        </div>
      </div>
    </div>
      <div className="container-fluid d-flex justify-content-center align-items-center make ">
              <h6 className="fixed-bottom"></h6>
            </div>
    </>
  );
};

export default Announcement;
