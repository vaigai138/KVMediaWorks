import React from 'react';
import './TermsAndConditions.css'; // Optional: Add your CSS for this page

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to KV Media Works. These terms and conditions outline the rules and regulations for the use of our services.
      </p>
      
      <h2>1. Introduction</h2>
      <p>
        By accessing this website, you agree to be bound by these terms and conditions.
      </p>

      <h2>2. Services</h2>
      <p>
        We offer video editing, social media handling, and related services. Use of our services indicates acceptance of these terms.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All content and material used in providing our services is owned by KV Media Works.
      </p>

      {/* Add more sections as needed */}
      
      <p>For more details, please contact us at mediaworkskv@gmail.com.</p>
    </div>
  );
};

export default TermsAndConditions;
