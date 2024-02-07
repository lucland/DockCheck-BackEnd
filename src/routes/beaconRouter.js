const express = require('express');
const beaconController = require('../controllers/beaconController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/beacons:
 *  post:
 *    summary: Create a new beacon
 *    tags: [Beacons]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Beacon'
 *    responses:
 *      '201':
 *        description: Beacon created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/', authenticateJWT, beaconController.createBeacon);

/**
 * @swagger
 * /api/v1/beacons/{id}:
 *  get:
 *    summary: Get a beacon by ID
 *    tags: [Beacons]
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
 *        description: Beacon not found
 *      '400':
 *        description: Bad request
 */
router.get('/:id', authenticateJWT, beaconController.getBeacon);

/**
 * @swagger
 * /api/v1/beacons:
 *  get:
 *    summary: Get all beacons
 *    tags: [Beacons]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/', authenticateJWT, beaconController.getAllBeacons);

/**
 * @swagger
 * /api/v1/beacons/{id}:
 *  put:
 *    summary: Update a beacon by ID
 *    tags: [Beacons]
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
 *            $ref: '#/components/schemas/Beacon'
 *    responses:
 *      '200':
 *        description: Beacon updated successfully
 *      '404':
 *        description: Beacon not found
 *      '400':
 *        description: Bad request
 */
router.put('/:id', authenticateJWT, beaconController.updateBeacon);

/**
 * @swagger
 * /api/v1/beacons/{id}:
 *  delete:
 *    summary: Delete a beacon by ID
 *    tags: [Beacons]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Beacon deleted successfully
 *      '404':
 *        description: Beacon not found
 *      '400':
 *        description: Bad request
 */
router.delete('/:id', authenticateJWT, beaconController.deleteBeacon);

/**
 * @swagger
 * /api/v1/beacons/attach/{id}:
 *  put:
 *    summary: Attach a beacon to an employee
 *    tags: [Beacons]
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
 *            type: object
 *            properties:
 *              employee_id:
 *                type: string
 *    responses:
 *      '200':
 *        description: Beacon updated successfully
 *      '404':
 *        description: Beacon not found
 *      '400':
 *        description: Bad request
 */
router.put('/attach/:id', authenticateJWT, beaconController.attachBeacon);

/**
 * @swagger
 * /api/v1/beacons/detach/{id}:
 *  put:
 *    summary: Detach a beacon from an employee
 *    tags: [Beacons]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Beacon updated successfully
 *      '404':
 *        description: Beacon not found
 *      '400':
 *        description: Bad request
 */
router.put('/detach/:id', authenticateJWT, beaconController.detachBeacon);

module.exports = router;
