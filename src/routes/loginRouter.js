require('dotenv').config(); // Make sure to require this at the top of your file
const express = require('express');
const User = require('../models/User');
const Supervisor = require('../models/Supervisor');
const authController = require('../controllers/loginController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const crypto = require('crypto');

/**
 * @swagger
 * /api/v1/login:
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
 *               - system
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
 *               system:
 *                 type: string
 *                 enum: [windows, android, ios]
 *                 description: The system from which the user is logging in.
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
 *         description: Bad request, invalid role or system or other issues.
 *       401:
 *         description: Authentication failed, user not found or invalid credentials.
 */
router.post('/', authController.login);

/**
 * @swagger
 * /api/v1/logout:
 *   post:
 *     summary: Logout from the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - system
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               system:
 *                 type: string
 *                 enum: [windows, android, ios]
 *                 description: The system from which the user is logging out.
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Logout message
 *       400:
 *         description: Bad request, user is not logged in on this system or other issues.
 */
router.post('/logout', authController.logout);
  
  module.exports = router;
