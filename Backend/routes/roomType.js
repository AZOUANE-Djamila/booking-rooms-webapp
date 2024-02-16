const express = require("express");
const router = express.Router();
const roomTypeController = require("../controller/RoomType");

// Routes for room types
router.get("/", roomTypeController.getAllRoomTypes);
router.post("/", roomTypeController.createRoomType);
// Add routes for other CRUD operations

module.exports = router;
