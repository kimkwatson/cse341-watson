const routes = require('express').Router();
const myController = require('../controllers');

// Route to Steve Watson
routes.get('/', myController.steveFunction); 

module.exports = routes;