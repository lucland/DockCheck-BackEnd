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
 * /api/v1/employees/byid/{id}:
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
router.get('/byid/:id', authenticateJWT, employeeController.getEmployee);

/**
 * @swagger
 * /api/v1/employees/allpaginated:
 *  get:
 *    summary: Get all employees paginated
 *    tags: [Employees]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/allpaginated', authenticateJWT, employeeController.getAllEmployeesPaginated);

/**
 * @swagger
 * /api/v1/employees/all:
 *  get:
 *    summary: Get all employees
 *    tags: [Employees]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/all', authenticateJWT, employeeController.getAllEmployees);

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
router.get('/number/lastnumber', authenticateJWT, employeeController.getLastEmployeeNumber);

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
router.put('/updateEmployeeLastAreaFound/:id', authenticateJWT, employeeController.updateEmployeeArea);

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

//approve employee endpoint
/**
 * @swagger
 * /api/v1/employees/approve/{id}:
 *  put:
 *    summary: Approve an employee by ID
 *    tags: [Employees]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Employee approved successfully
 *      '404':
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.put('/approve/:id', authenticateJWT, employeeController.approveEmployee);

//getEmployeeAreas
/**
 * @swagger
 * /api/v1/employees/areas:
 *  get:
 *    summary: Get all employee areas
 *    tags: [Employees]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/areas', employeeController.getEmployeeAreas);

//update employee area by employee id with area: value body
/**
 * @swagger
 * /api/v1/employees/area/{id}:
 *  put:
 *    summary: Update an employee's area by ID
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
 *              area:
 *                type: string
 *    responses:
 *      '200':
 *        description: Employee updated successfully
 *      '404':
 *        description: Employee not found
 *      '400':
 *        description: Bad request
 */
router.put('/area/:id', employeeController.updateEmployeeAreaCode);

//get a list of all employees with lastAreaFound not empty using getEmployeesWithLastAreaFound function with swagger documentation
/**
 * @swagger
 * /api/v1/employees/lastarea:
 *  get:
 *    summary: Get all employees with last area found
 *    tags: [Employees]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/lastarea', employeeController.getEmployeesWithLastAreaFound);

//searchEmployee receives a query string and returns a list of employees that match the query
/**
 * @swagger
 * /api/v1/employees/search:
 *  get:
 *    summary: Search for an employee by query
 *    tags: [Employees]
 *    parameters:
 *      - in: query
 *        name: query
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/search', employeeController.searchEmployee);

//endpoint to use clearLastAreaFound that updates every employee with last_area_found to ""
/**
 * @swagger
 * /api/v1/employees/clearareas:
 *  get:
 *    summary: Clear all last area found
 *    tags: [Employees]
 *    responses:
 *      '200':
 *        description: Employee updated successfully
 *      '400':
 *        description: Bad request
 */
router.get('/clearareas', employeeController.clearLastAreaFound);

/**
 * @swagger
 * /api/v1/employees/areas/updatedtoday:
 *  get:
 *    summary: Get employee areas updated today
 *    tags: [Employees]
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 */
router.get('/areas/updatedtoday', employeeController.getEmployeeAreasUpdatedToday);


module.exports = router;
