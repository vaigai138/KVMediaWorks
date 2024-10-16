import React, { useState, useEffect, useRef } from 'react';
import './whatWeDo.css';

const WhatWeDo = () => {
    const services = [
        {
            title: "Reels and Shorts",
            content: "Create engaging reels and shorts specifically designed for content creators to enhance their reach on platforms like Instagram and YouTube."
        },
        {
            title: "YouTube Long Videos",
            content: "Edit and produce high-quality long-form videos for YouTube, ensuring captivating storytelling and professional presentation."
        },
        {
            title: "Corporate Videos",
            content: "Develop polished corporate videos, including promotional content and training materials, tailored to meet business needs."
        },
        {
            title:"Social Media Management",
            content:"Enhance your online presence with engaging and strategic content tailored for each platform."
        },
        {
            title: "Why are you waiting?",
            content: "Take service from KV Media Works!"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

    const handleScroll = (direction) => {
        if (direction === 'left') {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
        }
    };

    // Automatically slide every 5 seconds
    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide(); // Cleanup the interval on component unmount
    }, []);

    const startAutoSlide = () => {
        stopAutoSlide(); // Clear any existing intervals
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
        }, 4000); // Slide every 5 seconds
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleManualScroll = (direction) => {
        stopAutoSlide(); // Stop automatic sliding on manual control
        handleScroll(direction); // Perform manual scroll
        startAutoSlide(); // Restart automatic sliding after manual control
    };

    return (
        <div className='whatWeDo-wrapper'>
            <div className="whatwedo-container">
                <h1>What We Do?</h1>
                <div className="navigation">
                    <button className="nav-button" onClick={() => handleManualScroll('left')}>❮</button>
                    <div className="cards">
                        <div className='card'>
                            <div className="card-body glass">
                                <h2>{services[currentIndex].title}</h2>
                                <p className='service-para'>{services[currentIndex].content}</p>
                            </div>
                        </div>
                    </div>
                    <button className="nav-button" onClick={() => handleManualScroll('right')}>❯</button>
                </div>
            </div>
            <a href="#contact"><button className="contact-btn-2">Contact Us</button></a>
            <hr />
        </div>
    );
}

export default WhatWeDo;
