const express = require('express');

const UserController = require('./controllers/UserController');
const OrderController = require('./controllers/OrderController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const SaleController = require('./controllers/SaleController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/profile', ProfileController.index);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.create);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/sales', SaleController.index);
routes.post('/sales', SaleController.create);
routes.delete('/sales/:id', SaleController.delete);

module.exports = routes;
