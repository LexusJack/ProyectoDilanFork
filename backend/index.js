const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Origen permitido
  credentials: true // Permitir cookies de sesión
}));

app.use(express.json());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false, // Evitar sesiones innecesarias
  cookie: { 
    secure: false, // Cambiar a true si usas HTTPS
    httpOnly: true,
    sameSite: 'lax', // Asegura que las cookies funcionen en el mismo dominio
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 semana de validez para la sesión
  }
}));

// Importar rutas
const sampleRoutes = require('./routes/samples');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/loginRoute');

// Registrar rutas
app.use('/api/samples', sampleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', loginRoutes);

// Ruta protegida para histologia.html
app.get('/histologia.html', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login.html'); // Redirigir si no está autenticado
  }
  res.sendFile(__dirname + '/path/to/histologia.html'); // Servir archivo si está autenticado
});

// Puerto desde .env o 3001 por defecto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Servir archivos DZI
app.use('/dzi', express.static('C:\\Users\\JOSSELYN\\Desktop\\TESIS DILAN\\DZI'));
