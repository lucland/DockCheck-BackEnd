const express = require('express');
const supervisorsController = require('../controllers/supervisorController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /supervisors:
 *  post:
 *    summary: Create a new supervisor
 *    tags: [Supervisors]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Supervisor'
 *    responses:
 *      '201':
 *        description: Supervisor created successfully
 *        content:
 *          application/json:
 *            example:
 *              id: "supervisor123"
 *              name: "John Doe"
 *              username: "johndoe"
 *              company_id: "company123"
 *              updated_at: "2023-10-25T01:00:00.000Z"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error creating supervisor"
 *              error: "Details about the error"
 */
router.post('/create', supervisorsController.createSupervisor);

/**
 * @swagger
 * /supervisors/{id}:
 *  get:
 *    summary: Get a supervisor by ID
 *    tags: [Supervisors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Supervisor ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              id: "supervisor123"
 *              name: "John Doe"
 *              username: "johndoe"
 *              company_id: "company123"
 *              updated_at: "2023-10-25T01:00:00.000Z"
 *      '404':
 *        description: Supervisor not found
 */
router.get('/:id', authenticateJWT, supervisorsController.getSupervisor);

/**
 * @swagger
 * /supervisors/{id}:
 *  put:
 *    summary: Update a supervisor by ID
 *    tags: [Supervisors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Supervisor ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Supervisor'
 *    responses:
 *      '200':
 *        description: Supervisor updated successfully
 *        content:
 *          application/json:
 *            example:
 *              id: "supervisor123"
 *              name: "John Doe Updated"
 *              username: "johndoeupdated"
 *              company_id: "company123"
 *              updated_at: "2023-10-25T01:00:00.000Z"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error updating supervisor"
 *              error: "Details about the error"
 *      '404':
 *        description: Supervisor not found
 */
router.put('/:id', authenticateJWT, supervisorsController.updateSupervisor);

/**
 * @swagger
 * /supervisors/{id}:
 *  delete:
 *    summary: Delete a supervisor by ID
 *    tags: [Supervisors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Supervisor ID
 *    responses:
 *      '204':
 *        description: Supervisor deleted successfully
 *      '404':
 *        description: Supervisor not found
 */
router.delete('/:id', authenticateJWT, supervisorsController.deleteSupervisor);

/**
 * @swagger
 * /supervisors:
 *  get:
 *    summary: Get all supervisors
 *    tags: [Supervisors]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - id: "supervisor123"
 *                name: "John Doe"
 *                username: "johndoe"
 *                company_id: "company123"
 *                updated_at: "2023-10-25T01:00:00.000Z"
 *              - id: "supervisor124"
 *                name: "Jane Doe"
 *                username: "janedoe"
 *                company_id: "company124"
 *                updated_at: "2023-10-25T01:00:00.000Z"
 */
router.get('/', authenticateJWT, supervisorsController.getAllSupervisors);

module.exports = router;
