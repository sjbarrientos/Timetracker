//Load config consts
require('./config/config');

//Load required dependeces
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Configure Express
const app = express();
// Create application/json parser
const jsonParser = bodyParser.json();
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//  Define public path
app.use(express.static(__dirname + '/public'))
    //Import routes
app.use(require('./routes/index.js'));

//Conect to Mongo DB
mongoose.connect(process.env.DBString, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err)
        throw err
    console.log('Database connected susscessfuly');

});

//Start server
app.listen(process.env.PORT, () => console.log(`Time Tracker Api running at port ${process.env.PORT}`));