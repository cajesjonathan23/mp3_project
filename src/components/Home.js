import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar,NavDropdown   } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px for mobile screens)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleLogout = () => {
   
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
   
    if (confirmLogout) {
    
      window.location.href = 'https://getcms.online';
    }
  };

  // Set isSidebarOpen to true by default
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log('Sidebar Toggled:', isSidebarOpen);
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-white">
          <Nav.Link>
            <Link to="/CMS/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                <b>ABOUT</b>
            </Link>
        </Nav.Link>

            <Nav.Link> <Link to="/CMS/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                <b>CONTACT</b>
            </Link></Nav.Link> 
            <Nav.Link onClick={handleLogout}>
            Signout <FontAwesomeIcon icon={faSignOutAlt} />
          </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul className="list-unstyled">
          <label>USER</label>
          <hr />
          <li>
            <i className="fas fa-user"></i>
            <Link to={"/CMS/home/myprofile"}> MY PROFILE</Link>
          </li>
          <li>
            <i className="fas fa-user-edit"></i>
            <Link to={"/CMS/home/updateprofile"}> UPDATE PROFILE</Link>
          </li>
          <li>
            <i className="fas fa-lock"></i>
            <Link to={"/CMS/home/changepassword"}> CHANGE PASSWORD</Link>
          </li>
          <hr />
          <label>REPORT FORM</label>
          <li>
            <i className="fas fa-chart-bar"></i>
            <Link to={"/CMS/home/report"}> REPORT COMPLAINT</Link>
          </li>
          <li>
            <i className="fas fa-chart-bar"></i>
            <Link to={"/CMS/home/reportdatauser"}> REPORT DATA</Link>
          </li>
          <hr />
          <label>ANNOUNCEMENT</label>
          <li>
            <i className="fas fa-bullhorn"></i>
            <Link to={"/CMS/home/announcementdata"}> ANNOUNCEMENT DATA</Link>
          </li>
          <hr />
        </ul>
      </div>
    </>
  );
};

export default Home;
