const RoomType = require("../models/RoomType");

// Controller functions for room types
exports.getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.json(roomTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRoomType = async (req, res) => {
  try {
    const { name, img_url, description } = req.body;
    const roomType = new RoomType({ name, img_url, description });
    await roomType.save();
    res.status(201).json(roomType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};