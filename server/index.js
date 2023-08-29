const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

// Database
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: process.env.DB_PASSWORD,
  database: 'ggdllc',
});

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log('Running on port 3001');
});

// Get Bitcoin Page
app.get('/bitcoin', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/pages/BitcoinPage.js'));
});

const saltRounds = 10;
const jwtSecret = process.env.SEC_KEY; // remember to keep this secret

// Register User
app.post('/register', (req, res) => {
  const { name, BTC_receive_address, amountToSpend, phoneNum, password, isAdmin } = req.body;

  // Check if the username, BTC receive address, and phone number already exist
  db.query(
    'SELECT * FROM Users WHERE name = ? OR BTC_receive_address = ? OR phoneNum = ?',
    [name, BTC_receive_address, phoneNum],
    (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      // If any matching user is found, return an error response
      if (results.length > 0) {
        res.status(400).json({ error: 'Duplicate user information' });
        return;
      }

      // If no duplicates are found, proceed with user creation
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        db.query(
          'INSERT INTO Users (name, BTC_receive_address, amountToSpend, phoneNum, password, isAdmin) VALUES (?,?,?,?,?,?)',
          [name, BTC_receive_address, amountToSpend, phoneNum, hash, isAdmin],
          (error, results) => {
            if (error) {
              console.log(error);
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          }
        );
      });
    }
  );
});

// Login User
app.post('/login', (req, res) => {
    const { name, password } = req.body;
  
    db.query(
      'SELECT * FROM Users WHERE name = ?',
      name,
      (error, users) => {
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else if (users.length > 0) {
          const user = users[0];
  
          // Fetch the hashed password from the user object
          const hashedPassword = user.password;
  
          bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else if (result) {
              const token = jwt.sign(
                { id: user.id, isAdmin: user.isAdmin },
                jwtSecret,
                { expiresIn: '1h' }
              );
              res.json({ token });
            } else {
              res.sendStatus(401);
            }
          });
        } else {
          res.sendStatus(404);
        }
      }
    );
  });
  

// Get User by ID
app.get('/user', authenticateToken, (req, res) => {
    const userId = req.user.id;
  
    db.query('SELECT * FROM Users WHERE id = ?', userId, (error, users) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else if (users.length > 0) {
        res.json(users[0]);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
  });
   

// Update User
app.put('/user/:id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { name, BTC_receive_address, amountToSpend, phoneNum, password } = req.body;

  if (req.user.isAdmin || userId === req.user.id) {
    db.query(
      'SELECT * FROM Users WHERE id = ?',
      userId,
      (error, users) => {
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else if (users.length > 0) {
          const user = users[0];

          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }

            db.query(
              'UPDATE Users SET name = ?, BTC_receive_address = ?, amountToSpend = ?, phoneNum = ?, password = ? WHERE id = ?',
              [name, BTC_receive_address, amountToSpend, phoneNum, hash, userId],
              (error, result) => {
                if (error) {
                  console.log(error);
                  res.sendStatus(500);
                } else {
                  res.sendStatus(200);
                }
              }
            );
          });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      }
    );
  } else {
    res.status(403).json({ error: 'Unauthorized access' });
  }
});

// Delete User
app.delete('/user/:id', authenticateToken, requireAdmin, (req, res) => {
    const userId = req.params.id;
  
    db.query('DELETE FROM Users WHERE id = ?', userId, (error, result) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
  


// Get All Users (Admin Only)
app.get('/users', authenticateToken, requireAdmin, (req, res) => {
    const adminUserId = req.user.id;
  
    db.query('SELECT * FROM Users', (error, users) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        const filteredUsers = users.filter((user) => user.id !== adminUserId);
        res.json(filteredUsers);
      }
    });
  });
  
  

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      } else {
        return res.status(403).json({ error: 'Invalid token' });
      }
    }

    req.user = user;
    next();
  });
}

// Authorization Middleware
function requireAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403);
  }
  next();
}

module.exports = app;

















