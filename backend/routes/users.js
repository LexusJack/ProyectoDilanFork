const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      req.session.user = results[0];
      res.status(200).send('Login exitoso');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
