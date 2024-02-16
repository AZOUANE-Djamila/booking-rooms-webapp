const mongoose = require("mongoose");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Add a timestamp to the filename to make it unique
  },
});

const upload = multer({ storage: storage });

const Room = require("../models/Room");
const Booking = require("../models/Booking");

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('type').exec();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new room
const createRoom = async (req, res) => {
  try {
    upload.single("image")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({ error: "Error uploading image" });
      }

      const { name, capacity, type, features, location, floor } = req.body;

      // Get the filename of the uploaded image
      const imageUrl = req.file ? req.file.filename : "";

      // Create a new room with the provided data and image URL
      const newRoom = await Room.create({
        name,
        capacity,
        type,
        features,
        location,
        floor,
        imageUrl, // Save the image URL in the database
        availability
      });

      res.status(201).json(newRoom);
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(400).json({ error: "Bad Request" });
  }
};

// Get a specific room by its ID
const getRoomById = async (req, res) => {
  try {
    const { _id } = req.params;
    const room = await Room.findById(_id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const imageUrl = `http://localhost:5000/uploads/${room.imageUrl}`;

    // Return only the necessary room details
    const { name, type, features } = room;

    res.json({
      name,
      type,
      features,
      imageUrl,
    });
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const bookRoom = async (req, res) => {
  const { roomId } = req.params;
  const { user, bookingStart, bookingEnd } = req.body;

  try {
    // Validate data
    if (!user || !bookingStart || !bookingEnd) {
      return res
        .status(400)
        .json({
          error:
            "Invalid data. Both user, bookingStart, and bookingEnd are required.",
        });
    }

    // Convert bookingStart and bookingEnd to Date objects
    const formattedBookingStart = new Date(bookingStart);
    const formattedBookingEnd = new Date(bookingEnd);

    // Find the room
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Create a new booking
    const newBooking = await Booking.create({
      user,
      roomId,
      bookingStart: formattedBookingStart,
      bookingEnd: formattedBookingEnd,
    });

    // Associate the booking with the room
    room.bookings.push(newBooking);
    await room.save();

    // Respond with the created booking including formatted dates
    res.status(201).json({
      _id: newBooking._id,
      user: newBooking.user,
      roomId: newBooking.roomId,
      bookingStart: formattedBookingStart,
      bookingEnd: formattedBookingEnd,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to format date to "dd-mm-yyyy" format
const formatDate = (date) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.getMonth() + 1;
  const year = formattedDate.getFullYear();
  return `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;
};

module.exports = {
  getAllRooms,
  createRoom,
  getRoomById,
  bookRoom,
};
