const express = require('express');
const vesselController = require('../controllers/vesselController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

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
 *          example:
 *            name: "Vessel 1"
 *            company_id: "company123"
 *            admins: ["admin1", "admin2"]
 *            onboarded_count: 10
 *            portals: ["portal1", "portal2"]
 *    responses:
 *      '201':
 *        description: Vessel created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/create', authenticateJWT, vesselController.createVessel);

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
 *        content:
 *          application/json:
 *            example:
 *              id: "vessel123"
 *              name: "Vessel 1"
 *              company_id: "company123"
 *              updated_at: "2023-01-01T00:00:00.000Z"
 *              admins: ["admin1", "admin2"]
 *              onboarded_count: 10
 *              portals: ["portal1", "portal2"]
 *      '404':
 *        description: Vessel not found
 */
router.get('/:id', authenticateJWT, vesselController.getVessel);

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
 *          example:
 *            name: "Updated Vessel 1"
 *            onboarded_count: 11
 *    responses:
 *      '200':
 *        description: Vessel updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Vessel not found
 */
router.put('/:id', authenticateJWT, vesselController.updateVessel);

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
router.delete('/:id', authenticateJWT, vesselController.deleteVessel);

/**
 * @swagger
 * /vessels/company/{company_id}:
 *  get:
 *    summary: Get all vessels for a specific company
 *    tags: [Vessels]
 *    parameters:
 *      - in: path
 *        name: company_id
 *        schema:
 *          type: string
 *        required: true
 *        description: Company ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - id: "vessel123"
 *                name: "Vessel 1"
 *                company_id: "company123"
 *                updated_at: "2023-01-01T00:00:00.000Z"
 *                admins: ["admin1", "admin2"]
 *                onboarded_count: 10
 *                portals: ["portal1", "portal2"]
 *              - id: "vessel124"
 *                name: "Vessel 2"
 *                company_id: "company123"
 *                updated_at: "2023-01-02T00:00:00.000Z"
 *                admins: ["admin3"]
 *                onboarded_count: 5
 *                portals: ["portal3"]
 *      '404':
 *        description: No vessels found for this company
 */
router.get('/company/:company_id', authenticateJWT, vesselController.getVesselsByCompany);

/**
 * @swagger
 * /vessels:
 *  get:
 *    summary: Get all vessels
 *    tags: [Vessels]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - id: "vessel123"
 *                name: "Vessel 1"
 *                company_id: "company123"
 *                updated_at: "2023-01-01T00:00:00.000Z"
 *                admins: ["admin1", "admin2"]
 *                onboarded_count: 10
 *                portals: ["portal1", "portal2"]
 *              - id: "vessel124"
 *                name: "Vessel 2"
 *                company_id: "company124"
 *                updated_at: "2023-01-02T00:00:00.000Z"
 *                admins: ["admin3"]
 *                onboarded_count: 5
 *                portals: ["portal3"]
 */
router.get('/', authenticateJWT, vesselController.getAllVessels);

module.exports = router;
