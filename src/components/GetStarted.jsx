import React, { useState } from 'react';
import './GetStarted.css'; // Ensure this file contains the CSS styles
import emailjs from "@emailjs/browser"

const GetStarted = () => {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    projectDescription: '',
    budget: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailParams = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      projectDescription: formData.projectDescription,
      budget: formData.budget || 'Not specified', // Default if budget is empty
      comments: formData.comments || 'No additional comments'
    };
  
    const serviceId = "service_u9bf7e7";
    const templateId = "template_sx0pfph";
    const publicKey = "MZXZ3LhDPgFoyTNFJ";
  
    // Sending the email with the correct parameters
    emailjs.send(serviceId, templateId, emailParams, publicKey)
      .then((response) => {
        console.log('Email successfully sent!', response);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          projectDescription: '',
          budget: '',
          comments: ''
        });
        setShowForm(false); // Hide the form after successful submission
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

      alert(`Thank you, ${formData.name}! Your project inquiry has been submitted successfully. We will get back to you shortly.`)

    // Clear the form
    

    // Hide the form after submission (optional)
    setShowForm(false);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  return (
    
    <div className="get-started" id='contact'>
        <hr/>
      <h2 className="large-text" >
        If you're interested in our services, please fill out the form below<br/>
        
      </h2>

      <div className='btn-align'>
      <button className='get-started-btn' onClick={toggleFormVisibility}>Fill Out The Form</button>
      </div>
      

      {showForm && ( // Conditionally render the form
        <div className="registration-form">
          <form className="form" onSubmit={handleSubmit}>
            <p className="title">Get Started</p>
            <div className="flex">
              <label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <span>Name *</span>
              </label>
              <label>
                <input
                  className="input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <span>Phone *</span>
              </label>
            </div>
            <label>
              <input
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <span>Email Address *</span>
            </label>
            <label>
              <select
                className="input services-input"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>Select Type of Service *</option>
                <option value="short-video-editing">Short Form Video Editing</option>
                <option value="long-video-editing">Long Form Video Editing</option>
                <option value="social-media-handling">Social Media Handling</option>
              </select>
              <span>Type of Service *</span>
            </label>
            <label>
              <textarea
                className="input textarea"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder=" "
                required
              ></textarea>
              <span>Project Description *</span>
            </label>
            <label>
              <input
                className="input"
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder=" "
              />
              <span>Budget (optional)</span>
            </label>
            <label>
              <textarea
                className="input textarea"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder=" "
              ></textarea>
              <span>Additional Comments/Questions</span>
            </label>
            <button className="submit">Submit</button>
          </form>
        </div>
      )}
      <hr className='get-start-hr' />
    </div>
  );
};

export default GetStarted;
