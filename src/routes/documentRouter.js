const express = require('express');
const documentController = require('../controllers/documentController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/documents:
 *  post:
 *    summary: Create a new document
 *    tags: [Documents]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Document'
 *    responses:
 *      '201':
 *        description: Document created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/', authenticateJWT, documentController.createDocument);

//getDocumentsByEmployeeId get a list of document_id by giving employee_id
/**
 * @swagger
 * /api/v1/documents/employee/{employee_id}:
 *  get:
 *    summary: Get documents by employee ID
 *    tags: [Documents]
 *    parameters:
 *      - in: path
 *        name: employee_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/employee/:employee_id', authenticateJWT, documentController.getDocumentsByEmployeeId);

/**
 * @swagger
 * /api/v1/documents/{id}:
 *  get:
 *    summary: Get a document by ID
 *    tags: [Documents]
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
 *        description: Document not found
 *      '400':
 *        description: Bad request
 */
router.get('/:id', authenticateJWT, documentController.getDocument);

/**
 * @swagger
 * /api/v1/documents:
 *  get:
 *    summary: Get all documents
 *    tags: [Documents]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/', authenticateJWT, documentController.getAllDocuments);

/**
 * @swagger
 * /api/v1/documents/{id}:
 *  put:
 *    summary: Update a document by ID
 *    tags: [Documents]
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
 *            $ref: '#/components/schemas/Document'
 *    responses:
 *      '200':
 *        description: Document updated successfully
 *      '404':
 *        description: Document not found
 *      '400':
 *        description: Bad request
 */
router.put('/:id', authenticateJWT, documentController.updateDocument);

/**
 * @swagger
 * /api/v1/documents/{id}:
 *  delete:
 *    summary: Delete a document by ID
 *    tags: [Documents]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '204':
 *        description: Document deleted successfully
 *      '404':
 *        description: Document not found
 *      '400':
 *        description: Bad request
 */
router.delete('/:id', authenticateJWT, documentController.deleteDocument);

/**
 * @swagger
 * /api/v1/documents/employee/{employee_id}:
 *  get:
 *    summary: Get documents by employee ID
 *    tags: [Documents]
 *    parameters:
 *      - in: path
 *        name: employee_id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/employee/:employee_id', authenticateJWT, documentController.getDocumentsByEmployeeId);

module.exports = router;
