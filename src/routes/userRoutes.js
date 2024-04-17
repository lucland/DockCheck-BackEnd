const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 */
router.post('/create', userController.createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: User not found
 *       '400':
 *         description: Bad request
 */
router.get('/:id', authenticateJWT, userController.getUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 *       '400':
 *         description: Bad request
 */
router.put('/:id', authenticateJWT, userController.updateUser);

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Bad request
 */
router.get('/', authenticateJWT, userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/search:
 *   get:
 *     summary: Search for users by name or id
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *         description: The name or id to search for
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Bad request
 */
router.get('/search', authenticateJWT, userController.searchUsers);

/**
 * @swagger
 * /api/v1/users/block/{id}:
 *   put:
 *     summary: Block a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: The reason for blocking the user
 *     responses:
 *       '200':
 *         description: User blocked successfully
 *       '404':
 *         description: User not found
 *       '400':
 *         description: Bad request
 */
router.put('/block/:id', authenticateJWT, userController.blockUser);

/**
 * @swagger
 * /api/v1/users/unblock/{id}:
 *   put:
 *     summary: Unblock a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User unblocked successfully
 *       '404':
 *         description: User not found
 *       '400':
 *         description: Bad request
 */
router.put('/unblock/:id', authenticateJWT, userController.unblockUser);

//getNextUserNumber
/**
 * @swagger
 * /api/v1/users/getNextUserNumber:
 *   get:
 *     summary: Get the next user number
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Bad request
 */
router.get('/getNextUserNumber', userController.getNextUserNumber);

module.exports = router;
