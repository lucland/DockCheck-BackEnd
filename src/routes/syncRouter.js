const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');

/**
 * @swagger
 * /api/v1/sync:
 *  post:
 *    summary: Sync data
 *    tags: [Sync]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: 'object'
 *            properties:
 *              model:
 *                type: 'string'
 *                enum: 
 *                  - Event
 *                  - Company
 *                  - Vessel
 *                  - Portal
 *                  - User
 *                  - Supervisor
 *                description: 'The model to which these records belong'
 *              records:
 *                type: 'array'
 *                items:
 *                  type: 'object'
 *                  additionalProperties: true
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.post('/sync', syncController.syncData);


/**
 * @swagger
 * /api/v1/sync/users/{vessel_id}:
 *  get:
 *    summary: Get banned users by vessel ID
 *    tags: [Sync]
 *    parameters:
 *      - in: path
 *        name: vessel_id
 *        schema:
 *          type: string
 *        required: true
 *        description: Vessel ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example: ["rfid1", "rfid2", "rfid3"]
 *      '400':
 *        description: Bad request
 */
router.get('/users/:vessel_id', syncController.getFilteredUsersByVessel);

module.exports = router;
