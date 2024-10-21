// routes/loginRoute.js
const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/loginController'); // Verificar la ruta de importación

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para cerrar sesión
router.post('/logout', logout);

module.exports = router;
