const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: Create a new user along with their authorizations
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '201':
 *        description: User created successfully
 *        content:
 *          application/json:
 *            example:
 *              id: "user123"
 *              name: "John Doe"
 *              company: "Company Inc."
 *              role: "Engineer"
 *              project: "Project A"
 *              number: 12345
 *              identidade: "ID12345"
 *              cpf: "123.456.789-00"
 *              aso: "2023-01-01"
 *              aso_document: "aso_doc.pdf"
 *              has_aso: false
 *              nr34: "2023-01-01"
 *              nr34_document: "nr34_doc.pdf"
 *              has_nr34: false
 *              nr35: "2023-01-01"
 *              nr35_document: "nr35_doc.pdf"
 *              has_nr35: false
 *              nr33: "2023-01-01"
 *              nr33_document: "nr33_doc.pdf"
 *              has_nr33: false
 *              nr10: "2023-01-01"
 *              nr10_document: "nr10_doc.pdf"
 *              has_nr10: false
 *              email: "johndoeexample.com"
 *              area: "Engineering"
 *              is_admin: false
 *              is_visitor: false
 *              is_blocked: false
 *              block_reason: null
 *              rfid: "RFID12345"
 *              picture: "picture.jpg"
 *              created_at: "2023-01-01T00:00:00.000Z"
 *              updated_at: "2023-01-01T00:00:00.000Z"
 *              events: ["event1", "event2"]
 *              type_job: "Full-time"
 *              start_job: "2023-01-01"
 *              end_job: "2023-12-31"
 *              username: "johndoe"
 *              salt: "random_salt"
 *              hash: "hashed_password"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error creating user"
 *              error: "Details about the error"
 */
