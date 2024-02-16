"use strict";

// models/User.js
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  } // Add other fields as needed

});
var User = mongoose.model('User', userSchema);
module.exports = User;