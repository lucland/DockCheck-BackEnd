require('dotenv').config(); // Make sure to require this at the top of your file
const express = require('express');
const User = require('../models/User');
const Supervisor = require('../models/Supervisor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *               role:
 *                 type: string
 *                 enum: [admin, supervisor]
 *                 description: The role of the user.
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Bad request, invalid role or other issues.
 *       401:
 *         description: Authentication failed, user not found or invalid credentials.
 */
router.post('/', async (req, res) => {
    const { username, password, role } = req.body;
  
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
  
    // Assuming 'hash' is the field where the hashed password is stored
    const validPassword = await bcrypt.compare(password, user.hash);
  
    if (validPassword) {
      const token = jwt.sign({ id: user.id, role }, process.env.SECRET_KEY, { expiresIn: '2 days' });
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
  
  module.exports = router;