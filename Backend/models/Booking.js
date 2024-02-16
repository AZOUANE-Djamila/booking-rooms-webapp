// models/bookinging.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  duration: {
    type: Number,
    required: false,
  },
  bookingStart: {
    type: Date,
    required: true,
  },
  bookingEnd: {
    type: Date,
    required: false,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
