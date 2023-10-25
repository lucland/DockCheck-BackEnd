const express = require('express');
const vesselController = require('../controllers/vesselController');
const router = express.Router();

/**
 * @swagger
 * /vessels:
 *  post:
 *    summary: Create a new vessel
 *    tags: [Vessels]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vessel'
 *    responses:
 *      '201':
 *        description: Vessel created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/create', vesselController.createVessel);

/**
 * @swagger
 * /vessels/{id}:
 *  get:
 *    summary: Get a vessel by ID
 *    tags: [Vessels]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Vessel ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '404':
 *        description: Vessel not found
 */
router.get('/:id', vesselController.getVessel);

/**
 * @swagger
 * /vessels/{id}:
 *  put:
 *    summary: Update a vessel by ID
 *    tags: [Vessels]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Vessel ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vessel'
 *    responses:
 *      '200':
 *        description: Vessel updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Vessel not found
 */
router.put('/:id', vesselController.updateVessel);

/**
 * @swagger
 * /vessels/{id}:
 *  delete:
 *    summary: Delete a vessel by ID
 *    tags: [Vessels]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Vessel ID
 *    responses:
 *      '204':
 *        description: Vessel deleted successfully
 *      '404':
 *        description: Vessel not found
 */
router.delete('/:id', vesselController.deleteVessel);

/**
 * @swagger
 * /vessels:
 *  get:
 *    summary: Get all vessels
 *    tags: [Vessels]
 *    responses:
 *      '200':
 *        description: Successful operation
 */
router.get('/', vesselController.getAllVessels);

module.exports = router;
