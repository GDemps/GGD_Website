import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [BTC_receive_address, setBTCReceiveAddress] = useState("");
  const [amountToSpend, setAmountToSpend] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const register = () => {
    axios.post('http://localhost:3001/register', {
      name: name,
      BTC_receive_address: BTC_receive_address,
      amountToSpend: amountToSpend,
      phoneNum: phoneNum,
      password: password,
      isAdmin: isAdmin,
    })
    .then((response) => {
      console.log(response);
      navigate('/login'); // Redirect to the LoginPage
    })
    .catch((error) => {
      console.log(error.response);
      setError(error.response.data.error);
    });
  };

  return (
    <div className="register">
      <h2>Registration</h2>
      {error && <p>{error}</p>}
      <label>Name:</label>
      <input type="text" onChange={(e) => {setName(e.target.value);}} />
      <label>BTC Receive Address:</label>
      <input type="text" onChange={(e) => {setBTCReceiveAddress(e.target.value);}} />
      <label>Amount to Spend:</label>
      <input type="text" onChange={(e) => {setAmountToSpend(e.target.value);}} />
      <label>Phone Number:</label>
      <input type="text" onChange={(e) => {setPhoneNum(e.target.value);}} />
      <label>Password:</label>
      <input type="password" onChange={(e) => {setPassword(e.target.value);}} />
      <label>Admin:</label>
      <input type="checkbox" onChange={(e) => {setIsAdmin(e.target.checked);}} />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default RegistrationPage;

