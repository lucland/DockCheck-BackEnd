const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

/**
 * @swagger
 * /api/v1/employees:
 *  post:
 *    summary: Create a new employee
 *    tags: [Employees]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Employee'
 *    responses:
 *      '201':
 *        description: Employee created successfully
 *      '400':
 *        description: Bad request
 */
router.post('/', authenticateJWT, employeeController.createEmployee);

//block employee endpoint sensind the id and a block_reason in the body
/**
 * @swagger
 * /api/v1/employees/block/{id}:
 *  put:
 *    summary: Block an employee by ID
 *    tags: [Employees]
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
 *              block_reason:
 *                type: string
 *    responses:
 *      '200':
 *        description: Employee blocked successfully
 *      '404':
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.put('/block/:id', authenticateJWT, employeeController.blockEmployee);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *  get:
 *    summary: Get an employee by ID
 *    tags: [Employees]
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
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.get('/:id', authenticateJWT, employeeController.getEmployee);

/**
 * @swagger
 * /api/v1/employees:
 *  get:
 *    summary: Get all employees
 *    tags: [Employees]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/', authenticateJWT, employeeController.getAllEmployees);

//getLastEmployeeNumber endpoint with swagger documentation
/**
 * @swagger
 * /api/v1/employees/lastnumber:
 *  get:
 *    summary: Get the last employee number
 *    tags: [Employees]
 *    responses:
 *      '200':
 *        description: Employee fetched successfully
 *      '404':
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.get('/lastnumber', authenticateJWT, employeeController.getLastEmployeeNumber);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *  put:
 *    summary: Update an employee by ID
 *    tags: [Employees]
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
 *            $ref: '#/components/schemas/Employee'
 *    responses:
 *      '200':
 *        description: Employee updated successfully
 *      '404':
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.put('/:id', authenticateJWT, employeeController.updateEmployee);

/**
 * @swagger
 * /api/v1/employees/area/{id}:
 *  put:
 *    summary: Update an employee's last area found and last time found
 *    tags: [Employees]
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
 *              last_area_found:
 *                type: string
 *              last_time_found:
 *                type: string
 *                format: date-time
 *    responses:
 *      '200':
 *        description: Employee updated successfully
 *      '404':
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.put('/area/:id', authenticateJWT, employeeController.updateEmployeeArea);

//get all employees by user_id where employee.user_id = user_id
/**
 * @swagger
 * /api/v1/employees/user/{userId}:
 *  get:
 *    summary: Get all employees by user ID
 *    tags: [Employees]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/user/:userId', authenticateJWT, employeeController.getAllEmployeesByUserId);

module.exports = router;
