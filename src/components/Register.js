import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import registerImage from "../register.jpg";
import { useNavigate } from 'react-router-dom';
import "./register.css";
function Register() {
  const containerStyle = {
    backgroundImage: `url(${registerImage})`,
    width: '100%',
  };

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For displaying validation error
  const [emailAvailable, setEmailAvailable] = useState(true);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const addUser = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If validation passes, submit the form
      let getData = new FormData();

      getData.append('fullname', fullName);
      getData.append('email', email);
      getData.append('password', password);
      getData.append('function', 1);

      axios({
        method: "POST",
        url: "https://getcms.online/mp3_db.php",
        data: getData
      })
        .then((response) => {
          navigate('/CMS/login', { replace: true });
          alert("User Created Successfully");
        })
        .catch((error) => {
          // Handle errors, display error messages, etc.
          console.error(error);
        });
    }
  };
  const checkEmailAvailability = async () => {
    if (!email) {
      return;
    }
  
    try {
      const response = await axios.get(
        `https://getcms.online/check_email.php?email=${email}`
      );
  
      if (response.data === "available") {
        setEmailAvailable(true);
      } else {
        setEmailAvailable(false);
        setError("Email is already taken");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkEmailAvailability();
  }, [email]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5">
          <div style={containerStyle} className="w-100">
            <br /><br /><br /><br />
            <img src={registerImage} alt="Login" className="w-100 pic" />
          </div>
        </div>
        <div className="col-md-5 edit" ><br /><br /><br />
          <div className="card mt-5" >
            <div className="card-header text-center"><h3>Register</h3></div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
              <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" className="form-control" id="fullName"  name="fullname" placeholder="Enter Full Name" onChange={(e) =>setFullname(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={(e) =>setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" onChange={(e) =>setConfirmPassword(e.target.value)}/>
                </div><br />
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={addUser}
                >
                  Register
                </button>
              </form>
              <div className="card-footer text-center">
                <p>Already have an account? <Link to="/CMS/login">Login here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
