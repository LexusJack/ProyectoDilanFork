// routes/loginRoute.js
const express = require('express');
const router = express.Router();
const { login, logout, createUser } = require('../controllers/loginController'); // Asegúrate de importar createUser

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para cerrar sesión
router.post('/logout', logout);

// Ruta para crear un nuevo usuario
router.post('/register', createUser); // Nueva ruta para registro

module.exports = router;