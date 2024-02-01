"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

require('dotenv').config();

var port = process.env.PORT || 5000; // Move mongoose.connect call before importing dbo

var dbo = require('./db/conn'); // Import the mongoose connection


app.use(cors());
app.use(express.json()); // Routes

app.use([require('./routes/auth'), require('./routes/rooms')]); // Start the server

dbo.once('open', function () {
  app.listen(port, function () {
    console.log("Server is running on port: ".concat(port));
  });
});