import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import the icons
import './navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar-container">
      {/* Logo */}
      <div className="logo">
        <h1>KV Media Works</h1>
      </div>

      {/* Desktop Links */}
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#works">Works</a></li>
        <li><a href="#contact"><button className="contact-btn">Contact</button></a></li>
      </ul>

      {/* Mobile Menu Icon */}
      <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-box">
          <ul className="mobile-nav-links">
            <li><a href="#home" onClick={toggleMobileMenu}>Home</a></li>
            <li><a href="#about" onClick={toggleMobileMenu}>About</a></li>
            <li><a href="#works" onClick={toggleMobileMenu}>Works</a></li>
            <li><a href="#contact" onClick={toggleMobileMenu}><button className="contact-btn">Contact</button></a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
