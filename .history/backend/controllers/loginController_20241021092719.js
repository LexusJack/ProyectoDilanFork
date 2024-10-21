// controllers/loginController.js
const db = require('../config/db');

const login = (req, res) => {
  const { username, password } = req.body;
  const cleanedUsername = username.trim().toLowerCase();

  const query = 'SELECT * FROM Users WHERE LOWER(username) = ?';
  db.query(query, [cleanedUsername], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en el servidor.' });
    }

    if (results.length === 0) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = results[0];

    if (user.password === password) {
      req.session.user = user;
      console.log('Login exitoso:', user);
      return res.status(200).json({ message: 'Login exitoso' });
    } else {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión.');
    }
    res.redirect('/');
  });
};

module.exports = { login, logout };
