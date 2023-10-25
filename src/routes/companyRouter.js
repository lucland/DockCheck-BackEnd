const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();

/**
 * @swagger
 * /companies:
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
 *      '400':
 *        description: Bad request
 */
router.post('/create', companyController.createCompany);

/**
 * @swagger
 * /companies/{id}:
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
 *      '404':
 *        description: Company not found
 */
router.get('/:id', companyController.getCompany);

/**
 * @swagger
 * /companies/{id}:
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
 *      '400':
 *        description: Bad request
 *      '404':
 *        description: Company not found
 */
router.put('/:id', companyController.updateCompany);

/**
 * @swagger
 * /companies/{id}:
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
router.delete('/:id', companyController.deleteCompany);

/**
 * @swagger
 * /companies:
 *  get:
 *    summary: Get all companies
 *    tags: [Companies]
 *    responses:
 *      '200':
 *        description: Successful operation
 */
router.get('/', companyController.getAllCompanies);

module.exports = router;
