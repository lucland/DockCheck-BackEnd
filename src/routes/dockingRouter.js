const express = require('express');
const dockingController = require('../controllers/dockingController');
const router = express.Router();

/**
 * @swagger
 * /dockings:
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
 *      '400':
 *        description: Bad request
 */
router.post('/create', dockingController.createDocking);

/**
 * @swagger
 * /dockings/{id}:
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
 *      '404':
 *        description: Docking not found
 */
router.get('/:id', dockingController.getDocking);

/**
 * @swagger
 * /dockings/{id}:
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
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Docking not found
 */
router.put('/:id', dockingController.updateDocking);

/**
 * @swagger
 * /dockings/{id}:
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
router.delete('/:id', dockingController.deleteDocking);

/**
 * @swagger
 * /dockings:
 *  get:
 *    summary: Get all dockings
 *    tags: [Dockings]
 *    responses:
 *      '200':
 *        description: Successful operation
 */
router.get('/', dockingController.getAllDockings);

module.exports = router;
