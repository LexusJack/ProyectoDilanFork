//Conexion a DBB

const mysql = require('mysql');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'MedicalHistDB',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

module.exports = db;
