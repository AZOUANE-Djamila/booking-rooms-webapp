// controllers/bookingController.js
const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Get bookings for a specific room
exports.getBookingsByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Find the room by its _id
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Use the populate method to get bookings with associated room details
    const bookings = await Booking.find({ roomId }).populate("roomId", "name capacity");

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings for a room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    // Retrieve all bookings
    const allBookings = await Booking.find();

    res.json(allBookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
