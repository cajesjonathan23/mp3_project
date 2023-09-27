import React from 'react';
import './contact.css'; 

const Contact = () => {
    return (
        <div className="page-container">
            <header className="header">
                <h1>Contact Us</h1>
            </header>
            <main className="contact-content">
                <h2>Get in Touch</h2>
                <p>
                    If you have any questions, feedback, or need assistance, please feel free to contact us. We are here
                    to help you.
                </p>
                <p>Contact Email: <p style={{color:'blue'}}>complaintms@gmail.com</p></p>
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Complaint Management System</p>
            </footer>
        </div>
    );
};

export default Contact;
