//create complete crud controller for employee

const Employee = require('../models/Employee');
const Vessel = require('../models/Vessel');
const Project = require('../models/Project');

exports.createEmployee = async (req, res) => {
    try {
        const { is_crew, project_id, ...employeeData } = req.body;
        const employee = await Employee.create(employeeData);

        console.log("201 - Employee created successfully");
        res.status(201).json(employee);
    } catch (error) {
        console.log("400 - Error creating employee");
        res.status(400).json({ message: 'Error creating employee', error });
    }
};

exports.blockEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { block_reason } = req.body;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            console.log("404 - Employee not found");
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.blocked = true;
        employee.block_reason = block_reason;
        await employee.save();

        console.log("200 - Employee blocked successfully");
        res.status(200).json({ message: 'Employee blocked successfully' });
    } catch (error) {
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
        const { name, third_company_id, visitor_company, role, project_id, number, blood_type, cpf, area_id, last_area_found, last_time_found, is_blocked, block_reason, status } = req.body;
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
