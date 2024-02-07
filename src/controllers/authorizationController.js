const Authorization = require('../models/Authorization');
const Employee = require('../models/Employee');

//create employee authorization and update employee authorizations_id
exports.createEmployeeAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.create(req.body);
    const employee = await Employee.findByPk(req.body.user_id);
    if (employee) {
      const currentAuthorizations = employee.authorizations_id || [];
      const updatedAuthorizations = [...currentAuthorizations, authorization.id];
      employee.set('authorizations_id', updatedAuthorizations);
      await employee.save();
      console.log("Employee authorizations updated with new authorization ID:", updatedAuthorizations);
    } else {
      console.log("Employee not found");
      res.status(404).json({ message: 'Error creating authorization', error });
    }
    
    console.log("201 - authorization created successfully");
    res.status(201).json(authorization);
  } catch (error) {
    console.log("400 - error creating authorization");
    res.status(400).json({ message: 'Error creating authorization', error });
  }
};

exports.getAuthorizationById = async (req, res) => {
  try {
    const authorization = await Authorization.findByPk(req.params.id);
    if (!authorization) {
      console.log("404 - authorization not found");
      return res.status(404).json({ message: 'Authorization not found' });
    }
    console.log("200 - authorization fetched successfully");
    res.status(200).json(authorization);
  } catch (error) {
    console.log("400 - error fetching authorization");
    res.status(400).json({ message: 'Error fetching authorization', error });
  }
};

exports.updateAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.findByPk(req.params.id);
    if (!authorization) {
      console.log("404 - authorization not found");
      return res.status(404).json({ message: 'Authorization not found' });
    }
    const updatedAuthorization = await authorization.update(req.body);
    updatedAuthorization.save();
    console.log("200 - authorization updated successfully");
    res.status(200).json(updatedAuthorization);
  } catch (error) {
    console.log("400 - error updating authorization");
    res.status(400).json({ message: 'Error updating authorization', error });
  }
};

exports.deleteAuthorization = async (req, res) => {
  try {
    const authorization = await Authorization.findByPk(req.params.id);
    if (!authorization) {
      return res.status(404).json({ message: 'Authorization not found' });
    }
    await authorization.destroy();
    console.log("204 - authorization deleted successfully");
    res.status(204).json({});
  } catch (error) {
    console.log("400 - error deleting authorization");
    res.status(400).json({ message: 'Error deleting authorization', error });
  }
};

exports.getAllAuthorizations = async (req, res) => {
  try {
    const authorizations = await Authorization.findAll();
    console.log("200 - authorizations fetched successfully");
    res.status(200).json(authorizations);
  } catch (error) {
    console.log("400 - error fetching authorizations");
    res.status(400).json({ message: 'Error fetching authorizations', error });
  }
};

//get all ids of authorizations
exports.getAllAuthorizationIds = async (req, res) => {
  try {
    const authorizations = await Authorization.findAll({
      attributes: ['id']
    });
    console.log("200 - authorizations fetched successfully");
    res.status(200).json(authorizations);
  } catch (error) {
    console.log("400 - error fetching authorizations");
    res.status(400).json({ message: 'Error fetching authorizations', error });
  }
};

//add authorization to the employee
exports.addAuthorizationToEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      console.log("404 - employee not found");
      return res.status(404).json({ message: 'Employee not found' });
    }
    const currentAuthorizations = employee.authorizations_id || [];
    const updatedAuthorizations = [...currentAuthorizations, req.params.auth_id];
    employee.set('authorizations_id', updatedAuthorizations);
    await employee.save();
    console.log("200 - authorization added to employee successfully");
    res.status(200).json(employee);
  } catch (error) {
    console.log("400 - error adding authorization to employee");
    res.status(400).json({ message: 'Error adding authorization to employee', error });
  }
};

//remove authorization from the employee
exports.removeAuthorizationFromEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      console.log("404 - employee not found");
      return res.status(404).json({ message: 'Employee not found' });
    }
    const currentAuthorizations = employee.authorizations_id || [];
    const updatedAuthorizations = currentAuthorizations.filter(auth => auth !== req.params.auth_id);
    employee.set('authorizations_id', updatedAuthorizations);
    await employee.save();
    console.log("200 - authorization removed from employee successfully");
    res.status(200).json(employee);
  } catch (error) {
    console.log("400 - error removing authorization from employee");
    res.status(400).json({ message: 'Error removing authorization from employee', error });
  }
};