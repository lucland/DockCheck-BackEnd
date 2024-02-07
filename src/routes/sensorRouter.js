const express = require('express');
const sensorController = require('../controllers/sensorController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/sensors:
 *  post:
 *    summary: Create a new sensor
 *    tags: [Sensors]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sensor'
 *    responses:
 *      '201':
 *        description: Sensor created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/', authenticateJWT, sensorController.createSensor);

/**
 * @swagger
 * /api/v1/sensors/{id}:
 *  get:
 *    summary: Get a sensor by ID
 *    tags: [Sensors]
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
 *        description: Sensor not found
 *      '400':
 *        description: Bad request
 */
router.get('/:id', authenticateJWT, sensorController.getSensor);

/**
 * @swagger
 * /api/v1/sensors:
 *  get:
 *    summary: Get all sensors
 *    tags: [Sensors]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/', authenticateJWT, sensorController.getAllSensors);

/**
 * @swagger
 * /api/v1/sensors/{id}:
 *  put:
 *    summary: Update a sensor by ID
 *    tags: [Sensors]
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
 *            $ref: '#/components/schemas/Sensor'
 *    responses:
 *      '200':
 *        description: Sensor updated successfully
 *      '404':
 *        description: Sensor not found
 *      '400':
 *        description: Bad request
 */
router.put('/:id', authenticateJWT, sensorController.updateSensor);

/**
 * @swagger
 * /api/v1/sensors/{id}:
 *  delete:
 *    summary: Delete a sensor by ID
 *    tags: [Sensors]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Sensor deleted successfully
 *      '404':
 *        description: Sensor not found
 *      '400':
 *        description: Bad request
 */
router.delete('/:id', authenticateJWT, sensorController.deleteSensor);

/**
 * @swagger
 * /api/v1/sensors/{id}/updateBeaconsFound:
 *  put:
 *    summary: Update beacons found in a sensor
 *    tags: [Sensors]
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
 *              beacons_found:
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      '200':
 *        description: Sensor updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Sensor not found
 */
router.put('/:id/updateBeaconsFound', authenticateJWT, sensorController.updateBeaconsFound);

/**
 * @swagger
 * /api/v1/sensors/{id}/updateSensorLocation:
 *  put:
 *    summary: Update the location of a sensor
 *    tags: [Sensors]
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
 *              location_x:
 *                type: integer
 *              location_y:
 *                type: integer
 *    responses:
 *      '200':
 *        description: Sensor location updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Sensor not found
 */
router.put('/:id/updateSensorLocation', authenticateJWT, sensorController.updateSensorLocation);

module.exports = router;
