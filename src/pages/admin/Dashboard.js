import { Nav } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import Homepage from "../Homepage";
import "./dashboard.css";
import { Link } from "react-router-dom";
const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [reportCount, setReportCount] = useState(0);
    const [announcementCount, setAnnouncementCount] = useState(0);
   


  const fetchUserCount = () => {
    const requestData = new FormData();
    requestData.append('function', '3'); 

    fetch('https://getcms.online/mp3_db.php', {
      method: 'POST',
      body: requestData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_count !== undefined) {
          setUserCount(data.user_count);
        } else {
          console.error('Error counting users');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchReportCount = () => {
    const requestData = new FormData();
    requestData.append('function', '4'); // Use function 4 to count reports

    fetch('https://getcms.online/mp3_db.php', {
      method: 'POST',
      body: requestData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.report_count !== undefined) {
          setReportCount(data.report_count);
        } else {
          console.error('Error counting reports');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const fetchAnnouncementCount = () => {
    const requestData = new FormData();
    requestData.append('function', '5'); // Use function 6 to count announcements
  
    fetch('https://getcms.online/mp3_db.php', {
      method: 'POST',
      body: requestData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.announcement_count !== undefined) {
          setAnnouncementCount(data.announcement_count);
        } else {
          console.error('Error counting announcements');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
 

  useEffect(() => {
    fetchUserCount();
    fetchReportCount();
    fetchAnnouncementCount();
   
  }, []);
  
    return ( 

        <>
            <Homepage></Homepage>
            <div className="container-fluid d-flex justify-content-center align-items-center make">
                    <h4 >ADMIN DASHBOARD</h4>
            </div>
            <div className="container d-flex justify-content-center align-items-center   ">
                <div className="row " style={{marginRight:'50px'}}>
                    <div className="col-md-6">
                        <div className="card custom-card shadow">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title">TOTAL REGISTERED USERS</h5>
                                    <i className="fas fa-users fa-3x"></i> 
                                </div>
                                    
                                    <h3>{userCount}</h3>
                                    {/* <button onClick={fetchUserCount}>Refresh User Count</button> */}
                                  <Link to={"/CMS/admin/users"} className="btn btn-primary"><b>View</b></Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card custom-card2 shadow">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title">TOTAL REPORTS</h5>
                                    <i className="fas fa-chart-bar fa-3x"></i>
                                </div>
                                   
                                <h3>{reportCount}</h3>
                                    {/* <button onClick={fetchUserCount}>Refresh User Count</button> */}
                                <Link to={"/CMS/admin/reportdata"} className="btn btn-primary"><b>View</b></Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card custom-card3 shadow">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title">TOTAL ANNOUNCEMENTS</h5>
                                    <i className="fas fa-bullhorn fa-3x"></i> 
                                </div>
                                    
                                <h3>{announcementCount}</h3>
                                    {/* <button onClick={fetchUserCount}>Refresh User Count</button> */}
                                <Link to={"/CMS/admin/announcementadmindata"} className="btn btn-primary"><b>View</b></Link>

                            </div>
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
 
export default Dashboard;