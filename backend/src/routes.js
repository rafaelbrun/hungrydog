const express = require('express');
const InfoController = require('./controllers/InfoController');

const routes = express.Router();

routes.get('/infos', InfoController.index);
routes.post('/infos', InfoController.create);

module.exports = routes;