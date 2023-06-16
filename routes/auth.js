const express = require('express');
const controllers = require('../controllers/controllers');
const app = express();

app.post('/register', controllers.register);
app.post('/login', controllers.login);


app.post('/registerpass', controllers.registerpass);
app.post('/assignfine', controllers.assignfine);

module.exports = app;

