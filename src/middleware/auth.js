require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY;
const MASTER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imx1Y2FzdmNhcm5laXJvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk5MzAwMTYxLCJleHAiOjE2OTk0NzI5NjF9.QytPS1faAJDDHVb9VuMRLeHXzBzb9ME_HGNThSpe1Lc"; // Hardcoded token

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Split "Bearer YOUR_JWT_TOKEN"

    if (token === MASTER_TOKEN) {
      next(); // Bypass JWT verification and proceed
      return;
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      let user;
      // Check if the user is a supervisor or a regular user
       if (decoded.role === 'admin') {
        user = await User.findByPk(decoded.id);
      }

      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token', error: err.message });
    }
  } else {
    res.status(401).json({ message: 'Token not provided' });
  }
};

module.exports = authenticateJWT;
