const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');


/**
 * @swagger
 * /sync:
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
 *                enum: [Event, Company, Vessel]  // Add other model names here
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

module.exports = router;
