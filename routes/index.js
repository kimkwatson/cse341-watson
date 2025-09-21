const routes = require('express').Router();

const myController = require('../controllers');

routes.get('/', myController.steveFunction); 

module.exports = routes;