import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Homepage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
   
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    
    window.addEventListener('resize', handleResize);

   
    handleResize();

    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log('Sidebar Toggled:', isSidebarOpen);
  };
  const handleLogout = () => {
   
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
   
    if (confirmLogout) {
    
      window.location.href = 'https://getcms.online';
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-warning fixed-top">
      <Container>
        <Navbar.Brand href="#home">
          <Link className="navbar-brand">
            <b className="text-white">
              <button
                className="sidebar-toggler"
                onClick={toggleSidebar}
                style={{
                  border: 'none',
                  borderRadius: '4px',
                  marginRight: '5px',
                  width: '50px',
                  height: '40px',
                  color: 'white',
                  backgroundColor: '#484a54',
                }}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              {isMobile ? 'CMS' : 'COMPLAINT MANAGEMENT SYSTEM'}
            </b>
          </Link>
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
       
        <ul className="list-unstyled">
            <label>ADMIN</label>
            <hr />
            <li><i className="fas fa-tachometer-alt"></i><Link to={"/CMS/admin/dashboard"}> DASHBOARD</Link></li>
            <li><i className="fas fa-users"></i><Link to={"/CMS/admin/users"}> USERS</Link></li>
            <hr />
            <label>USER</label>
            <li><i className="fas fa-user"></i><Link to={"/CMS/admin/myprofile"}> MY PROFILE</Link></li>
            <li><i className="fas fa-user-edit"></i> <Link to={"/CMS/admin/updateprofileadmin"}> UPDATE PROFILE</Link></li>
            <li><i className="fas fa-lock"></i> <Link to={"/CMS/admin/changepassword"}> CHANGE PASSWORD </Link></li>
            <hr />
            <label>REPORT</label>
            <li><i className="fas fa-chart-bar"></i><Link to={"/CMS/admin/reportdata"}> REPORT DATA</Link></li>
            <hr />
            <label>ANNOUNCEMENT</label>
            <li><i className="fas fa-bullhorn"></i> <Link to={"/CMS/admin/announcement"}> ANNOUNCEMENT FORM</Link></li>
            <li><i className="fas fa-bullhorn"></i> <Link to={"/CMS/admin/announcementadmindata"}> ANNOUNCEMENT DATA</Link></li>
            </ul>

        
      </div>
     
    </>
  );
};

export default Homepage;
