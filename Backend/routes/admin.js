const express = require('express');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

// Example route that requires admin access
router.get('/dashboard', isAdmin, (req, res) => {
  res.json({ message: 'Admin-only route accessed successfully' });
});

module.exports = router;