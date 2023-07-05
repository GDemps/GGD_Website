import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

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
  );
};

export default HomePage;


