import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginImage from '../login.jpg';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('All fields are required');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.get(
          `https://getcms.online/adminLogin.php?email=${email}&pass=${password}`
        );

        if (response.data.message === 'Login successful') {
          // Store user data in local storage
          localStorage.setItem('admin_email', email);
          localStorage.setItem('admin_password', password);
          // Handle successful login here
          navigate('./dashboard');
          alert('Login successful');
        } else {
          setError('Invalid email or password');
        }
      } catch (error) {
        console.error('Error checking email and password availability:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5">
          <br /><br /><br />
          <img src={loginImage} alt="" className="w-100" />
        </div>
        <div className="col-md-5">
          <br /><br /><br /><br />
          <div className="card mt-5">
            <div className="card-header text-center">
              <h3>Admin Login</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>Forgot Password?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
