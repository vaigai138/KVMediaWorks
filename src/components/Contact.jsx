import React from 'react';
import { About_Data } from '../utils/data';


const Contact = () => {

  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch('https://kvmediaworksbackend.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully');
      } else {
        alert('Failed to send the message');
      }
    } catch (error) {
      alert('Error occurred: ' + error.message);
    }
  };



  return (
    <div>
      <section className="max-w-screen-xl mx-auto px-6 pb-20" id='contact'>
        <h5 className="text-primary text-2xl md:text-4xl font-semibold text-center pb-8 md:pb-14">
          Contact
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
          <div>
            <ContactCard
              icon={<i className="bi bi-envelope-fill"></i>} // Bootstrap icon for email
              text={About_Data.email}
            />

            <ContactCard
              icon={<i className="bi bi-instagram"></i>} // Bootstrap icon for Instagram
              text={About_Data.instagram}
            />


          </div>
          <div>
           
            <form action="" className="flex flex-col" onSubmit={handleSubmit}>
              <input type="text" 
              name='fullname'
              placeholder='Full Name'
              id=''
              className='input-box'
              autoComplete='off'
              />


<input type="email" 
              name='email'
              placeholder='Email'
              id=''
              className='input-box'
              autoComplete='off'
              />

              
<input type="text" 
              name='phone'
              placeholder='Phone'
              id=''
              className='input-box'
              autoComplete='off'
              />

<textarea type="textarea" 
              name='message'
              placeholder='Message'
              id=''
              className='input-box'
              autoComplete='off'
              />
              <button className="primary-btn" type='submit'>SUBMIT</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactCard = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-5 bg-gradient-to-br from-blue-950 to-slate-900 rounded border border-blue-800/40 px-4 py-3 mb-5">
      <div className="w-10 h-10 text-xl text-cyan-300 flex items-center justify-center bg-sky-950 rounded border border-cyan-700">
        {icon}
      </div>
      <p className="text-cyan-100 text-x5 md:text-sm">{text}</p>
    </div>
  );
};

export default Contact;
