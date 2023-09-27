import React, { useState, useEffect } from 'react';
import Homepage from '../Homepage';

const Changeadminpassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [storedAdminPassword, setStoredAdminPassword] = useState('');

  useEffect(() => {
    // Retrieve the admin's email and stored password from local storage
    const storedEmail = localStorage.getItem('admin_email');
    const storedPassword = localStorage.getItem('admin_password');
    if (storedEmail && storedPassword) {
      setAdminEmail(storedEmail);
      setStoredAdminPassword(storedPassword);
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Check if the current password matches the stored password
    if (currentPassword !== storedAdminPassword) {
      setMessage('Current password is incorrect.');
      return;
    }

    // Check if the new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    // Send a request to your server to change the admin's password
    try {
      const response = await fetch('https://getcms.online/updateAdminPassword.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        setMessage('Password changed successfully.');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Password change failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while changing the password.');
    }
  };

  return (
    <>
      <Homepage />
      <div className="container-fluid d-flex justify-content-center align-items-center make">
        <h4>CHANGE PASSWORD</h4>
      </div>
      <div className="container mt-5 col-md-5">
        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">
              Enter Current Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Enter New Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmNewPassword" className="form-label">
              Confirm New Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            <i className="fas fa-edit"></i> Change Password
          </button>
          {message && <p className="mt-3 text-success"><b>{message}</b></p>}
        </form>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center make ">
        <h6 className="fixed-bottom"></h6>
      </div>
    </>
  );
};

export default Changeadminpassword;
