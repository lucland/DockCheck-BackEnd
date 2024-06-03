//create complete crud controller for employee

const e = require('cors');
const Employee = require('../models/Employee');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Router } = require('express');

exports.createEmployee = async (req, res) => {
    try {
        const { is_crew, project_id, ...employeeData } = req.body;
        const employee = await Employee.create(employeeData);

        console.log("201 - Employee created successfully");
        res.status(201).json(employee);
    } catch (error) {
        console.log(error);
        console.log("400 - Error creating employee");
        res.status(400).json({ message: 'Error creating employee', error });
    }
};

//getLastEmployeeNumber
exports.getLastEmployeeNumber = async (req, res) => {
    try {
       //return the biggest employee.number from the database
       //if there is no employee in the database Employee table return 1
       if (await Employee.count() === 0) {
            console.log("200 - Employee fetched successfully");
            return res.status(200).json(1);
        }


        const employee = await Employee.findOne({
            order: [['number', 'DESC']]
        });
        console.log("200 - Employee fetched successfully");
        res.status(200).json(employee.number);
    } catch (error) {
        console.log("400 - Error fetching employee");
        res.status(400).json({ message: 'Error fetching employee', error });
    }
};

exports.blockEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            console.log("404 - employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }
        const { block_reason } = req.body;
        await employee.update({ is_blocked: true, block_reason });

        console.log("200 - Employee blocked successfully");
        res.status(200).json({ message: 'Employee blocked successfully' });
    } catch (error) {
        console.log(error);
        console.log("500 - Server error");
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            console.log("404 - employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }
        console.log("200 - employee fetched successfully");
        res.status(200).json(employee);
    } catch (error) {
        console.log("400 - error fetching employee");
        res.status(400).json({ message: 'Error fetching employee', error });
    }
};

exports.getAllEmployeesPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const employees = await Employee.findAndCountAll({
            limit,
            offset,
            order: [['number', 'ASC']],
        });

        const totalPages = Math.ceil(employees.count / limit);

        console.log("200 - employees fetched successfully");
        res.status(200).json({
            employees: employees.rows,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.log(error);
        console.log("400 - error fetching employees");
        res.status(400).json({ message: 'Error fetching employees', error });
    }
};

//get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        console.log("200 - employees fetched successfully");
        res.status(200).json(employees);
    } catch (error) {
        console.log("400 - error fetching employees");
        res.status(400).json({ message: 'Error fetching employees', error });
    }
};


exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            console.log("404 - employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }
        const { name, third_company_id, visitor_company, role, project_id, number, blood_type, cpf, area_id, last_area_found, last_time_found, is_blocked, block_reason, status, user_id, telephone } = req.body;
        await employee.update({
            name,
            third_company_id,
            visitor_company,
            role,
            project_id,
            number,
            blood_type,
            cpf,
            area_id,
            last_area_found,
            last_time_found,
            is_blocked,
            block_reason,
            status,
            user_id,
            telephone,
        });
        await employee.update({ updated_at: new Date() });
        console.log("200 - employee updated successfully");
        res.status(200).json(employee);
    } catch (error) {
        console.log("400 - error updating employee");
        res.status(400).json({ message: 'Error updating employee', error });
    }
};

//update last area found and last time found
exports.updateEmployeeArea = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            console.log("404 - employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }
        const { last_area_found, last_time_found } = req.body;
        await employee.update({
            last_area_found,
            last_time_found,
        });
        await employee.update({ updated_at: new Date() });
        console.log("200 - employee updated successfully");
        res.status(200).json(employee);
    } catch (error) {
        console.log("400 - error updating employee");
        res.status(400).json({ message: 'Error updating employee', error });
    }
};

