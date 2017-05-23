const express = require('express');
const homesController = require('../controllers/homesController');

const homeRoutes = express.Router();

homeRoutes.get('/', homesController.index);
homeRoutes.get('/:id', homesController.show);
homeRoutes.post('/', homesController.create);
homeRoutes.put('/:id', homesController.update);
homeRoutes.delete('/:id', homesController.destroy);

module.exports = homeRoutes;