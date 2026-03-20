const express = require('express');
const router = express.Router();
const namesController = require('../controllers/names');

// ROTAS GET ESPECIFICAS
router.get('/', namesController.getAll);
router.get('/random/:genderId/:raceId', namesController.getRandomName);

// ROTAS POST

module.exports = router;