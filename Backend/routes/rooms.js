// routes/roomRouter.js
const express = require("express");
const {
  getAllRooms,
  getRoomById,
  createRoom,
  bookRoom,
} = require("../controllers/room");
const { getBookingsByRoomId } = require("../controllers/booking");

const router = express.Router();

router.get("/", getAllRooms);
router.get("/:_id", getRoomById);
router.get("/:roomId/bookings", getBookingsByRoomId);

router.post("/", createRoom);
//router.put('/rooms/:id', updateRoom);
//router.delete('/rooms/:id', deleteRoom);
router.post("/:roomId/bookings", bookRoom);

module.exports = router;