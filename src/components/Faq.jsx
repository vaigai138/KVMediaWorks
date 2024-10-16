import React, { useState } from 'react';
import './Faq.css';

const faqs = [
  {
    question: 'What types of video editing services do you offer?',
    answer: 'We offer editing for short-form content (Instagram, YouTube Shorts), long-form YouTube videos, corporate videos, podcasts, tech videos, medical videos, and more across all niches.',
  },
  {
    question: 'What is the typical turnaround time for a video project?',
    answer: 'For short-form content, we typically deliver within 24 hours, while longer videos or special requests may take 3-7 business days.',
  },
  {
    question: 'How do I submit my footage for editing?',
    answer: 'You can upload your footage through Google Drive, Dropbox, or any other cloud storage service. After placing an order, we will provide you with detailed instructions on how to share your files securely.',
  },
  {
    question: 'What if I need revisions after the video is delivered?',
    answer: 'We offer up to [X] revisions to ensure you are satisfied with the final video. Just let us know what changes you need, and we will make adjustments accordingly.',
  },
  {
    question: 'How can I get a quote for a custom project?',
    answer: 'Reach out via the contact form on our website or through WhatsApp with details about your project, and we will provide you with pricing and timeline options.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="faq-container">
      <div className="faq-left">
        <h2 className='faq-title'>FAQ's</h2>
        <h2 className='faq-head'>
          Frequently <br/>Asked <br/><span >Questions</span>
        </h2>
        <p className="faq-description">
          (Find answers to frequently asked questions about KV Media Works, our range of services, how we operate, and insights on maximizing the benefits of our agency services.)
        </p>
      </div>
      <div className="faq-right">
       
        

        <div className="faq-items"> 
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
