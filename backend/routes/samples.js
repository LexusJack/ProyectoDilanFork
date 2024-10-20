//Endpoints de la API

const express = require('express');
const router = express.Router();
const { getAllSamples, getSampleById, getSampleByDzi } = require('../controllers/sampleController');

// Ruta para obtener todas las muestras
router.get('/', getAllSamples);

// Ruta para obtener una muestra específica por ID
router.get('/:id', getSampleById);

// Ruta para obtener una muestra específica por DZI
router.get('/dzi', getSampleByDzi);

module.exports = router;
