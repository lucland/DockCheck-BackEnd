const express = require('express');
const portalController = require('../controllers/portalController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/portals/create:
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
 *        content:
 *          application/json:
 *            example:
 *              id: "portal123"
 *              name: "Portal 1"
 *              vessel_id: "vessel123"
 *              camera_status: 1
 *              camera_ip: "192.168.1.1"
 *              rfid_status: 1
 *              rfid_ip: "192.168.1.2"
 *              created_at: "2023-10-25T00:00:00.000Z"
 *              updated_at: "2023-10-25T00:00:00.000Z"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error creating portal"
 *              error: "Details about the error"
 */
router.post('/create', authenticateJWT, portalController.createPortal);

/**
 * @swagger
 * /api/v1/portals/{id}:
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
 *        content:
 *          application/json:
 *            example:
 *              id: "portal123"
 *              name: "Portal 1"
 *              vessel_id: "vessel123"
 *              camera_status: 1
 *              camera_ip: "192.168.1.1"
 *              rfid_status: 1
 *              rfid_ip: "192.168.1.2"
 *              created_at: "2023-10-25T00:00:00.000Z"
 *              updated_at: "2023-10-25T00:00:00.000Z"
 *      '404':
 *        description: Portal not found
 */
router.get('/:id', authenticateJWT, portalController.getPortal);

/**
 * @swagger
 * /api/v1/portals/{id}:
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
 *        content:
 *          application/json:
 *            example:
 *              id: "portal123"
 *              name: "Updated Portal 1"
 *              vessel_id: "vessel123"
 *              camera_status: 1
 *              camera_ip: "192.168.1.1"
 *              rfid_status: 1
 *              rfid_ip: "192.168.1.2"
 *              updated_at: "2023-10-25T01:00:00.000Z"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error updating portal"
 *              error: "Details about the error"
 *      '404':
 *        description: Portal not found
 */
router.put('/:id', authenticateJWT, portalController.updatePortal);

/**
 * @swagger
 * /api/v1/portals/{id}:
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
router.delete('/:id', authenticateJWT, portalController.deletePortal);

/**
 * @swagger
 * /api/v1/portals/vessel/{vessel_id}:
 *  get:
 *    summary: Get all portals for a specific vessel
 *    tags: [Portals]
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
 *            example:
 *              - id: "portal123"
 *                name: "Portal 1"
 *                vessel_id: "vessel123"
 *                camera_status: 1
 *                camera_ip: "192.168.1.1"
 *                rfid_status: 1
 *                rfid_ip: "192.168.1.2"
 *                created_at: "2023-10-25T00:00:00.000Z"
 *                updated_at: "2023-10-25T00:00:00.000Z"
 *      '404':
 *        description: No portals found for this vessel
 */
router.get('/vessel/:vessel_id', authenticateJWT, portalController.getPortalsByVessel);

/**
 * @swagger
 * /api/v1/portals:
 *  get:
 *    summary: Get all portals
 *    tags: [Portals]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - id: "portal123"
 *                name: "Portal 1"
 *                vessel_id: "vessel123"
 *                camera_status: 1
 *                camera_ip: "192.168.1.1"
 *                rfid_status: 1
 *                rfid_ip: "192.168.1.2"
 *                created_at: "2023-10-25T00:00:00.000Z"
 *                updated_at: "2023-10-25T00:00:00.000Z"
 *              - id: "portal124"
 *                name: "Portal 2"
 *                vessel_id: "vessel124"
 *                camera_status: 0
 *                camera_ip: "192.168.1.3"
 *                rfid_status: 0
 *                rfid_ip: "192.168.1.4"
 *                created_at: "2023-10-25T00:00:00.000Z"
 *                updated_at: "2023-10-25T00:00:00.000Z"
 */
router.get('/', authenticateJWT, portalController.getAllPortals);

module.exports = router;
