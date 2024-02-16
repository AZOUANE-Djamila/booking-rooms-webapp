const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const dbo = require('./db/conn'); // Import the mongoose connection
const roomRoutes = require("./routes/rooms");
const accountRoutes = require("./routes/account");
const bookingRoutes = require("./routes/booking");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
dbo.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/accounts", accountRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
