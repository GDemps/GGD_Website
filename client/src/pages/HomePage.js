import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import imageSource from '../Crew.jpg';
import videoSource from '../CongressBuyBitcoin.mp4';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const goToUserProfile = () => {
    navigate('/user');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          {!isLoggedIn && (
            <>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
          {isLoggedIn && (
            <>
              <button onClick={goToUserProfile}>User Profile</button>
              {/* Add any other authenticated user links/buttons here */}
              <LogoutButton />
            </>
          )}
        </div>
      </div>
      <img src={imageSource} alt="./Crew.jpg" />
      {/* <br />
      <video src={videoSource} controls loop />
      <br />
      <br />
      <br />
      <iframe src="https://www.timechaincalendar.com/en" style={{ width: '100%', height: '750px' }}></iframe>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, marginRight: '8px' }}>Credit to TC for the timechaincalendar, Cheers TC!</p>
        <a href="https://www.timechaincalendar.com/en" target="_blank" rel="noopener noreferrer">
          www.timechaincalendar.com/en
        </a>
      </div> */}
    </div>
  );
};

export default HomePage;












