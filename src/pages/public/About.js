import React from 'react';
import './About.css'; 

const About = () => {
    return (
        <div className="page-container">
            <header className="header">
                <h1>Complaint Management System</h1>
            </header>
            <main className="about-content">
                <h2>About Us</h2>
                <p>Welcome to our Complaint Management System.</p>
                <p>
                    We are dedicated to providing a seamless experience for managing and resolving complaints. Our
                    platform is designed to empower both customers and businesses to effectively address and resolve
                    issues.
                </p>
                <p>
                    Our mission is to create a transparent and efficient process for handling complaints, ensuring
                    that feedback is heard, and resolutions are swift.
                </p>
                <p>
                    Whether you're a customer looking to voice your concerns or a business seeking to improve your
                    customer service, we're here to assist you every step of the way.
                </p>
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Complaint Management System</p>
            </footer>
        </div>
    );
};

export default About;
