// routes/roomRouter.js
const express = require("express");
const {
  getAllBookings,
} = require("../controllers/booking");

const router = express.Router();

router.get("/", getAllBookings);

module.exports = router;
