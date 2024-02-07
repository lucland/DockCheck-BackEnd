//create complete CRUD controller for project

const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        console.log("201 - project created successfully");
        res.status(201).json(project);
    } catch (error) {
        console.log("400 - error creating project");
        res.status(400).json({ message: 'Error creating project', error });
    }
};

exports.getProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            console.log("404 - project not found");
            return res.status(404).json({ message: 'Project not found' });
        }
        console.log("200 - project fetched successfully");
        res.status(200).json(project);
    } catch (error) {
        console.log("400 - error fetching project");
        res.status(400).json({ message: 'Error fetching project', error });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        console.log("200 - projects fetched successfully");
        res.status(200).json(projects);
    } catch (error) {
        console.log("400 - error fetching projects");
        res.status(400).json({ message: 'Error fetching projects', error });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            console.log("404 - project not found");
            return res.status(404).json({ message: 'Project not found' });
        }
        const { name, description, date_start, date_end, vessel_id, third_companies_id, admins_id, areas_id, status } = req.body;
        await project.update({
            name,
            description,
            date_start,
            date_end,
            vessel_id,
            third_companies_id,
            admins_id,
            areas_id,
            status,
        });
        console.log("200 - project updated successfully");
        res.status(200).json(project);
    } catch (error) {
        console.log("400 - error updating project");
        res.status(400).json({ message: 'Error updating project', error });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            console.log("404 - project not found");
            return res.status(404).json({ message: 'Project not found' });
        }
        await project.destroy();
        console.log("200 - project deleted successfully");
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.log("400 - error deleting project");
        res.status(400).json({ message: 'Error deleting project', error });
    }
};

//add a new third company to the project
exports.addThirdCompany = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            console.log("404 - project not found");
            return res.status(404).json({ message: 'Project not found' });
        }
        const third_companies = project.third_companies;
        third_companies.push(req.body.third_company_id);
        await project.update({ third_companies });
        console.log("200 - third company added successfully");
        res.status(200).json(project);
    } catch (error) {
        console.log("400 - error adding third company");
        res.status(400).json({ message: 'Error adding third company', error });
    }
};
