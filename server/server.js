require('./config/config');

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect(process.env.DBString, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err)
        throw err
    console.log('DB OK');


});



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port port!`));