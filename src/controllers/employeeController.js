//create complete crud controller for employee

const e = require('cors');
const Employee = require('../models/Employee');
const { QueryTypes } = require('sequelize');

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
           
       // if userId is 'userId' return all employees
        if (req.params.userId === 'userId' || req.params.userId === 'all' || req.params.userId === 'marcelloId' || req.params.userId === 'matheusId' || req.params.userId === 'suellenId' || req.params.userId === 'ludmillaId' || req.params.userId === 'lucasId' || req.params.userId === 'alexandreId' || req.params.userId === 'thiagoId') {
            console.log("200 - employees fetched successfully");
            return res.status(200).json(allEmployees);
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
        await employee.update({ is_blocked: false });
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
        // Create an array to store the employee areas
        const employeeAreas = [];
        // Loop through all employees in the database
        employees.forEach(employee => {
            // Add the employee area to the employeeAreas array
            employeeAreas.push(employee.area);
        });
        // Convert the employeeAreas array to a string with each item separated by a comma
        const areas = employeeAreas.join(',');
        console.log("200 - employee areas fetched successfully");
        res.status(200).json(areas);
    } catch (error) {
        console.log("400 - error fetching employee areas");
        res.status(400).json({ message: 'Error fetching employee areas', error });
    }
};

//update employee area by employee id
exports.updateEmployeeArea = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            console.log("404 - employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }
        const { area } = req.body;
        await employee.update({ area });
        console.log("200 - employee updated successfully");
        res.status(200).json(employee);
    } catch (error) {
        console.log("400 - error updating employee");
        res.status(400).json({ message: 'Error updating employee', error });
    }
};