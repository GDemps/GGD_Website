import React from 'react';
import { Link } from 'react-router-dom';
import imageSource from '../Crew.jpg';
import videoSource from '../CongressBuyBitcoin.mp4';

const BitcoinPage = () => {
  return (
    <div>
      <h1>Bitcoin Page</h1>
      <video src={videoSource} controls loop />
      <br />
      <br />
      <iframe src="https://www.timechaincalendar.com/en" style={{ width: '100%', height: '750px' }}></iframe>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '8px' }}>Credit to TC for the timechaincalendar, Cheers TC!</p>
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
