const express = require('express');
const router = express.Router();
const classesController = require('../controllers/classes');

// ROTAS GET ESPECIFICAS
router.get('/', classesController.getAll);
router.get('/random', classesController.getRandomClass);

// ROTAS GET DINAMICAS
router.get('/:id', classesController.getById);

// ROTAS POST

module.exports = router;