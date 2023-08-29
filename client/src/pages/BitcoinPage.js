import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageSource from '../Bitcoin_image.jpg'
import videoSource from '../CongressBuyBitcoin.mp4'; 
import VideoModal from '../components/VideoModal'; // Import the VideoModal component

const BitcoinPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Bitcoin Page</h1>
      <VideoModal isOpen={isModalOpen} onClose={closeModal} />
      <img src={imageSource} alt="./Bitcoin_image.jpg" />
      <br />
      <video src={videoSource} autoPlay loop />
      <br />
      <br />
      <iframe src="https://www.timechaincalendar.com/en" style={{ width: '100%', height: '750px' }}></iframe>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '8px' }}>
          Credit to TC for the timechaincalendar.  
          The link to donate at the bottom right of the app will show him your support, Cheers TC!</p>
        <a href="https://www.timechaincalendar.com/en" target="_blank" rel="noopener noreferrer">
          www.timechaincalendar.com/en
        </a>
      </div>
      <br />
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default BitcoinPage;

