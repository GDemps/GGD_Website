import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear local storage, remove tokens, etc.)
    localStorage.removeItem('token'); // Remove the token from local storage or any other storage mechanism

    // After logout, navigate back to the LoginPage
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ marginRight: '10px' }}>
      Logout
    </button>
  );
};

export default LogoutButton;
