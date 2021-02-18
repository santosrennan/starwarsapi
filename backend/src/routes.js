const express = require('express');
const routes = express.Router();

const PlanetsController = require('./controllers/PlanetsController');

routes.get('/planets', PlanetsController.index);
routes.post('/planets', PlanetsController.create);
routes.put('/planets/:id', PlanetsController.update);
routes.delete('/planets/:id', PlanetsController.delete);


routes.get('/planets/CheckCountMovies/:name', PlanetsController.CheckCountMovies);
routes.get('/planets/getByName/:name', PlanetsController.getByName);
routes.get('/planets/getById/:id', PlanetsController.getById);

module.exports = routes;