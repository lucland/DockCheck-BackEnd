const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '201':
 *        description: User created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/create', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Get a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '404':
 *        description: User not found
 */
router.get('/:id', userController.getUser);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: User updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: User not found
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Delete a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    responses:
 *      '204':
 *        description: User deleted successfully
 *      '404':
 *        description: User not found
 */
router.delete('/:id', userController.deleteUser);

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: Successful operation
 */
router.get('/', userController.getAllUsers);

module.exports = router;