//get all employyes by user_id where employee.user_id = user_id
exports.getAllEmployeesByUserId = async (req, res) => {
    try {
        console.log(req.params);
        // Find all employees in the database by user ID
        
        const employees = await Employee.findAll({ where: { user_id: req.params.userId } });
        const allEmployees = await Employee.findAll();

        const googlemarineEmployees = allEmployees.filter(employee => employee.third_company_id === 'GOOGLEMARINE');
           
       // if userId is 'userId' return all employees
        if (req.params.userId === 'userId' || req.params.userId === 'all' || req.params.userId === 'marcelloId' || req.params.userId === 'matheusId' || req.params.userId === 'suellenId' || req.params.userId === 'ludmillaId' || req.params.userId === 'lucasId' || req.params.userId === 'alexandreId' || req.params.userId === 'thiagoId'|| req.params.userId === 'rpassos'|| req.params.userId === 'rpassos2') {
            console.log("200 - employees fetched successfully");
            return res.status(200).json(allEmployees);
        }
        if (req.params.userId === 'lucasId' || req.params.userId === 'alexandreId' || req.params.userId === 'thiagoId') {
            console.log("200 - employees fetched successfully");
            return res.status(200).json(googlemarineEmployees);
        }

        console.log("200 - employees fetched successfully");
        res.status(200).json(employees);
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        res.status(500).json({ error: 'Failed to get employees' });
    }
};

//approve employee function where we receive the employee id and set its is_blocked param to false
exports.approveEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            console.log("404 - employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }
        await employee.update({ is_blocked: false, updated_at: new Date()});
        console.log("200 - employee approved successfully");
        res.status(200).json(employee);
    } catch (error) {
        console.log("400 - error approving employee");
        res.status(400).json({ message: 'Error approving employee', error });
    }
};

//retrieve a list of every employee.area values in a single string with each item separated by a comma and no spaces
exports.getEmployeeAreas = async (req, res) => {
    try {
        // Find all employees in the database
        const employees = await Employee.findAll();

        // Create a Set to store unique employee areas
        const employeeAreasSet = new Set();

        // Loop through all employees in the database
        employees.forEach(employee => {
            // Ignore if the area is null, empty, or ends with "\r"
            if (employee.area && employee.area.endsWith("\r")) {
                employee.area = employee.area.slice(0, -1);
            }
            if (employee.area) {
                employeeAreasSet.add(employee.area);
            }
        });

        // Convert the Set to an array
        const employeeAreas = Array.from(employeeAreasSet);

        // Prepare the final array of strings
        const result = [];
        const areaCount = 10; // number of areas per string

        // Loop to create each string with 10 areas, less if not enough areas remain
        for (let i = 0; i < employeeAreas.length; i += areaCount) {
            // Slice the next 10 areas and join them with a comma
            const areaString = employeeAreas.slice(i, i + areaCount).join(',');
            // Add "P0 A," prefix to the string and push to result array
            result.push(`P0 A,${areaString}`);
        }

        console.log("200 - Employee areas fetched successfully");
        res.status(200).json(result);
    } catch (error) {
        console.log("400 - Error fetching employee areas");
        res.status(400).json({ message: 'Error fetching employee areas', error });
    }
};


//search for an employee by name or third_company_id
exports.searchEmployee = async (req, res) => {
    try {
        const { search } = req.query;
        const query = `
            SELECT * FROM Employees
            WHERE name ILIKE '%${search}%' OR third_company_id ILIKE '%${search}%'
        `;
        const employees = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("200 - employees fetched successfully");
        res.status(200).json(employees);
    } catch (error) {
        console.log(error);
        console.log("400 - error fetching employees");
        res.status(400).json({ message: 'Error fetching employees', error });
    }
};

//update employee area by employee id
exports.updateEmployeeAreaCode = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            console.log("404 - employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }

        
        const { area } = req.body;

        //check if theres another employee with the same area and if so return an error
        const employees = await Employee.findAll({ where: { area } });
        if (employees.length > 0) {
            console.log("400 - area already in use");
            return res.status(400).json({ message: 'Area already in use' });
        }
        
        await employee.update({ area });
        //updated_at updated with date time now
        await employee.update({ updated_at: new Date() });
        
        console.log("200 - employee updated successfully");
        res.status(200).json(employee);
    } catch (error) {
        console.log("400 - error updating employee");
        res.status(400).json({ message: 'Error updating employee', error });
    }
};

