const db = require('../config/db');

// Obtener todas las muestras
const getAllSamples = (req, res) => {
  // Nueva consulta con JOIN para obtener el nombre del tissue type
  const query = `
    SELECT 
      s.*, 
      t.name as tissue_type_name 
    FROM 
      Samples s
    LEFT JOIN 
      TissueTypes t 
    ON 
      s.tissue_type_id = t.id`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};


// Obtener una muestra específica por ID
const getSampleById = (req, res) => {
  // Nueva consulta con JOIN para obtener el nombre del tissue type
  const query = `
    SELECT 
      s.*, 
      t.name as tissue_type_name 
    FROM 
      Samples s
    LEFT JOIN 
      TissueTypes t 
    ON 
      s.tissue_type_id = t.id
    WHERE 
      s.id = ?`;

  const { id } = req.params;

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    res.json(results[0]);
  });
};

const getSampleByDzi = (req, res) => {
  const { dzi } = req.query;

  const query = `
    SELECT 
      s.*, 
      t.name as tissue_type_name 
    FROM 
      Samples s
    LEFT JOIN 
      TissueTypes t 
    ON 
      s.tissue_type_id = t.id
    WHERE 
      s.dzi_path = ?`;

  db.query(query, [dzi], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    res.json(results[0]);
  });
};


module.exports = {
  getAllSamples,
  getSampleById,
  getSampleByDzi,
};
