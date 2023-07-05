import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios.post('http://localhost:3001/login', {
      name: name,
      password: password,
    }).then((response) => {
      console.log(response);
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      navigate('/'); // Redirect to the HomePage.js after successful login
    });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <input type="text" placeholder="Username" onChange={(e) => {setName(e.target.value);}} />
        <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value);}} />
        <button type="button" onClick={login}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
