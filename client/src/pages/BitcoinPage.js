import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageSource from '../Bitcoin_image.jpg'
import videoSource from '../CongressBuyBitcoin.mp4'; 
import VideoModal from '../components/VideoModal';
import anotherImage from '../BTC_mining.jpg';
import bitcoinLogo from '../BTClogo.png';

const BitcoinPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBitcoinPage');
    const expirationTimestamp = localStorage.getItem('sessionExpiration');

    if (!hasVisitedBefore || (expirationTimestamp && Date.now() >= expirationTimestamp)) {
      // If it's the first visit or the session has expired, show the VideoModal and set the expiration timestamp
      setIsModalOpen(true);
      const newExpirationTimestamp = Date.now() + 60 * 60 * 1000; // Set expiration to 1 hour from now
      localStorage.setItem('hasVisitedBitcoinPage', 'true');
      localStorage.setItem('sessionExpiration', newExpirationTimestamp.toString());
    }
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center', backgroundColor: 'gray', height: '200px' }}>
        <img src={anotherImage} alt="Banner" style={{ width: '100%', height: '800px', objectFit: 'cover' }} />
      </div>
      <br />
      <div style={{ marginTop: '550px', padding: '20px' }}>
        <h1>Bitcoin Page</h1>
        <VideoModal isOpen={isModalOpen} onClose={closeModal} />
        {/* <img src={imageSource} alt="./Bitcoin_image.jpg" /> */}
        <br />
        <video src={videoSource} autoPlay loop />
        <br />
        <br />
        <iframe src="https://www.timechaincalendar.com/en" style={{ width: '100%', height: '750px' }}></iframe>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: 0, marginRight: '8px' }}>
            Credit to TC for the timechaincalendar.  
            The link to donate at the bottom right of the app can show him your support, Cheers TC!</p>
          <a href="https://www.timechaincalendar.com/en" target="_blank" rel="noopener noreferrer">
            www.timechaincalendar.com/en
          </a>
        </div>
        <br />
        <Link to="/">Go Back to Home</Link>
        <div style={{ marginTop: '20px' }}>
          <h2>Bitcoin Resources</h2>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.example.com/documentary1">Documentary 1</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.example.com/documentary2">Documentary 2</a>
            </li>
            {/* Add more links with Bitcoin logo bullets */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BitcoinPage;



