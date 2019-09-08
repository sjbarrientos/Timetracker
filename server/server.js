//Load config consts
require('./config/config');

//Load required dependeces
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Configure Express
const app = express();
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

//Define public path
app.use(express.static(__dirname + '/public'))

//Import routes
app.use(require('./routes/index'));

//Conect to Mongo DB
mongoose.connect(process.env.DBString, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err)
        throw err
    console.log('Database connected susscessfuly');

});
// require('./models/status');
// require('./models/user');
// require('./models/task');
//Start server
app.listen(process.env.PORT, () => console.log(`Time Tracker Api running at port ${process.env.PORT}`));