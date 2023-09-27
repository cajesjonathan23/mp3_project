import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../../components/Home';
import Image from '../../prof.jpg';
import './myprofile.css';
import '../../App.css';

const Myprofile = () => {
  const [fullname, setFullname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    // Check if user email and password are in localStorage
    const storedUserEmail = localStorage.getItem('user_email');
    const storedUserPassword = localStorage.getItem('user_password');

    if (storedUserEmail && storedUserPassword) {
      // You can use storedUserEmail and storedUserPassword as needed
      setUserEmail(storedUserEmail);
      // setUserPassword(storedUserPassword); 
      fetchUserInfo(storedUserEmail, storedUserPassword);
    } else {
     
    }
  }, []);

  const fetchUserInfo = async (email, password) => {
    if (!email || !password) {
      return;
    }

    try {
      // Fetch user info using the email and password
      const response = await axios.get(
        `https://getcms.online/getName.php?email=${email}&password=${password}`
      );

      const userData = response.data;

      // Set user data in state
      setFullname(userData.fullname);
      setUserImage(userData.image);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <>
      <Home></Home>
      <div className="container-fluid d-flex justify-content-center align-items-center make">
      <h4 className="ms-auto text-sm">Welcome: {fullname}</h4>

      </div>
      <div className="container mt-5">
        <div className="d-flex justify-content-center"> {/* Center the card */}
          <div className="card mx-auto mx-md-0" style={{ maxWidth: '500px', width: '100%', marginRight: '50px' }}>
            <div className="card-header">
              <img src={Image} alt="" className="card-img-top img-fluid img-thumbnail" style={{ maxWidth: '200px' }} />
            </div>
            <div className="card-body">
              <h5 className="card-title">Name: {fullname}</h5>
              <p className="card-text">Email: {userEmail}</p>
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid d-flex justify-content-center align-items-center make footer">
        <h6 className="fixed-bottom"></h6>
      </div>

    </>
  );
};

export default Myprofile;
