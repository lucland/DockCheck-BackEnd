const express = require('express');
const vesselController = require('../controllers/vesselController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
  * @swagger
 * /api/v1/vessels/create:
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
 * /api/v1/vessels/{id}:
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
 * /api/v1/vessels/{id}:
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
 * /api/v1/vessels/{id}:
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
 * /api/v1/vessels/company/{company_id}:
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
 * /api/v1/vessels:
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

//router to get all vessel by name, with getVesselByName controller function and swagger documentation
/**
 * @swagger
 * /api/v1/vessels/name/{vessel_name}:
 *  get:
 *    summary: Get a vessel by name
 *    tags: [Vessels]
 *    parameters:
 *      - in: path
 *        name: vessel_name
 *        schema:
 *          type: string
 *        required: true
 *        description: Vessel name
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
 *      '404':
 *        description: Vessel not found
 */
router.get('/name/:vessel_name', authenticateJWT, vesselController.getVesselByName);

/**
 * @swagger
 * /api/v1/vessels/ids:
 *  get:
 *    summary: Get all vessel ids
 *    tags: [Vessels]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - vessel123
 *              - vessel124
 */
router.get('/ids', authenticateJWT, vesselController.getAllVesselIds);

//get all onboarded users of a vessel
/**
 * @swagger
 * /api/v1/vessels/onboarded/{id}:
 *  get:
 *    summary: Get all onboarded users of a vessel
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
 *              - user123
 *              - user124
 */
router.get('/onboarded/:id', authenticateJWT, vesselController.getOnboardedUsers);

//get all events of a vessel with pagination and swagger documentation
/**
 * @swagger
 * /api/v1/vessels/events/{id}:
 *  get:
 *    summary: Get all events of a vessel with pagination
 *    tags: [Vessels]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Vessel ID
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: false
 *        description: Limit number of events. Default is 10.
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *        required: false
 *        description: Starting index for events. Default is 0.
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - id: "event123"
 *                portal_id: "portal1"
 *                user_id: "user1"
 *                timestamp: "2023-10-25T00:00:00.000Z"
 *                direction: 1
 *                picture: "picture_url"
 *                vessel_id: "vessel123"
 *                action: 1
 *              - id: "event124"
 *                portal_id: "portal2"
 *                user_id: "user2"
 *                timestamp: "2023-10-26T00:00:00.000Z"
 *                direction: 2
 *                picture: "another_picture_url"
 *                vessel_id: "vessel123"
 *                action: 2
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error fetching events"
 *              error: "Details about the error"
 */
router.get('/events/:vessel_id', authenticateJWT, vesselController.getEventsByVessel);


module.exports = router;
