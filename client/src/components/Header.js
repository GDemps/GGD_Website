import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (e.g., tokens, session storage)
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login');
  };

  const renderAuthButtons = () => {
    // Check if the user is authenticated (e.g., token is present)
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
      // User is logged in
      return (
        <>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      );
    } else {
      // User is logged out
      return (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      );
    }
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bitcoin">Bitcoin</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          {renderAuthButtons()}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