//retrieve a list of employees that have last_area_found not empty and not null with pagination
exports.getEmployeesWithLastAreaFound = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1000;
        const offset = (page - 1) * limit;

        const query = `
            SELECT * FROM Employees
            WHERE last_area_found IS NOT NULL AND last_area_found <> ''
            LIMIT ${limit} OFFSET ${offset}
        `;

        const employees = await sequelize.query(query, { type: QueryTypes.SELECT });

        console.log("200 - employees fetched successfully");
        res.status(200).json(employees);
    } catch (error) {
        console.log(error);
        console.log("400 - error fetching employees");
        res.status(400).json({ message: 'Error fetching employees', error });
    }
};


//get all employees areas that are not empty
exports.getEmployeeAreasA = async (req, res) => {
    try {
        const areas = await sequelize.query(`
            SELECT area FROM Employees
            WHERE area IS NOT NULL AND area <> ''
        `, { type: QueryTypes.SELECT });

        const employeeAreas = areas.map(area => area.area);

        console.log("200 - employee areas fetched successfully");
        res.status(200).json(employeeAreas);
    } catch (error) {
        console.log("400 - error fetching employee areas");
        res.status(400).json({ message: 'Error fetching employee areas', error });
    }
};

//function to set last area found off all employees to "" where last area found is different from ""
exports.clearLastAreaFound = async (_, res) => {
    //update all employees last_area_found to ""
    try {
        await sequelize.query(`
            UPDATE Employees
            SET last_area_found = ''
            WHERE last_area_found <> ''
        `);
        console.log("200 - last area found cleared successfully");

        //set beacons_found param of every sensor of the sensors table to be a array with 1 empty string element, knowing that the beacons_found param is a charachter varying[] type
        await sequelize.query(`
            UPDATE Sensors
            SET beacons_found = ARRAY['']
        `);
        
        console.log("200 - beacons found cleared successfully");
        //set count param of ever area in areas table to 0
        await sequelize.query(`
            UPDATE Areas
            SET count = 0
        `);
        console.log("200 - areas count cleared successfully");
        res.status(200).json({ message: 'Last area found cleared successfully' });
    } catch (error) {
        console.log("400 - error clearing last area found");
        res.status(400).json({ message: 'Error clearing last area found', error });
    }
};

exports.getEmployeeAreasUpdatedToday = async (req, res) => {
    try {
        // Get today's date and format it in 'YYYY-MM-DD' for SQL query
        const today = new Date().toISOString().slice(0, 10);

        // SQL query to find employees updated today
        const sqlQuery = `
            SELECT DISTINCT area
            FROM Employees
            WHERE updated_at >= '${today} 00:00:00'
            AND updated_at < '${today} 23:59:59'
            AND area IS NOT NULL
            AND area NOT LIKE '%\r'
        `;

        // Execute the SQL query
        const [results] = await sequelize.query(sqlQuery);

        if (results.length === 0) {
            console.log("400 - No employee areas updated today");
            return res.status(400).json({ message: 'No employee areas updated today' });
        }

        // Extract just the areas from the query results
        const employeeAreas = results.map(row => row.area);

        // Prepare the final array of strings
        const result = [];
        const areaCount = 10; // number of areas per string

        // Loop to create each string with 10 areas, less if not enough areas remain
        for (let i = 0; i < employeeAreas.length; i += areaCount) {
            const areaString = employeeAreas.slice(i, i + areaCount).join(',');
            result.push(`P0 A,${areaString}`);
        }

        console.log("200 - Employee areas updated today fetched successfully");
        res.status(200).json(result);
    } catch (error) {
        console.log("400 - Error fetching employee areas updated today");
        res.status(400).json({ message: 'Error fetching employee areas updated today', error });
    }
};
