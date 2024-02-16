const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/projects:
 *  post:
 *    summary: Create a new project
 *    tags: [Projects]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Project'
 *    responses:
 *      '201':
 *        description: Project created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/', authenticateJWT, projectController.createProject);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *  get:
 *    summary: Get a project by ID
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '404':
 *        description: Project not found
 *      '400':
 *        description: Bad request
 */
router.get('/:id', authenticateJWT, projectController.getProject);

/**
 * @swagger
 * /api/v1/projects:
 *  get:
 *    summary: Get all projects
 *    tags: [Projects]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/', authenticateJWT, projectController.getAllProjects);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *  put:
 *    summary: Update a project by ID
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Project'
 *    responses:
 *      '200':
 *        description: Project updated successfully
 *      '404':
 *        description: Project not found
 *      '400':
 *        description: Bad request
 */
router.put('/:id', authenticateJWT, projectController.updateProject);

/**
 * @swagger
 * /api/v1/projects/{id}:
 *  delete:
 *    summary: Delete a project by ID
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Project deleted successfully
 *      '404':
 *        description: Project not found
 *      '400':
 *        description: Bad request
 */
router.delete('/:id', authenticateJWT, projectController.deleteProject);

/**
 * @swagger
 * /api/v1/projects/{id}/addThirdCompany:
 *  put:
 *    summary: Add a third company to a project
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              third_company_id:
 *                type: string
 *    responses:
 *      '200':
 *        description: Third company added successfully
 *      '400':
 *        description: Bad request
 */
router.put('/:id/addThirdCompany', authenticateJWT, projectController.addThirdCompany);

/**
 * @swagger
 * /api/v1/projects/{projectId}/approved-employees:
 *  post:
 *    summary: Get a list of approved employees' itags for a given project
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: projectId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the project
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - projectId
 *            properties:
 *              projectId:
 *                type: string
 *                description: The project ID
 *    responses:
 *      '200':
 *        description: List of approved employees' itags
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                approvedItags:
 *                  type: array
 *                  items:
 *                    type: string
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Project not found
 *      '500':
 *        description: Internal Server Error
 */
router.post('/:projectId/approved-employees', authenticateJWT, projectController.approvedEmployeesOfTheDay);

//add a new admin to the project
/**
 * @swagger
 * /api/v1/projects/{id}/addAdmin:
 *  put:
 *    summary: Add an admin to a project
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              admin_id:
 *                type: string
 *    responses:
 *      '200':
 *        description: Admin added successfully
 *      '400':
 *        description: Bad request
 */
router.put('/:id/addAdmin', authenticateJWT, projectController.addAdminToProject);

module.exports = router;
