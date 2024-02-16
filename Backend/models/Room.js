// models/Room.js
const mongoose = require('mongoose');
const Booking = require('./Booking');
const RoomType = require('./RoomType');


const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true,
  },
  capacity: {
    type: Number,
    required: false,
  },
  features: {
    type: [String],
    default: [],
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ], 
  imageUrl: {
    type : String
  },
  location: String,
  floor: Number,
  availability: {
    type: Boolean,
    required: true,
    default: true
  },
  price: {
    type: Number, 
    required: false,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
