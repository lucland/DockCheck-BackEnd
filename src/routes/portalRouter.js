const express = require('express');
const portalController = require('../controllers/portalController');
const router = express.Router();

/**
 * @swagger
 * /portals:
 *  post:
 *    summary: Create a new portal
 *    tags: [Portals]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Portal'
 *    responses:
 *      '201':
 *        description: Portal created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/create', portalController.createPortal);

/**
 * @swagger
 * /portals/{id}:
 *  get:
 *    summary: Get a portal by ID
 *    tags: [Portals]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Portal ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '404':
 *        description: Portal not found
 */
router.get('/:id', portalController.getPortal);

/**
 * @swagger
 * /portals/{id}:
 *  put:
 *    summary: Update a portal by ID
 *    tags: [Portals]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Portal ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Portal'
 *    responses:
 *      '200':
 *        description: Portal updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Portal not found
 */
router.put('/:id', portalController.updatePortal);

/**
 * @swagger
 * /portals/{id}:
 *  delete:
 *    summary: Delete a portal by ID
 *    tags: [Portals]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Portal ID
 *    responses:
 *      '204':
 *        description: Portal deleted successfully
 *      '404':
 *        description: Portal not found
 */
router.delete('/:id', portalController.deletePortal);

/**
 * @swagger
 * /portals:
 *  get:
 *    summary: Get all portals
 *    tags: [Portals]
 *    responses:
 *      '200':
 *        description: Successful operation
 */
router.get('/', portalController.getAllPortals);

module.exports = router;
