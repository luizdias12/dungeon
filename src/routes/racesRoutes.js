const express = require('express');
const router = express.Router();
const racesController = require('../controllers/races');

// ROTAS GET ESPECIFICAS
router.get('/', racesController.getAll);
router.get('/random', racesController.getRandomRace);

// ROTAS POST

module.exports = router;