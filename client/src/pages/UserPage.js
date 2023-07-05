import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios.get('http://localhost:3001/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleEditProfile = () => {
    navigate(`/user/${user.id}/edit`);
  };

  const handleDeleteProfile = () => {
    axios.delete(`http://localhost:3001/user/${user.id}`)
      .then(() => {
        // Redirect to the registration page after successful deletion
        navigate('/register');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>BTC Receive Address: {user.BTC_receive_address}</p>
      <p>Amount To Spend: {user.amountToSpend}</p>
      <p>Phone Number: {user.phoneNum}</p>
      <button onClick={handleEditProfile}>Edit Profile</button>
      <button onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
  );
};

export default UserPage;













































