const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

/**
 * @swagger
 * /events:
 *  post:
 *    summary: Create a new event
 *    tags: [Events]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Event'
 *    responses:
 *      '201':
 *        description: Event created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/create', eventController.createEvent);

/**
 * @swagger
 * /events/{id}:
 *  get:
 *    summary: Get an event by ID
 *    tags: [Events]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Event ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '404':
 *        description: Event not found
 */
router.get('/:id', eventController.getEvent);

/**
 * @swagger
 * /events/{id}:
 *  put:
 *    summary: Update an event by ID
 *    tags: [Events]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Event ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Event'
 *    responses:
 *      '200':
 *        description: Event updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Event not found
 */
router.put('/:id', eventController.updateEvent);

/**
 * @swagger
 * /events/{id}:
 *  delete:
 *    summary: Delete an event by ID
 *    tags: [Events]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Event ID
 *    responses:
 *      '204':
 *        description: Event deleted successfully
 *      '404':
 *        description: Event not found
 */
router.delete('/:id', eventController.deleteEvent);

/**
 * @swagger
 * /events:
 *  get:
 *    summary: Get all events
 *    tags: [Events]
 *    responses:
 *      '200':
 *        description: Successful operation
 */
router.get('/', eventController.getAllEvents);

module.exports = router;
