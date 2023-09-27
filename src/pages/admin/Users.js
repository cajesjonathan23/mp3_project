import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Homepage from '../Homepage';
import "./users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    axios.get('https://getcms.online/fetch.php', {
      params: {
        function: 1,
      },
    })
    .then((response) => {
      if (response.data.users) {
        setUsers(response.data.users);
      } else {
        console.error('Error fetching user data');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  const handleDelete = (userId) => {
    // Send a DELETE request to your server to delete the user
    axios
      .delete(`https://getcms.online/deleteUser.php`, {
        data: {
          userId: userId
        }
      })
      .then((response) => {
        if (response.data.success) {
       
          console.log(`User with ID ${userId} deleted successfully`);
        
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } else {
     
          console.error('Error deleting user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Homepage></Homepage>
      <div className="container-fluid d-flex justify-content-center align-items-center make">
        <h4 >LIST OF USERS</h4>
      </div>
      <div className="container mt-4 table-container">
      <table className="table table-striped mt-4 col-md-6" style={{ marginLeft: "70px" }}>
      <thead className="thead-dark  ">
            <tr>
              <th>No.</th>
              <th>Fullname</th>
              <th>Email</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger w-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
     
    </div>
    </>
  );
};

export default Users;
