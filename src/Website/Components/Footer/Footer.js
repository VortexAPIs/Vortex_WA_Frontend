import React from 'react';
import './Footer.css';
// import { Row } from 'react-bootstrap';

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <>
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <div className='footer-text'>
              &copy; {year} <b>Vortex APIs.</b> All rights reserved. Managed by <strong>VR Techno Solution</strong>
            </div>
            <div className="social-links">
              <a href='https://www.youtube.com/@Vortexapis' target='_blank' rel="noreferrer"><i className='fab fa-youtube' style={{color:'red'}}></i></a>
              {/* <a href="/"><i className="fab fa-x-twitter"></i></a>
              <a href="/"><i className="fab fa-facebook" style={{color:'blue'}}></i></a>
              <a href="/"><i className="fab fa-linkedin" style={{color:'blue'}}></i></a>
              <a href="/"><i className="fab fa-telegram" ></i></a> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
