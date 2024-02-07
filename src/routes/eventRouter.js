const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itag
 *               - code
 *               - action
 *               - project_id
 *               - timestamp
 *             properties:
 *               itag:
 *                 type: string
 *                 description: The ITAG string
 *               code:
 *                 type: integer
 *                 description: The code of the sensor
 *               action:
 *                 type: integer
 *                 description: The action of the event
 *               project_id:
 *                 type: string
 *                 description: The project ID
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp of the event
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created event
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.post('/', eventController.createEvent);

/**
 * @swagger
 * /api/v1/events/{employee_id}:
 *   get:
 *     summary: Get all events of a specific employee
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the employee
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the event
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:employee_id', eventController.getEventsByEmployeeId);

/**
 * @swagger
 * /api/v1/events/single/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the event
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the event
 *                 employee_id:
 *                   type: string
 *                   description: The ID of the employee associated with the event
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp of the event
 *                 project_id:
 *                   type: string
 *                   description: The ID of the project associated with the event
 *                 action:
 *                   type: integer
 *                   description: The action of the event
 *                 sensor_id:
 *                   type: string
 *                   description: The ID of the sensor associated with the event
 *                 status:
 *                   type: string
 *                   description: The status of the event
 *                 beacon_id:
 *                   type: string
 *                   description: The ID of the beacon associated with the event
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/single/:id', eventController.getEventById);

/**
 * @swagger
 * /api/v1/events/specific:
 *   post:
 *     summary: Create a specific event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itag
 *               - code
 *               - action
 *               - project_id
 *               - timestamp
 *             properties:
 *               itag:
 *                 type: string
 *                 description: The ITAG string
 *               code:
 *                 type: integer
 *                 description: The code of the sensor
 *               action:
 *                 type: integer
 *                 description: The action of the event
 *               project_id:
 *                 type: string
 *                 description: The project ID
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp of the event
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created event
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/specific', eventController.createSpecificEvent);

module.exports = router;
