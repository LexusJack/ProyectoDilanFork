// controllers/loginController.js
const db = require('../config/db');
const bcrypt = require('bcrypt'); // Asegúrate de instalar bcrypt

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

    // Compara la contraseña ingresada con la almacenada
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).json({ error: 'Error en el servidor.' });
      }
      if (isMatch) {
        req.session.user = user;
        console.log('Login exitoso:', user);
        return res.status(200).json({ message: 'Login exitoso' });
      } else {
        console.log('Contraseña incorrecta');
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }
    });
  });
};

const createUser = (req, res) => {
  const { username, password } = req.body; // Eliminado email
  const cleanedUsername = username.trim().toLowerCase();
  
  // Verificar si el usuario ya existe
  const checkQuery = 'SELECT * FROM Users WHERE LOWER(username) = ?';
  db.query(checkQuery, [cleanedUsername], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en el servidor.' });
    }

    if (results.length > 0) {
      console.log('El usuario ya existe');
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Hash de la contraseña antes de almacenar
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error al hashear la contraseña:', err);
        return res.status(500).json({ error: 'Error en el servidor.' });
      }

      // Inserta el nuevo usuario en la base de datos
      const insertQuery = 'INSERT INTO Users (username, password) VALUES (?, ?)'; // Eliminado email
      db.query(insertQuery, [cleanedUsername, hashedPassword], (err, results) => {
        if (err) {
          console.error('Error al insertar el usuario:', err);
          return res.status(500).json({ error: 'Error en el servidor.' });
        }

        console.log('Usuario creado exitosamente:', { username: cleanedUsername });
        return res.status(201).json({ message: 'Usuario creado exitosamente' });
      });
    });
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

module.exports = { login, createUser, logout };