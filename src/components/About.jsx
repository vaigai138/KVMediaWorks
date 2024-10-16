import React, { useState } from 'react';
import './about.css'; // Ensure this file is correctly linked
import showreelThumbnail from '../assets/showreel.webp'; // Update with your thumbnail path
import man from "../assets/man.png"; // Update with your image path

const About = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleThumbnailClick = () => {
        setIsPlaying(true);
    };

    return (
        <div className="about-container">
            <div className="showreel-container">
                {!isPlaying ? (
                    <img
                        src={showreelThumbnail}
                        alt="Showreel Thumbnail"
                        className="showreel-thumbnail"
                        onClick={handleThumbnailClick}
                    />
                ) : (
                    <iframe
                        width="800"
                        height="450"
                        src="https://www.youtube.com/embed/your-video-id" // Replace with your video link
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
            <h1 className='about-head' id='about'>About Founder</h1>
            
            {/* Mobile view structure */}
            <div className="about-us-mobile">
                <img src={man} alt="Vaigai Vendhan" className='man-img' />
                <p className="about-para-mobile">
                    Meet Vaigai Vendhan, a skilled video editor with over 3 years of experience and a full-stack web developer. Having worked with 20+ clients, Vaigai delivers high-quality, tailored video content.
                </p>
            </div>
            
            {/* Desktop view structure */}
            <div className="about-us-desktop">
                <div className="about-left">
                    <p className="about-para">
                        Meet Vaigai Vendhan, a skilled video editor with over 3 years of experience and a full-stack web developer. Having worked with 20+ clients, Vaigai delivers high-quality, tailored video content. Now leading a video editing agency, Vaigai helps content creators elevate their projects, from short social media clips to long-form productions.
                    </p>
                </div>
                <div className="about-right">
                    <img src={man} alt="Vaigai Vendhan" className='man-img' />
                </div>
            </div>
            <hr />
        </div>
    );
};

export default About;
