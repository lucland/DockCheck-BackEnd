const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

/**
 * @swagger
 * /events/create:
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
 *        content:
 *          application/json:
 *            example:
 *              id: "event123"
 *              portal_id: "portal1"
 *              user_id: "user1"
 *              timestamp: "2023-10-25T00:00:00.000Z"
 *              direction: 1
 *              picture: "picture_url"
 *              vessel_id: "vessel123"
 *              action: 1
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error creating event"
 *              error: "Details about the error"
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
 *        content:
 *          application/json:
 *            example:
 *              id: "event123"
 *              portal_id: "portal1"
 *              user_id: "user1"
 *              timestamp: "2023-10-25T00:00:00.000Z"
 *              direction: 1
 *              picture: "picture_url"
 *              vessel_id: "vessel123"
 *              action: 1
 *      '404':
 *        description: Event not found
 *        content:
 *          application/json:
 *            example:
 *              message: "Event not found"
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
 *        content:
 *          application/json:
 *            example:
 *              id: "event123"
 *              portal_id: "portal1"
 *              user_id: "user2"
 *              timestamp: "2023-10-25T00:00:00.000Z"
 *              direction: 2
 *              picture: "new_picture_url"
 *              vessel_id: "vessel123"
 *              action: 2
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error updating event"
 *              error: "Details about the error"
 *      '404':
 *        description: Event not found
 *        content:
 *          application/json:
 *            example:
 *              message: "Event not found"
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
 *        content:
 *          application/json:
 *            example:
 *              - id: "event123"
 *                portal_id: "portal1"
 *                user_id: "user1"
 *                timestamp: "2023-10-25T00:00:00.000Z"
 *                direction: 1
 *                picture: "picture_url"
 *                vessel_id: "vessel123"
 *                action: 1
 *              - id: "event124"
 *                portal_id: "portal2"
 *                user_id: "user2"
 *                timestamp: "2023-10-26T00:00:00.000Z"
 *                direction: 2
 *                picture: "another_picture_url"
 *                vessel_id: "vessel124"
 *                action: 2
 */
router.get('/', eventController.getAllEvents);

/**
 * @swagger
 * /events/sync:
 *  post:
 *    summary: Sync events
 *    tags: [Events]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: 'object'
 *            properties:
 *              events:
 *                type: 'array'
 *                items:
 *                  $ref: '#/components/schemas/Event'
 *    responses:
 *      '200':
 *        description: Events synced successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */
router.post('/sync', eventController.syncEvents);

module.exports = router;
