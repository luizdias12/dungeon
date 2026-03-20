const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classes');

// ROTAS GET ESPECIFICAS
router.get('/', classesController.getAll);
router.get('/random', classesController.getRandomClass);

// ROTAS POST

module.exports = router;