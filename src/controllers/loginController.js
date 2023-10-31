const User = require('../models/User');
const Supervisor = require('../models/Supervisor');
const Login = require('../models/Login'); // Import the Login model
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const admin = require('../firebase');

exports.login = async (req, res) => {
  const { username, password, role, system } = req.body;

  // Check if the user is already logged in on the same system
  const existingLogin = await Login.findOne({ where: { user_id: username, system } });
  if (existingLogin) {
    return res.status(400).json({ message: 'User is already logged in on this system' });
  }

  let user;
  if (role === 'admin') {
    user = await User.findOne({ where: { username } });
  } else if (role === 'supervisor') {
    user = await Supervisor.findOne({ where: { username } });
  } else {
    return res.status(400).json({ message: 'Invalid role' });
  }

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
  const validPassword = (user.hash === hash);

  if (validPassword) {
    const token = jwt.sign({ id: user.id, role }, process.env.SECRET_KEY, { expiresIn: '2 days' });
    
    // Save login info
    await Login.create({
      user_id: username,
      timestamp: new Date(),
      expiration: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      system,
    });

    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.logout = async (req, res) => {
    const { username, system } = req.body;
  
    // Find and delete the login entry for the user on the specified system
    const existingLogin = await Login.findOne({ where: { user_id: username, system } });
    if (existingLogin) {
      await existingLogin.destroy();
      return res.status(200).json({ message: 'Successfully logged out' });
    } else {
      return res.status(400).json({ message: 'User is not logged in on this system' });
    }
  };
