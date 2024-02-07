const express = require('express');
const authorizationController = require('../controllers/authorizationController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/authorizations/:
 *  post:
 *    summary: Create a new authorization
 *    tags: [Authorizations]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Authorization'
 *    responses:
 *      '201':
 *        description: Authorization created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Authorization'
 *      '400':
 *        description: Bad request
 */
router.post('/', authenticateJWT, authorizationController.createAuthorization);

/**
 * @swagger
 * /api/v1/authorizations/{id}:
 *  get:
 *    summary: Get an authorization by ID
 *    tags: [Authorizations]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Authorization'
 *      '404':
 *        description: Authorization not found
 *      '400':
 *        description: Bad request
 */
router.get('/:id', authenticateJWT, authorizationController.getAuthorizationById);

/**
 * @swagger
 * /api/v1/authorizations/{id}:
 *  put:
 *    summary: Update an authorization by ID
 *    tags: [Authorizations]
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
 *            $ref: '#/components/schemas/Authorization'
 *    responses:
 *      '200':
 *        description: Authorization updated successfully
 *      '404':
 *        description: Authorization not found
 *      '400':
 *        description: Bad request
 */
router.put('/:id', authenticateJWT, authorizationController.updateAuthorization);

/**
 * @swagger
 * /api/v1/authorizations/{id}:
 *  delete:
 *    summary: Delete an authorization by ID
 *    tags: [Authorizations]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '204':
 *        description: Authorization deleted successfully
 *      '404':
 *        description: Authorization not found
 *      '400':
 *        description: Bad request
 */
router.delete('/:id', authenticateJWT, authorizationController.deleteAuthorization);

/**
 * @swagger
 * /api/v1/authorizations:
 *  get:
 *    summary: Get all authorizations
 *    tags: [Authorizations]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Authorization'
 *      '400':
 *        description: Bad request
 */
router.get('/', authenticateJWT, authorizationController.getAllAuthorizations);

/**
 * @swagger
 * /api/v1/authorizations/ids:
 *  get:
 *    summary: Get all authorization IDs
 *    tags: [Authorizations]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *      '400':
 *        description: Bad request
 */
router.get('/ids', authenticateJWT, authorizationController.getAllAuthorizationIds);

/**
 * @swagger
 * /api/v1/authorizations/add-to-employee/{id}/{auth_id}:
 *  put:
 *    summary: Add an authorization to an employee
 *    tags: [Authorizations]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: auth_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Authorization added to employee successfully
 *      '404':
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.put('/add-to-employee/:id/:auth_id', authenticateJWT, authorizationController.addAuthorizationToEmployee);

/**
 * @swagger
 * /api/v1/authorizations/remove-from-employee/{id}/{auth_id}:
 *  put:
 *    summary: Remove an authorization from an employee
 *    tags: [Authorizations]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: auth_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Authorization removed from employee successfully
 *      '404':
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.put('/remove-from-employee/:id/:auth_id', authenticateJWT, authorizationController.removeAuthorizationFromEmployee);

module.exports = router;
