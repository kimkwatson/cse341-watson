const routes = require('express').Router();
const myController = require('../controllers');

routes.use("/contacts", require("./contacts"));

// Route to Steve Watson
routes.get('/', myController.steveFunction); 

module.exports = routes;