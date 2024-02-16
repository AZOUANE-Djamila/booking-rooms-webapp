// isAdmin.js
const isAdmin = (req, res, next) => {
    // Check if the user is authenticated and has the 'admin' role
    if (req.user && req.user.role === 'admin') {
      return next(); // User is an admin, proceed to the next middleware
    }
  
    // If not an admin, respond with unauthorized status
    return res.status(401).json({ error: 'Unauthorized access' });
  };
  
  module.exports = isAdmin;
  