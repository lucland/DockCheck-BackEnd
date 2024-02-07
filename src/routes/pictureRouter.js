const express = require('express');
const pictureController = require('../controllers/pictureController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/pictures:
 *  post:
 *    summary: Create a new picture
 *    tags: [Pictures]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Picture'
 *    responses:
 *      '201':
 *        description: Picture created successfully
 *      '500':
 *        description: Internal Server Error
 */
router.post('/', authenticateJWT, pictureController.createEmployeePicture);

/**
 * @swagger
 * /api/v1/pictures/{id}:
 *  get:
 *    summary: Get a picture by ID
 *    tags: [Pictures]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '404':
 *        description: Picture not found
 *      '500':
 *        description: Internal Server Error
 */
router.get('/:id', authenticateJWT, pictureController.getPicture);

/**
 * @swagger
 * /api/v1/pictures/{id}:
 *  put:
 *    summary: Update a picture by ID
 *    tags: [Pictures]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Picture'
 *    responses:
 *      '200':
 *        description: Picture updated successfully
 *      '404':
 *        description: Picture not found
 *      '500':
 *        description: Internal Server Error
 */
router.put('/:id', authenticateJWT, pictureController.updatePicture);

/**
 * @swagger
 * /api/v1/pictures/{id}:
 *  delete:
 *    summary: Delete a picture by ID
 *    tags: [Pictures]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Picture deleted successfully
 *      '404':
 *        description: Picture not found
 *      '500':
 *        description: Internal Server Error
 */
router.delete('/:id', authenticateJWT, pictureController.deletePicture);

module.exports = router;
