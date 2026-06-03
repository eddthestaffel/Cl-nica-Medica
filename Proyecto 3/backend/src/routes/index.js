const express = require('express');
const config = require('../config');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: `Bienvenido a ${config.app.name}`, version: config.app.version });
});
router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/auth', require('./authRoutes'));
router.use('/pacientes', require('./pacienteRoutes'));
router.use('/turnos', require('./turnoRoutes'));
module.exports = router;