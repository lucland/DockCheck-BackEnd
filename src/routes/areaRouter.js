const express = require('express');
const areaController = require('../controllers/areaController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/areas/create:
 *  post:
 *    summary: Create a new area
 *    tags: [Areas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Area'
 *    responses:
 *      '201':
 *        description: Area created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Area'
 *            example:
 *              message: "Area created successfully"
 *              id: "area123"
 *              count: 5
 *              name: "Area A"
 *              is_portalo: true
 *              status: "active"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error creating area"
 *              error: "Details about the error"
 */
router.post('/create', authenticateJWT, areaController.createArea);

/**
 * @swagger
 * /api/v1/areas/{id}:
 *  get:
 *    summary: Get an area by ID
 *    tags: [Areas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Area ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Area'
 *            example:
 *              id: "area123"
 *              count: 5
 *              name: "Area A"
 *              is_portalo: true
 *              status: "active"
 *      '404':
 *        description: Area not found
 *        content:
 *          application/json:
 *            example:
 *              message: "Area not found"
 */
router.get('/:id', authenticateJWT, areaController.getArea);

/**
 * @swagger
 * /api/v1/areas:
 *  get:
 *    summary: Get all areas
 *    tags: [Areas]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Area'
 *            example:
 *              - id: "area123"
 *                count: 5
 *                name: "Area A"
 *                is_portalo: true
 *                status: "active"
 *              - id: "area124"
 *                count: 3
 *                name: "Area B"
 *                is_portalo: false
 *                status: "inactive"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error fetching areas"
 *              error: "Details about the error"
 */
router.get('/', authenticateJWT, areaController.getAllAreas);

/**
 * @swagger
 * /api/v1/areas/{id}:
 *  put:
 *    summary: Update an area by ID
 *    tags: [Areas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Area ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Area'
 *    responses:
 *      '200':
 *        description: Area updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AreaResponse'
 *            example:
 *              message: "Area updated successfully"
 *              id: "area123"
 *              count: 10
 *              name: "Updated Area A"
 *              is_portalo: false
 *              status: "active"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error updating area"
 *              error: "Details about the error"
 */
router.put('/:id', authenticateJWT, areaController.updateArea);

/**
 * @swagger
 * /api/v1/areas/{id}:
 *  delete:
 *    summary: Delete an area by ID
 *    tags: [Areas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Area ID
 *    responses:
 *      '200':
 *        description: Area deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *            example:
 *              message: "Area deleted successfully"
 *      '404':
 *        description: Area not found
 *        content:
 *          application/json:
 *            example:
 *              message: "Area not found"
 */
router.delete('/:id', authenticateJWT, areaController.deleteArea);

module.exports = router;
