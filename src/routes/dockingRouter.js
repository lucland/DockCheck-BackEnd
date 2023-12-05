const express = require('express');
const dockingController = require('../controllers/dockingController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/dockings/create:
 *  post:
 *    summary: Create a new docking
 *    tags: [Dockings]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Docking'
 *    responses:
 *      '201':
 *        description: Docking created successfully
 *        content:
 *          application/json:
 *            example:
 *              message: "Docking created successfully"
 *              docking: 
 *                id: "123"
 *                onboarded_count: 10
 *                date_start: "2023-10-25T00:00:00.000Z"
 *                date_end: "2023-10-26T00:00:00.000Z"
 *                admins: ["admin1", "admin2"]
 *                vessel_id: "vessel123"
 *                updated_at: "2023-10-25T00:00:00.000Z"
 *                draft_meters: 5.5
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error creating docking"
 *              error: "Details about the error"
 */
router.post('/create', authenticateJWT, dockingController.createDocking);

/**
 * @swagger
 * /api/v1/dockings/{id}:
 *  get:
 *    summary: Get a docking by ID
 *    tags: [Dockings]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Docking ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              id: "123"
 *              onboarded_count: 10
 *              date_start: "2023-10-25T00:00:00.000Z"
 *              date_end: "2023-10-26T00:00:00.000Z"
 *              admins: ["admin1", "admin2"]
 *              vessel_id: "vessel123"
 *              updated_at: "2023-10-25T00:00:00.000Z"
 *              draft_meters: 5.5
 *      '404':
 *        description: Docking not found
 *        content:
 *          application/json:
 *            example:
 *              message: "Docking not found"
 */
router.get('/:id', authenticateJWT, dockingController.getDocking);

/**
 * @swagger
 * /api/v1/dockings/{id}:
 *  put:
 *    summary: Update a docking by ID
 *    tags: [Dockings]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Docking ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Docking'
 *    responses:
 *      '200':
 *        description: Docking updated successfully
 *        content:
 *          application/json:
 *            example:
 *              id: "123"
 *              onboarded_count: 11
 *              date_start: "2023-10-25T00:00:00.000Z"
 *              date_end: "2023-10-26T00:00:00.000Z"
 *              admins: ["admin1", "admin3"]
 *              vessel_id: "vessel123"
 *              updated_at: "2023-10-25T00:00:00.000Z"
 *              draft_meters: 5.6
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error updating docking"
 *              error: "Details about the error"
 *      '404':
 *        description: Docking not found
 *        content:
 *          application/json:
 *            example:
 *              message: "Docking not found"
 */
router.put('/:id', authenticateJWT, dockingController.updateDocking);

/**
 * @swagger
 * /api/v1/dockings/{id}:
 *  delete:
 *    summary: Delete a docking by ID
 *    tags: [Dockings]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Docking ID
 *    responses:
 *      '204':
 *        description: Docking deleted successfully
 *      '404':
 *        description: Docking not found
 */
router.delete('/:id', authenticateJWT, dockingController.deleteDocking);

/**
 * @swagger
 * /api/v1/dockings:
 *  get:
 *    summary: Get all dockings
 *    tags: [Dockings]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - id: "123"
 *                onboarded_count: 10
 *                date_start: "2023-10-25T00:00:00.000Z"
 *                date_end: "2023-10-26T00:00:00.000Z"
 *                admins: ["admin1", "admin2"]
 *                vessel_id: "vessel123"
 *                updated_at: "2023-10-25T00:00:00.000Z"
 *                draft_meters: 5.5
 *              - id: "124"
 *                onboarded_count: 12
 *                date_start: "2023-10-27T00:00:00.000Z"
 *                date_end: "2023-10-28T00:00:00.000Z"
 *                admins: ["admin3", "admin4"]
 *                vessel_id: "vessel124"
 *                updated_at: "2023-10-27T00:00:00.000Z"
 *                draft_meters: 6.0
 */
router.get('/', authenticateJWT, dockingController.getAllDockings);

/**
 * @swagger
 * /api/v1/dockings/ids:
 *  get:
 *    summary: Get all docking ids
 *    tags: [Dockings]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - id: "123"
 *              - id: "124"
 */
router.get('/ids', authenticateJWT, dockingController.getAllDockingsIds);

module.exports = router;
