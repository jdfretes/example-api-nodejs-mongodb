'use strict'
const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors')
const app = express();
const api = require('./routes/index');
//var jwt = require('jsonwebtoken');
//var io = require('socket.io')(http);

//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

module.exports = app