const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         logo:
 *           type: string
 *         supervisors:
 *           type: array
 *           items:
 *             type: string
 *         vessels:
 *           type: array
 *           items:
 *             type: string
 *         updated_at:
 *           type: string
 *           format: date-time
 *         id:
 *           type: string
 *         expiration_date:
 *           type: string
 *           format: date-time
 *     CompanyResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/Company'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 */

/**
 * @swagger
 * /api/v1/companies/create:
 *  post:
 *    summary: Create a new company
 *    tags: [Companies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Company'
 *    responses:
 *      '201':
 *        description: Company created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CompanyResponse'
 *            example:
 *              message: "Company created successfully"
 *              name: "Company A"
 *              logo: "logo.png"
 *              supervisors: ["supervisor1", "supervisor2"]
 *              vessels: ["vessel1", "vessel2"]
 *              updated_at: "2023-10-25T12:34:56Z"
 *              id: "123"
 *              expiration_date: "2023-12-31T12:34:56Z"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error creating company"
 *              error: "Details about the error"
 */
router.post('/create', authenticateJWT, companyController.createCompany);

/**
 * @swagger
 * /api/v1/companies/{id}:
 *  get:
 *    summary: Get a company by ID
 *    tags: [Companies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Company ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Company'
 *            example:
 *              name: "Company A"
 *              logo: "logoA.png"
 *              supervisors: ["supervisor1", "supervisor2"]
 *              vessels: ["vessel1", "vessel2"]
 *              updated_at: "2023-10-25T12:34:56Z"
 *              id: "123"
 *              expiration_date: "2023-12-31T12:34:56Z"
 *      '404':
 *        description: Company not found
 *        content:
 *          application/json:
 *            example:
 *              message: "Company not found"
 */
router.get('/:id', authenticateJWT, companyController.getCompany);

/**
 * @swagger
 * /api/v1/companies/{id}:
 *  put:
 *    summary: Update a company by ID
 *    tags: [Companies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Company ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Company'
 *    responses:
 *      '200':
 *        description: Company updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CompanyResponse'
 *            example:
 *              message: "Company updated successfully"
 *              name: "Updated Company A"
 *              logo: "updatedLogo.png"
 *              supervisors: ["updatedSupervisor1", "updatedSupervisor2"]
 *              vessels: ["updatedVessel1", "updatedVessel2"]
 *              updated_at: "2023-10-25T14:34:56Z"
 *              id: "123"
 *              expiration_date: "2023-12-31T12:34:56Z"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error updating company"
 *              error: "Details about the error"
 */
router.put('/:id', authenticateJWT, companyController.updateCompany);

/**
 * @swagger
 * /api/v1/companies/{id}:
 *  delete:
 *    summary: Delete a company by ID
 *    tags: [Companies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Company ID
 *    responses:
 *      '204':
 *        description: Company deleted successfully
 *      '404':
 *        description: Company not found
 */
router.delete('/:id', authenticateJWT, companyController.deleteCompany);

/**
 * @swagger
 * /api/v1/companies:
 *  get:
 *    summary: Get all companies
 *    tags: [Companies]
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Company'
 *            example:
 *              - name: "Company A"
 *                logo: "logoA.png"
 *                supervisors: ["supervisor1", "supervisor2"]
 *                vessels: ["vessel1", "vessel2"]
 *                updated_at: "2023-10-25T12:34:56Z"
 *                id: "123"
 *                expiration_date: "2023-12-31T12:34:56Z"
 *              - name: "Company B"
 *                logo: "logoB.png"
 *                supervisors: ["supervisor3", "supervisor4"]
 *                vessels: ["vessel3", "vessel4"]
 *                updated_at: "2023-10-26T12:34:56Z"
 *                id: "124"
 *                expiration_date: "2023-12-31T12:34:56Z"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error updating company"
 *              error: "Details about the error"
 */
router.get('/', authenticateJWT, companyController.getAllCompanies);

module.exports = router;
