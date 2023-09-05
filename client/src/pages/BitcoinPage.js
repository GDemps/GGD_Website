import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imageSource from '../Bitcoin_image.jpg'
import videoSource from '../BitcoinExplanation.mp4'; 
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
        <VideoModal isOpen={isModalOpen} onClose={closeModal} />
        <br />
        
        <div style={{ textAlign: 'center', marginTop: '20px', padding: '20px' }}>
        <h1>Bitcoin Page</h1>
        <h2>What is Bitcoin?</h2>
        <video
          src={videoSource}
          controls // Add controls to allow users to play/pause and adjust volume
          style={{ width: '50%', height: '50%' }}
        />
        </div>
        <div style={{ marginTop: '20px', padding: '20px' }}>
          <h2>Bitcoin Resources</h2>
          <h3>Documentaries</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.amazon.com/gp/video/detail/B01MTQZOCV/ref=atv_dp_share_cu_r">Banking on Bitcoin</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.amazon.com/gp/video/detail/B088Q5BYVR/ref=atv_dp_share_cu_r">Banking on Africa: The Bitcoin Revolution</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.amazon.com/gp/video/detail/B00OGM2ZY2/ref=atv_dp_share_cu_r">The Rise and Rise of Bitcoin</a>
            </li>
            <h3>Books</h3>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.audible.com/pd/The-Bitcoin-Standard-Audiobook/B07D7ZRKLJ?action_code=ASSGB149080119000H&share_location=pdp">The Bitcoin Standard</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.audible.com/pd/The-Price-of-Tomorrow-Audiobook/B08724Y81K?action_code=ASSGB149080119000H&share_location=pdp">The Price of Tomorrow</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.audible.com/pd/Bitcoin-Audiobook/B0B77W3XSW?action_code=ASSGB149080119000H&share_location=pdp">Bitcoin: Everything Divided by 21 Million</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.audible.com/pd/The-Bullish-Case-for-Bitcoin-Audiobook/B09QXR9GVL?action_code=ASSGB149080119000H&share_location=pdp">The Bullish Case for Bitcoin</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', backgroundImage: `url(${bitcoinLogo})`, backgroundSize: 'contain', width: '24px', height: '24px', display: 'inline-block' }}></span>
              <a href="https://www.audible.https://www.audible.com/pd/Check-Your-Financial-Privilege-Audiobook/B0B9T6BJC4?action_code=ASSGB149080119000H&share_location=pdp/pd/The-Bullish-Case-for-Bitcoin-Audiobook/B09QXR9GVL?action_code=ASSGB149080119000H&share_location=pdp">Check Your Financial Priviledge</a>
            </li>
            <h3>Podcasts</h3>
            
          </ul>
        </div>
        <iframe src="https://www.timechaincalendar.com/en" style={{ width: '100%', height: '750px' }}></iframe>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: 0, marginRight: '8px' }}>
            Credit to TC for the timechaincalendar.  
            The link to donate at the bottom right of the app can show him your support, Cheers TC!</p>
          <a href="https://www.timechaincalendar.com/en" target="_blank" rel="noopener noreferrer">
            www.timechaincalendar.com/en
          </a>
        </div>
      </div>
    </div>
  );
};

export default BitcoinPage;



