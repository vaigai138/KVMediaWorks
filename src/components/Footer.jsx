import React from 'react';
import './Footer.css'; // Make sure this file contains the CSS
import logo from "../assets/logofinal.png";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Importing React Icons
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div>
    <footer className="footer-container">
      <div className="footer-left">
        {/* Small logo on the left */}
        <img src={logo} alt="KV Media Works Logo" className="footer-logo" />

        {/* Social Media Icons placed below the logo */}
        <div className="social-icons-left">
          <a href="https://www.instagram.com/kvmediaworks" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" />
          </a>
          <a href="https://wa.me/7604895101" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon" />
          </a>
        </div>
      </div>

      <div className="footer-right">
        {/* Video Editing Quote */}
        <p className="quote">"The art of video editing is storytelling through the lens of creativity."</p>
        
        {/* Call to work with us */}
        <p>Want to work with us?</p>
        <a href="mailto:mediaworkskv@gmail.com" className="join-us-btn">Join Us</a>

        {/* Terms and Conditions Link */}
        
        {/* Terms and Conditions Link */}
<Link to="/terms-and-conditions" className="terms-link">Terms and Conditions</Link>


      </div>
      
      <p className='author-name'>Designed by <span><a href='https://github.com/vaigai138'>Vaigai</a></span></p>
    </footer>
    <div className='a-name'>
    <p className='author-name-mobile'>Designed by <span><a href='https://github.com/vaigai138'>Vaigai</a></span></p>
    </div>
    </div>
  );
};

export default Footer;
