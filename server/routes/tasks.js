const express = require('express');
const app = express();
//get task
app.get('/api/task/:id', (req, res) => res.send('Hello World!'));
//create task
app.post('/api/task/', (req, res) => res.send('Hello World!'));
//start/ pause /restart task
app.put('/api/task/start/:id', (req, res) => res.send('Hello World!'));
//associate project
app.put('/api/task/rel_project/', (req, res) => res.send('Hello World!'));

module.exports = app;