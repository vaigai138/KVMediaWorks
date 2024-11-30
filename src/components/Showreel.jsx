import React, { useState } from 'react';
import './Showreel.css'; // Assuming you add some styles here for customization

const Showreel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play state when thumbnail is clicked
  const handlePlay = () => setIsPlaying(true);

  return (
    <div className="showreel-container" id='showreel'>
      <h2 className="showreel-title mt-8 font-bold text-primary">Showreel</h2>
      <div className="video-wrapper">
        {!isPlaying ? (
          <div className="thumbnail" onClick={handlePlay}>
            <img
              src="showreelthumb.png"
              alt="Showreel Thumbnail"
              className="thumbnail-image"
            />
            <div className="play-icon">
              <i className="bi bi-play-circle-fill"></i>
            </div>
          </div>
        ) : (
          <video
            src="showreel.mp4" // Replace with your direct video link
            controls
            autoPlay
            className="showreel-video"
          />
        )}
      </div>
    </div>
  );
};

export default Showreel;
