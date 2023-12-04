require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Supervisor = require('../models/Supervisor');

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Split "Bearer YOUR_JWT_TOKEN"

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      let user;
      // Check if the user is a supervisor or a regular user
      if (decoded.role === 'supervisor') {
        user = await Supervisor.findByPk(decoded.id);
      } else if (decoded.role === 'admin') {
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
