const express = require('express');
const app = express();
//list projects
app.post('/api/project/', (req, res) => res.send('Hello World!'));
//create project
app.post('/api/project/', (req, res) => res.send('Hello World!'));
//add task
app.put('/api/project/add_task/', (req, res) => res.send('Hello World!'));

module.exports = app;