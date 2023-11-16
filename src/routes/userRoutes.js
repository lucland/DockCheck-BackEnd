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
 *              is_guardian: false
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
 *              authorizations_id: ["uuid1", "uuid2"]
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
 *              is_guardian: false
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
 *              authorizations_id: ["uuid1", "uuid2"]
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
 *                authorizations_id: ["uuid1", "uuid2"]
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
 *                is_guardian: false
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

/**
 * @swagger
 * /api/v1/users/checkUsername:
 *  post:
 *    summary: Check if a username is already taken
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: "johndoe"
 *    responses:
 *      '200':
 *        description: Username availability status
 *        content:
 *          application/json:
 *            example:
 *              message: "Username available"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error fetching user"
 *              error: "Details about the error"
 */
router.post('/checkUsername', userController.checkUsername);

/**
 * @swagger
 * /api/v1/users/search:
 *  get:
 *    summary: Search for users by name or id with pagination
 *    tags: [Users]
 *    parameters:
 *      - in: query
 *        name: searchTerm
 *        schema:
 *          type: string
 *        required: true
 *        description: Term to search for in user name or id
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *        required: false
 *        description: Current page number
 *      - in: query
 *        name: pageSize
 *        schema:
 *          type: integer
 *          default: 10
 *        required: false
 *        description: Number of records per page
 *    responses:
 *      '200':
 *        description: A list of users matching the search criteria
 *        content:
 *          application/json:
 *            example:
 *              users: 
 *                - id: "user123"
 *                  name: "John Doe"
 *                  authorizations_id: ["uuid1", "uuid2"]
 *                  company: "Company Inc."
 *                  role: "Engineer"
 *                  project: "Project A"
 *                  number: 12345
 *                  identidade: "ID12345"
 *                  cpf: "123.456.789-00"
 *                  aso: "2023-01-01"
 *                  aso_document: "aso_doc.pdf"
 *                  has_aso: false
 *                  nr34: "2023-01-01"
 *                  nr34_document: "nr34_doc.pdf"
 *                  has_nr34: false
 *                  nr35: "2023-01-01"
 *                  nr35_document: "nr35_doc.pdf"
 *                  has_nr35: false
 *                  nr33: "2023-01-01"
 *                  nr33_document: "nr33_doc.pdf"
 *                  has_nr33: false
 *                  nr10: "2023-01-01"
 *                  nr10_document: "nr10_doc.pdf"
 *                  has_nr10: false
 *                  email: "johndoeexample.com"
 *                  area: "Engineering"
 *                  is_admin: false
 *                  is_visitor: false
 *                  is_blocked: false
 *                  block_reason: null
 *                  rfid: "RFID12345"
 *                  picture: "picture.jpg"
 *                  created_at: "2023-01-01T00:00:00.000Z"
 *                  updated_at: "2023-01-01T00:00:00.000Z"
 *                  events: ["event1", "event2"]
 *                  type_job: "Full-time"
 *                  start_job: "2023-01-01"
 *                  end_job: "2023-12-31"
 *                  username: "johndoe"
 *                  salt: "random_salt"
 *                  hash: "hashed_password"
 *              currentPage: 1
 *              pageSize: 10
 *              totalCount: 20
 *              totalPages: 2
 *      '404':
 *        description: No users found
 *        content:
 *          application/json:
 *            example:
 *              message: "No users found"
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            example:
 *              message: "Error searching for users"
 *              error: "Details about the error"
 */
router.get('/search', authenticateJWT, userController.searchUsers);

/**
 * @swagger
 * /api/v1/users/all/lastnumber:
 *  get:
 *    summary: Get the last number from the users
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Successfully retrieved the last number
 *        content:
 *          application/json:
 *            example:
 *              lastNumber: 12345
 *      '401':
 *        description: Unauthorized access
 *        content:
 *          application/json:
 *            example:
 *              message: "Unauthorized"
 *      '500':
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example:
 *              message: "Internal server error"
 */
router.get('/all/lastnumber', authenticateJWT, userController.getUserNumber)

/**
 * @swagger
 * /api/v1/users/valids/{vesselID}:
 *   get:
 *     summary: Get a list of valid RFIDs of users associated with a specific vessel
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: vesselID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vessel
 *     responses:
 *       '200':
 *         description: A list of user RFIDs for the specified vessel
 *         content:
 *           application/json:
 *             example: 
 *               - "RFID12345"
 *               - "RFID67890"
 *       '404':
 *         description: No users found for the given vessel ID
 *         content:
 *           application/json:
 *             example:
 *               message: "No users found for the given vessel ID"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               message: "Error fetching users for the vessel"
 *               error: "Details about the error"
 */
router.get('/valids/:vesselID', authenticateJWT, userController.getValidUsersByVesselID);

module.exports = router;
