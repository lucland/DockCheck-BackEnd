//create complete CRUD controller for thirdProject

const ThirdProject = require('../models/ThirdProject');

exports.createThirdProject = async (req, res) => {
    try {
        const thirdProject = await ThirdProject.create(req.body);
        console.log("201 - thirdProject created successfully");
        res.status(201).json(thirdProject);
    } catch (error) {
        console.log("400 - error creating thirdProject");
        res.status(400).json({ message: 'Error creating thirdProject', error });
    }
};

exports.getThirdProject = async (req, res) => {
    try {
        const thirdProject = await ThirdProject.findByPk(req.params.id);
        if (!thirdProject) {
            console.log("404 - thirdProject not found");
            return res.status(404).json({ message: 'ThirdProject not found' });
        }
        console.log("200 - thirdProject fetched successfully");
        res.status(200).json(thirdProject);
    } catch (error) {
        console.log("400 - error fetching thirdProject");
        res.status(400).json({ message: 'Error fetching thirdProject', error });
    }
};

exports.getAllThirdProjects = async (req, res) => {
    try {
        const thirdProjects = await ThirdProject.findAll();
        console.log("200 - thirdProjects fetched successfully");
        res.status(200).json(thirdProjects);
    } catch (error) {
        console.log("400 - error fetching thirdProjects");
        res.status(400).json({ message: 'Error fetching thirdProjects', error });
    }
};

exports.updateThirdProject = async (req, res) => {
    try {
        const thirdProject = await ThirdProject.findByPk(req.params.id);
        if (!thirdProject) {
            console.log("404 - thirdProject not found");
            return res.status(404).json({ message: 'ThirdProject not found' });
        }
        const { name, onboarded_count, date_start, date_end, third_company, project_id, allowed_areas_id, employees_id, status } = req.body;
        await thirdProject.update({
            name,
            onboarded_count,
            date_start,
            date_end,
            third_company,
            project_id,
            allowed_areas_id,
            employees_id,
            status,
        });
        console.log("200 - thirdProject updated successfully");
        res.status(200).json(thirdProject);
    } catch (error) {
        console.log("400 - error updating thirdProject");
        res.status(400).json({ message: 'Error updating thirdProject', error });
    }
};

exports.deleteThirdProject = async (req, res) => {
    try {
        const thirdProject = await ThirdProject.findByPk(req.params.id);
        if (!thirdProject) {
            console.log("404 - thirdProject not found");
            return res.status(404).json({ message: 'ThirdProject not found' });
        }
        await thirdProject.destroy();
        console.log("200 - thirdProject deleted successfully");
        res.status(200).json({ message: 'ThirdProject deleted successfully' });
    } catch (error) {
        console.log("400 - error deleting thirdProject");
        res.status(400).json({ message: 'Error deleting thirdProject', error });
    }
};

//add employee to thirdProject
exports.addEmployeeToThirdProject = async (req, res) => {
    try {
        const thirdProject = await ThirdProject.findByPk(req.params.id);
        if (!thirdProject) {
            console.log("404 - thirdProject not found");
            return res.status(404).json({ message: 'ThirdProject not found' });
        }
        const { employee_id } = req.body;
        thirdProject.employees_id.push(employee_id);
        await thirdProject.save();
        console.log("200 - employee added to thirdProject successfully");
        res.status(200).json(thirdProject);
    } catch (error) {
        console.log("400 - error adding employee to thirdProject");
        res.status(400).json({ message: 'Error adding employee to thirdProject', error });
    }
};

//update allowed areas of thirdProject
exports.updateAllowedAreasOfThirdProject = async (req, res) => {
    try {
        const thirdProject = await ThirdProject.findByPk(req.params.id);
        if (!thirdProject) {
            console.log("404 - thirdProject not found");
            return res.status(404).json({ message: 'ThirdProject not found' });
        }
        const { allowed_areas_id } = req.body;
        thirdProject.allowed_areas_id = allowed_areas_id;
        await thirdProject.save();
        console.log("200 - allowed areas updated successfully");
        res.status(200).json(thirdProject);
    } catch (error) {
        console.log("400 - error updating allowed areas");
        res.status(400).json({ message: 'Error updating allowed areas', error });
    }
};
