import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../../components/Home';
import './myprofile.css';
import { useLocation } from 'react-router-dom';

const Updateprofile = () => {
  const location = useLocation();
  const { email, password } = location.state || {};

  const [fullname, setFullname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
  useEffect(() => {

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setFullname(userData.fullname);
      setUserEmail(userData.email);
    } else {
   
      fetchUserInfo();
    }
  }, []);

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;

    const words = str.split(' ');
    const capitalizedWords = words.map((word) => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    });

    return capitalizedWords.join(' ');
  };

  const fetchUserInfo = async () => {
    if (!email || !password) {
      return;
    }

    try {
      const response = await axios.get(
        `https://getcms.online/getName.php?email=${email}&password=${password}`
      );

      const userData = response.data;




      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {

    setIsEditing(false);
  };

  return (
    <>
      <Home />
      <div className="container-fluid d-flex justify-content-center align-items-center make">
        <h4>UPDATE PROFILE</h4>
      </div>
      {/* <div className="container mt-5">
        <div className="card" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <h5 className="card-title">
              {isEditing ? (
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              ) : (
                `Fullname: ${fullname}`
              )}
            </h5>
            <p className="card-text">
              {isEditing ? (
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              ) : (
                `Email: ${userEmail}`
              )}
            </p>
            {isEditing ? (
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center make footer">
        <h6 className="fixed-bottom"></h6>
      </div> */}
    </>
  );
};

export default Updateprofile;
