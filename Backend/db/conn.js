const mongoose = require('mongoose');

const DB_URI = process.env.ATLAS_URI;
console.log("DB_URI = ",DB_URI)
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

module.exports = mongoose.connection;
