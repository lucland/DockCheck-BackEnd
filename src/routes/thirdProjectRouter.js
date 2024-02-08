const express = require('express');
const thirdProjectController = require('../controllers/thirdProjectController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/thirdProjects/{id}:
 *  get:
 *    summary: Get a third project by ID
 *    tags: [ThirdProjects]
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
 *        description: Third project not found
 *      '400':
 *        description: Bad request
 */
router.get('/:id', authenticateJWT, thirdProjectController.getThirdProject);

/**
 * @swagger
 * /api/v1/thirdProjects:
 *  get:
 *    summary: Get all third projects
 *    tags: [ThirdProjects]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/', authenticateJWT, thirdProjectController.getAllThirdProjects);

/**
 * @swagger
 * /api/v1/thirdProjects/{id}:
 *  put:
 *    summary: Update a third project by ID
 *    tags: [ThirdProjects]
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
 *            $ref: '#/components/schemas/ThirdProject'
 *    responses:
 *      '200':
 *        description: Third project updated successfully
 *      '404':
 *        description: Third project not found
 *      '400':
 *        description: Bad request
 */
router.put('/:id', authenticateJWT, thirdProjectController.updateThirdProject);

/**
 * @swagger
 * /api/v1/thirdProjects/{id}/addEmployee:
 *  put:
 *    summary: Add an employee to a third project
 *    tags: [ThirdProjects]
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
 *              employee_id:
 *                type: string
 *    responses:
 *      '200':
 *        description: Employee added to third project successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Third project not found
 */
router.put('/:id/addEmployee', authenticateJWT, thirdProjectController.addEmployeeToThirdProject);

/**
 * @swagger
 * /api/v1/thirdProjects/{id}/updateAllowedAreas:
 *  put:
 *    summary: Update allowed areas of a third project
 *    tags: [ThirdProjects]
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
 *              allowed_areas_id:
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      '200':
 *        description: Allowed areas updated successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Third project not found
 */
router.put('/:id/updateAllowedAreas', authenticateJWT, thirdProjectController.updateAllowedAreasOfThirdProject);

module.exports = router;
