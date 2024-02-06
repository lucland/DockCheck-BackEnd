//create complete crud controller for employee

const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        console.log("201 - employee created successfully");
        res.status(201).json(employee);
    } catch (error) {
        console.log("400 - error creating employee");
        res.status(400).json({ message: 'Error creating employee', error });
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
        const { name, email, phone, updated_at, status } = req.body;
        await employee.update({
            name,
            email,
            phone,
            updated_at,
            status,
        });
        console.log("200 - employee updated successfully");
        res.status(200).json(employee);
    } catch (error) {
        console.log("400 - error updating employee");
        res.status(400).json({ message: 'Error updating employee', error });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            console.log("404 - employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }
        await employee.destroy();
        console.log("200 - employee deleted successfully");
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.log("400 - error deleting employee");
        res.status(400).json({ message: 'Error deleting employee', error });
    }
};
