const express = require('express');
const thirdCompanyController = require('../controllers/thirdCompanyController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/thirdCompanies:
 *  post:
 *    summary: Create a new third company
 *    tags: [ThirdCompanies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ThirdCompany'
 *    responses:
 *      '201':
 *        description: Third company created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/', authenticateJWT, thirdCompanyController.createThirdCompany);

/**
 * @swagger
 * /api/v1/thirdCompanies/{id}:
 *  get:
 *    summary: Get a third company by ID
 *    tags: [ThirdCompanies]
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
 *        description: Third company not found
 *      '400':
 *        description: Bad request
 */
router.get('/:id', authenticateJWT, thirdCompanyController.getThirdCompany);

/**
 * @swagger
 * /api/v1/thirdCompanies:
 *  get:
 *    summary: Get all third companies
 *    tags: [ThirdCompanies]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/', authenticateJWT, thirdCompanyController.getAllThirdCompanies);

/**
 * @swagger
 * /api/v1/thirdCompanies/{id}:
 *  put:
 *    summary: Update a third company by ID
 *    tags: [ThirdCompanies]
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
 *            $ref: '#/components/schemas/ThirdCompany'
 *    responses:
 *      '200':
 *        description: Third company updated successfully
 *      '404':
 *        description: Third company not found
 *      '400':
 *        description: Bad request
 */
router.put('/:id', authenticateJWT, thirdCompanyController.updateThirdCompany);

/**
 * @swagger
 * /api/v1/thirdCompanies/{id}/addAdmin:
 *  put:
 *    summary: Add a new admin to a third company
 *    tags: [ThirdCompanies]
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
 *      '404':
 *        description: Third company not found
 */
router.put('/:id/addAdmin', authenticateJWT, thirdCompanyController.addAdmin);

/**
 * @swagger
 * /api/v1/thirdCompanies/{id}/removeAdmin:
 *  put:
 *    summary: Remove an admin from a third company
 *    tags: [ThirdCompanies]
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
 *        description: Admin removed successfully
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Third company not found
 */
router.put('/:id/removeAdmin', authenticateJWT, thirdCompanyController.removeAdmin);

module.exports = router;
