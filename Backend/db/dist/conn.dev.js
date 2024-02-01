"use strict";

var mongoose = require('mongoose');

var DB_URI = process.env.ATLAS_URI;
console.log("DB_URI = ", DB_URI);
mongoose.connect(DB_URI).then(function () {
  console.log('Connected successfully to MongoDB');
})["catch"](function (err) {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});
module.exports = mongoose.connection;