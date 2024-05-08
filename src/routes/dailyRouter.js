const express = require('express');
const dailyController = require('../controllers/dailyController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/daily:
 *  get:
 *    summary: Get all daily records
 *    tags: [Daily]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Daily'
 *            example:
 *              - id: "daily123"
 *                employee_id: "employee123"
 *                first: "2022-01-01T09:00:00Z"
 *                project_id: "project123"
 *                final: "2022-01-01T18:00:00Z"
 *                company: "Company A"
 *                status: "active"
 *                beacon_id: "beacon123"
 *              - id: "daily124"
 *                employee_id: "employee124"
 *                first: "2022-01-02T09:00:00Z"
 *                project_id: "project124"
 *                final: "2022-01-02T18:00:00Z"
 *                company: "Company B"
 *                status: "inactive"
 *                beacon_id: "beacon124"
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            example:
 *              error: "Failed to retrieve daily records"
 */
router.get('/', authenticateJWT, dailyController.getAllDaily);

/**
 * @swagger
 * /api/v1/daily/{id}:
 *  get:
 *    summary: Get a specific daily record by ID
 *    tags: [Daily]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Daily record ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Daily'
 *            example:
 *              id: "daily123"
 *              employee_id: "employee123"
 *              first: "2022-01-01T09:00:00Z"
 *              project_id: "project123"
 *              final: "2022-01-01T18:00:00Z"
 *              company: "Company A"
 *              status: "active"
 *              beacon_id: "beacon123"
 *      '404':
 *        description: Daily record not found
 *        content:
 *          application/json:
 *            example:
 *              error: "Daily record not found"
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            example:
 *              error: "Failed to retrieve daily record"
 */
router.get('/:id', authenticateJWT, dailyController.getDailyById);

/**
 * @swagger
 * /api/v1/daily/create:
 *  post:
 *    summary: Create a new daily record
 *    tags: [Daily]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Daily'
 *    responses:
 *      '201':
 *        description: Daily record created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Daily'
 *            example:
 *              id: "daily123"
 *              employee_id: "employee123"
 *              first: "2022-01-01T09:00:00Z"
 *              project_id: "project123"
 *              final: "2022-01-01T18:00:00Z"
 *              company: "Company A"
 *              status: "active"
 *              beacon_id: "beacon123"
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            example:
 *              error: "Failed to create daily record"
 */
router.post('/create', authenticateJWT, dailyController.createDaily);

/**
 * @swagger
 * /api/v1/daily/{id}/first:
 *  put:
 *    summary: Update param first of an existing daily record
 *    tags: [Daily]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Daily record ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              first:
 *                type: string
 *                format: date-time
 *                example: "2022-01-01T09:00:00Z"
 *    responses:
 *      '200':
 *        description: Daily record updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Daily'
 *            example:
 *              id: "daily123"
 *              employee_id: "employee123"
 *              first: "2022-01-01T09:00:00Z"
 *              project_id: "project123"
 *              final: "2022-01-01T18:00:00Z"
 *              company: "Company A"
 *              status: "active"
 *              beacon_id: "beacon123"
 *      '404':
 *        description: Daily record not found
 *        content:
 *          application/json:
 *            example:
 *              error: "Daily record not found"
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            example:
 *              error: "Failed to update daily record"
 */
router.put('/:id/first', authenticateJWT, dailyController.updateFirst);

/**
 * @swagger
 * /api/v1/daily/{id}/final:
 *  put:
 *    summary: Update param final of an existing daily record
 *    tags: [Daily]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Daily record ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              final:
 *                type: string
 *                format: date-time
 *                example: "2022-01-01T18:00:00Z"
 *    responses:
 *      '200':
 *        description: Daily record updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Daily'
 *            example:
 *              id: "daily123"
 *              employee_id: "employee123"
 *              first: "2022-01-01T09:00:00Z"
 *              project_id: "project123"
 *              final: "2022-01-01T18:00:00Z"
 *              company: "Company A"
 *              status: "active"
 *              beacon_id: "beacon123"
 *      '404':
 *        description: Daily record not found
 *        content:
 *          application/json:
 *            example:
 *              error: "Daily record not found"
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            example:
 *              error: "Failed to update daily record"
 */
router.put('/:id/final', authenticateJWT, dailyController.updateFinal);

/**
 * @swagger
 * /api/v1/daily/{id}:
 *  delete:
 *    summary: Delete a daily record
 *    tags: [Daily]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Daily record ID
 *    responses:
 *      '200':
 *        description: Daily record deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *            example:
 *              message: "Daily record deleted successfully"
 *      '404':
 *        description: Daily record not found
 *        content:
 *          application/json:
 *            example:
 *              error: "Daily record not found"
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            example:
 *              error: "Failed to delete daily record"
 */
router.delete('/:id', authenticateJWT, dailyController.deleteDaily);

module.exports = router;