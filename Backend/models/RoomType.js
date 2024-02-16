const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  name: String,
  img_url: { type: mongoose.Schema.Types.ObjectId },
  description: String,
});

module.exports = mongoose.model("RoomType", roomTypeSchema);
