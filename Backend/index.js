const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

// Move mongoose.connect call before importing dbo
const dbo = require('./db/conn'); // Import the mongoose connection

app.use(cors());
app.use(express.json());

// Routes
app.use([require('./routes/auth'), require('./routes/rooms')]);

// Start the server
dbo.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
