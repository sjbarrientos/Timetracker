const express = require('express');
const app = express();

//import routes
app.use(require('./users'));
app.use(require('./tasks'));
app.use(require('./projects'));

module.exports = app;