router.post('/create', userController.createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    summary: Get a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              id: "user123"
 *              name: "John Doe"
 *              company: "Company Inc."
 *              role: "Engineer"
 *              project: "Project A"
 *              number: 12345
 *              identidade: "ID12345"
 *              cpf: "123.456.789-00"
 *              aso: "2023-01-01"
 *              aso_document: "aso_doc.pdf"
 *              has_aso: false
 *              nr34: "2023-01-01"
 *              nr34_document: "nr34_doc.pdf"
 *              has_nr34: false
 *              nr35: "2023-01-01"
 *              nr35_document: "nr35_doc.pdf"
 *              has_nr35: false
 *              nr33: "2023-01-01"
 *              nr33_document: "nr33_doc.pdf"
 *              has_nr33: false
 *              nr10: "2023-01-01"
 *              nr10_document: "nr10_doc.pdf"
 *              has_nr10: false
 *              email: "johndoeexample.com"
 *              area: "Engineering"
 *              is_admin: false
 *              is_visitor: false
 *              is_blocked: false
 *              block_reason: null
 *              rfid: "RFID12345"
 *              picture: "picture.jpg"
 *              created_at: "2023-01-01T00:00:00.000Z"
 *              updated_at: "2023-01-01T00:00:00.000Z"
 *              events: ["event1", "event2"]
 *              type_job: "Full-time"
 *              start_job: "2023-01-01"
 *              end_job: "2023-12-31"
 *              username: "johndoe"
 *              salt: "random_salt"
 *              hash: "hashed_password"
 *      '404':
 *        description: User not found
 */
router.get('/:id', authenticateJWT, userController.getUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *    summary: Update a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            example:
 *              id: "user123"
 *              name: "John Doe"
 *              company: "Company Inc."
 *              role: "Engineer"
 *              project: "Project A"
 *              number: 12345
 *              identidade: "ID12345"
 *              cpf: "123.456.789-00"
 *              aso: "2023-01-01"
 *              aso_document: "aso_doc.pdf"
 *              has_aso: false
 *              nr34: "2023-01-01"
 *              nr34_document: "nr34_doc.pdf"
 *              has_nr34: false
 *              nr35: "2023-01-01"
 *              nr35_document: "nr35_doc.pdf"
 *              has_nr35: false
 *              nr33: "2023-01-01"
 *              nr33_document: "nr33_doc.pdf"
 *              has_nr33: false
 *              nr10: "2023-01-01"
 *              nr10_document: "nr10_doc.pdf"
 *              has_nr10: false
 *              email: "johndoeexample.com"
 *              area: "Engineering"
 *              is_admin: false
 *              is_visitor: false
 *              is_blocked: false
 *              block_reason: null
 *              rfid: "RFID12345"
 *              picture: "picture.jpg"
 *              created_at: "2023-01-01T00:00:00.000Z"
 *              updated_at: "2023-01-01T00:00:00.000Z"
 *              events: ["event1", "event2"]
 *              type_job: "Full-time"
 *              start_job: "2023-01-01"
 *              end_job: "2023-12-31"
 *              username: "johndoe"
 *              salt: "random_salt"
 *              hash: "hashed_password"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error updating user"
 *              error: "Details about the error"
 *      '404':
 *        description: User not found
 */
router.put('/:id', authenticateJWT, userController.updateUser);


/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    summary: Delete a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    responses:
 *      '204':
 *        description: User deleted successfully
 *      '404':
 *        description: User not found
 */
router.delete('/:id', authenticateJWT, userController.deleteUser);

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Get all users with pagination
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: false
 *        description: Limit number of users. Default is 10.
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *        required: false
 *        description: Starting index for users. Default is 0.
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              - id: "user123"
 *                name: "John Doe"
 *                company: "Company Inc."
 *                role: "Engineer"
 *                project: "Project A"
 *                number: 12345
 *                identidade: "ID12345"
 *                cpf: "123.456.789-00"
 *                aso: "2023-01-01"
 *                aso_document: "aso_doc.pdf"
 *                has_aso: false
 *                nr34: "2023-01-01"
 *                nr34_document: "nr34_doc.pdf"
 *                has_nr34: false
 *                nr35: "2023-01-01"
 *                nr35_document: "nr35_doc.pdf"
 *                has_nr35: false
 *                nr33: "2023-01-01"
 *                nr33_document: "nr33_doc.pdf"
 *                has_nr33: false
 *                nr10: "2023-01-01"
 *                nr10_document: "nr10_doc.pdf"
 *                has_nr10: false
 *                email: "johndoeexample.com"
 *                area: "Engineering"
 *                is_admin: false
 *                is_visitor: false
 *                is_blocked: false
 *                block_reason: null
 *                rfid: "RFID12345"
 *                picture: "picture.jpg"
 *                created_at: "2023-01-01T00:00:00.000Z"
 *                updated_at: "2023-01-01T00:00:00.000Z"
 *                events: ["event1", "event2"]
 *                type_job: "Full-time"
 *                start_job: "2023-01-01"
 *                end_job: "2023-12-31"
 *                username: "johndoe"
 *                salt: "random_salt"
 *                hash: "hashed_password"
 *              - id: "user124"
 *                name: "Jane Doe"
 *                company: "Company Inc."
 *                role: "Engineer"
 *                project: "Project A"
 *                number: 12345
 *                identidade: "ID12345"
 *                cpf: "123.456.789-00"
 *                aso: "2023-01-01"
 *                aso_document: "aso_doc.pdf"
 *                has_aso: false
 *                nr34: "2023-01-01"
 *                nr34_document: "nr34_doc.pdf"
 *                has_nr34: false
 *                nr35: "2023-01-01"
 *                nr35_document: "nr35_doc.pdf"
 *                has_nr35: false
 *                nr33: "2023-01-01"
 *                nr33_document: "nr33_doc.pdf"
 *                has_nr33: false
 *                nr10: "2023-01-01"
 *                nr10_document: "nr10_doc.pdf"
 *                has_nr10: false
 *                email: "johndoeexample.com"
 *                area: "Engineering"
 *                is_admin: false
 *                is_visitor: false
 *                is_blocked: false
 *                block_reason: null
 *                rfid: "RFID12345"
 *                picture: "picture.jpg"
 *                created_at: "2023-01-01T00:00:00.000Z"
 *                updated_at: "2023-01-01T00:00:00.000Z"
 *                events: ["event1", "event2"]
 *                type_job: "Full-time"
 *                start_job: "2023-01-01"
 *                end_job: "2023-12-31"
 *                username: "johndoe"
 *                salt: "random_salt"
 *                hash: "hashed_password"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error fetching users"
 *              error: "Details about the error"
 */
router.get('/', authenticateJWT, userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}/authorizations:
 *  get:
 *    summary: Get all authorizations for a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User ID
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            example:
 *              [
 *                {
 *                  "id": "uuid1",
 *                  "user_id": "user123",
 *                  "vessel_id": "vessel123",
 *                  "expiration_date": "2023-01-01T00:00:00.000Z"
 *                },
 *                {
 *                  "id": "uuid2",
 *                  "user_id": "user123",
 *                  "vessel_id": "vessel124",
 *                  "expiration_date": "2023-02-01T00:00:00.000Z"
 *                }
 *              ]
 *      '404':
 *        description: User not found
 *        content:
 *          application/json:
 *            example:
 *              {
 *                "message": "User not found"
 *              }
 */
router.get('/:id/authorizations', authenticateJWT, userController.getUserAuthorizations);

module.exports = router;
