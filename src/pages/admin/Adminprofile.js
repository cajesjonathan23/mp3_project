import Homepage from "../Homepage";
import Image from '../../prof.jpg';
import { useState, useEffect } from "react";
import axios from "axios";
const Adminprofile = () => {
  const [fullname, setFullname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    
    const storedUserEmail = localStorage.getItem('admin_email');
    const storedUserPassword = localStorage.getItem('admin_password');

    if (storedUserEmail && storedUserPassword) {
     
      setUserEmail(storedUserEmail);
     
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
        `https://getcms.online/adminLogin.php?email=${email}&password=${password}`
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
           <Homepage></Homepage>
           <div className="container-fluid d-flex justify-content-center align-items-center make">
               <h4 >ADMIN PROFILE </h4>
            </div>
      <div className="container mt-5">
        <div className="d-flex justify-content-center"> {/* Center the card */}
          <div className="card mx-auto mx-md-0" style={{ maxWidth: '500px', width: '100%', marginRight: '50px' }}>
                <div className="card-header">
                  <img src={Image} alt="" className="card-img-top img-fluid img-thumbnail" style={{ maxWidth: '200px' }} />
                </div>
                <div className="card-body">
                <h5 className="card-title">Name: Admin</h5>
                  <p className="card-text">Email: {userEmail}</p>
                </div>
              </div>
            </div>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center make ">
              <h6 className="fixed-bottom"></h6>
            </div>
        </>
     );
}
 
export default Adminprofile;