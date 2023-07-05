import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [BTCReceiveAddress, setBTCReceiveAddress] = useState('');
  const [amountToSpend, setAmountToSpend] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(response.data);
      setName(response.data.name);
      setBTCReceiveAddress(response.data.BTC_receive_address);
      setAmountToSpend(response.data.amountToSpend);
      setPhoneNum(response.data.phoneNum);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://localhost:3001/user/${id}`, // Updated endpoint URL
        {
          name,
          BTC_receive_address: BTCReceiveAddress,
          amountToSpend,
          phoneNum,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/user');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-user-page">
      <h1>Edit User</h1>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <label htmlFor="btc-receive-address">BTC Receive Address:</label>
      <input
        type="text"
        id="btc-receive-address"
        value={BTCReceiveAddress}
        onChange={(e) => setBTCReceiveAddress(e.target.value)}
      />
      <label htmlFor="amount-to-spend">Amount to Spend:</label>
      <input
        type="text"
        id="amount-to-spend"
        value={amountToSpend}
        onChange={(e) => setAmountToSpend(e.target.value)}
      />
      <label htmlFor="phone-number">Phone Number:</label>
      <input type="text" id="phone-number" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default EditUserPage;





































