import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import EditUserPage from './pages/EditUserPage';
import RegistrationPage from './pages/RegistrationPage';
import Header from './components/Header';

const NotFoundPage = () => {
  return <h2>404 - Page not found</h2>;
};

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/:id/edit" element={<EditUserPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;























