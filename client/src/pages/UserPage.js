import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get('http://localhost:3001/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        fetchUsersList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUsersList = () => {
    axios
      .get('http://localhost:3001/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        // Exclude admin user from the list
        const filteredUsers = response.data.filter((u) => u.isAdmin !== true && u.id !== user.id);
        setUsersList(filteredUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditProfile = () => {
    navigate(`/user/${user.id}/edit`);
  };

  const handleDeleteProfile = () => {
    axios
      .delete(`http://localhost:3001/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        navigate('/register');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:3001/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        fetchUsersList();
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

      {usersList.length > 0 && (
        <>
          <h2>All Users</h2>
          <ul>
            {usersList.map((u) => (
              <li key={u.id}>
                <p>Name: {u.name}</p>
                <p>BTC Receive Address: {u.BTC_receive_address}</p>
                <p>Amount To Spend: {u.amountToSpend}</p>
                <p>Phone Number: {u.phoneNum}</p>
                <button onClick={() => navigate(`/user/${u.id}/edit`)}>Edit</button>
                <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserPage;

























































