const express = require('express');
const router = express.Router();
const namesController = require('../controllers/names');

// ROTAS GET ESPECIFICAS
router.get('/', namesController.getAll);
router.get('/random/:genderId/:raceId', namesController.getRandomName);

// ROTAS GET DINAMICAS
router.get('/:id', namesController.getById);
router.get('/race/:raceId', namesController.getByRace);
router.get('/gender/:genderId', namesController.getByGender);

// ROTAS POST

module.exports = router;