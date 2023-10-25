const express = require('express');
const supervisorsController = require('../controllers/supervisorController');
const router = express.Router();

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
 *      '400':
 *        description: Bad request
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
 *      '404':
 *        description: Supervisor not found
 */
router.get('/:id', supervisorsController.getSupervisor);

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
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Supervisor not found
 */
router.put('/:id', supervisorsController.updateSupervisor);

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
router.delete('/:id', supervisorsController.deleteSupervisor);

/**
 * @swagger
 * /supervisors:
 *  get:
 *    summary: Get all supervisors
 *    tags: [Supervisors]
 *    responses:
 *      '200':
 *        description: Successful operation
 */
router.get('/', supervisorsController.getAllSupervisors);

module.exports = router;
