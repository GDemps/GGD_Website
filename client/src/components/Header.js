import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderAuthButtons = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
      return (
        <li className="nav-list-item">
          <button onClick={handleLogout} className="nav-link">Logout</button>
        </li>
      );
    } else {
      return (
        <li className="nav-list-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
      );
    }
  };

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/bitcoin" className="nav-link">Bitcoin</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/user" className="nav-link">User</Link>
          </li>
          {renderAuthButtons()}
        </ul>
      </nav>
    </header>
  );
};

export default Header;


