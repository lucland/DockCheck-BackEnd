const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Supervisor = require('../models/Supervisor');
const crypto = require('crypto');

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
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

      // Validate the hash
      const hash = crypto.pbkdf2Sync(decoded.password, user.salt, 1000, 64, 'sha512').toString('hex');
      if (hash !== user.hash) {
        return res.status(403).json({ message: 'Invalid credentials' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token', error: err });
    }
  } else {
    res.status(401).json({ message: 'Token not provided' });
  }
};

module.exports = authenticateJWT;
