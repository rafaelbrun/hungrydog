const express = require('express');
const InfoController = require('./controllers/InfoController');

const routes = express.Router();

routes.get('/infos/lendo/:id', InfoController.ler);

routes.post('/infos/validando', InfoController.validar);
routes.post('/infos/pedindo', InfoController.pedir);
routes.post('/infos/finalizando', InfoController.finalizar);
routes.post('/infos/create', InfoController.create);

module.exports = routes;