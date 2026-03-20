const express = require('express');
const jwt = require('jsonwebtoken');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');

const racesRoutes = require('./routes/racesRoutes');
const classesRoutes = require('./routes/classesRoutes');
const namesRoutes = require('./routes/namesRoutes');

const app = express();
app.use(express.json());

//Middlewares globais
app.use(logger);

//Rotas
app.use('/api/races', racesRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/names', namesRoutes);

//Middlewares de tratamento de erros
app.use(errorHandler);

module.exports = app;