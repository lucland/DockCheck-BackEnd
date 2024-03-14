//create complete CRUD controller for project

const Project = require('../models/Project');
const Authorization = require('../models/Authorization');
const ThirdProject = require('../models/ThirdProject');
const Employee = require('../models/Employee');
const Document = require('../models/Document');
const Beacon = require('../models/Beacon');
const Company = require('../models/Company');
const CompanyProject = require('../models/CompanyProject');
const ProjectAdmin = require('../models/ProjectAdmin');

exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        //add project to companyProject table
         //await CompanyProject.create({ company_id: project.company_id, project_id: project.id });

        console.log("201 - project created successfully");
        res.status(201).json(project);
    } catch (error) {
        print(error.toString());
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
        //update thirdCompanyProject table
        await CompanyProject.create({ company_id: req.body.third_company_id, project_id: project.id });
        console.log("200 - third company added successfully");
        res.status(200).json(project);
    } catch (error) {
        console.log("400 - error adding third company");
        res.status(400).json({ message: 'Error adding third company', error });
    }
};

exports.approvedEmployeesOfTheDay = async (req, res) => {
    try {
        const { projectId } = req.body;
        const approvedItags = [];

        const thirdProjects = await ThirdProject.findAll({
            where: { project_id: projectId }
        });

        for (const thirdProject of thirdProjects) {
            const authorizations = await Authorization.findAll({
                where: { third_project_id: thirdProject.id }
            });

            for (const authorization of authorizations) {
                const employee = await Employee.findByPk(authorization.employee_id);
                const documents = await Document.findAll({
                    where: { employee_id: employee.id }
                });

                const areDocumentsValid = documents.every(doc => new Date(doc.expiration_date) >= new Date());

                if (areDocumentsValid) {
                    const beacon = await Beacon.findOne({
                        where: { employee_id: employee.id }
                    });

                    if (beacon) {
                        approvedItags.push(beacon.itag);
                    }
                }
            }
        }

        res.status(200).json({ approvedItags });
    } catch (error) {
        console.log("500 - error getting approved employees");
        res.status(500).json({ message: 'Error getting approved employees', error });
    }
};

//add admin to project
exports.addAdminToProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            console.log("404 - project not found");
            return res.status(404).json({ message: 'Project not found' });
        }
        //add to ProjectAdmin table
        await ProjectAdmin.create({ project_id: req.params.id, admin_id: req.body.admin_id });

        const admins = project.admins;
        admins.push(req.body.admin_id);
        await project.update({ admins });
        console.log("200 - admin added successfully");
        res.status(200).json(project);
    } catch (error) {
        console.log("400 - error adding admin");
        res.status(400).json({ message: 'Error adding admin', error });
    }
};

//add area id to the project and update ProjectArea table
exports.addAreaToProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            console.log("404 - project not found");
            return res.status(404).json({ message: 'Project not found' });
        }
        const areas = project.areas;
        areas.push(req.body.area_id);
        await project.update({ areas });
        //update ProjectArea table
        await CompanyProject.create({ company_id: req.body.area_id, project_id: project.id });
        console.log("200 - area added successfully");
        res.status(200).json(project);
    } catch (error) {
        console.log("400 - error adding area");
        res.status(400).json({ message: 'Error adding area', error });
    }
};