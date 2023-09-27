import React from "react";
import backgroundImage from "../background.jpg";
import { Link } from "react-router-dom";

const Welcome = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  const h1Style = {
    textShadow: '2px 2px white',
  };

  return (
    <>
      <div style={containerStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-5 mt-5">
              <br />
              <h1 className="mt-5 text-center" style={h1Style}>
                <b>WELCOME TO COMPLAINT<br />MANAGEMENT SYSTEM</b>
              </h1>
            </div>
            <div className="col-md-12 mt-3">
              <h3 className="mt-3 text-center">
                Report any incidents that are troubling and can harm the environment for a better environment.
              </h3>
            </div>
            <div className="col-md-12 mt-3 text-center">
              <button className="btn btn-warning px-4">
                <b>
                  <Link to="/CMS/login" style={{ textDecoration: "none", color: "inherit" }}>SIGN IN TO REPORT</Link>
                </b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
