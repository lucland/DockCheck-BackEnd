const Document = require('../models/Document');
const Employee = require('../models/Employee');
const ThirdCompany = require('../models/ThirdCompany');
const Event = require('../models/Event');
const Sensor = require('../models/Sensor');
const Area = require('../models/Area');
const Vessel = require('../models/Vessel');

const sequelize = require('../config/database');


exports.getAreaAccessCount = async (req, res) => {
        try {
            const { projectId, startDate, endDate } = req.body;

            const accessCount = await Event.findAll({
                where: {
                    projectId,
                    action: 3,
                    timestamp: {
                        [sequelize.Op.between]: [startDate, endDate]
                    }
                },
                include: [{
                    model: Sensor,
                    attributes: [],
                    include: [{
                        model: Area,
                        attributes: ['name']
                    }]
                }],
                group: ['Sensor.Area.id'],
                attributes: ['Sensor.Area.name', [sequelize.fn('COUNT', 'Sensor.Area.id'), 'accessCount']],
                raw: true
            });

            res.json(accessCount.filter(a => a.accessCount > 0));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    exports.getThirdCompanyHours = async (req, res) => {
        try {
            const { projectId, startDate, endDate } = req.body;

            const hoursWorked = await Event.findAll({
                where: {
                    projectId,
                    timestamp: {
                        [sequelize.Op.between]: [startDate, endDate]
                    }
                },
                include: [{
                    model: Employee,
                    attributes: ['third_company_id'],
                    include: [{
                        model: ThirdCompany,
                        attributes: ['name']
                    }]
                }],
                group: ['Employee.third_company_id'],
                attributes: [
                    [sequelize.fn('SUM', sequelize.fn('DATEDIFF', sequelize.fn('MAX', sequelize.col('timestamp')), sequelize.fn('MIN', sequelize.col('timestamp')))), 'totalHours']
                ],
                raw: true
            });

            res.json(hoursWorked);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    exports.getThirdCompanyAccessCount = async (req, res) => {
        try {
            const { projectId, startDate, endDate } = req.body;

            const accessCount = await Event.findAll({
                where: {
                    projectId,
                    timestamp: {
                        [sequelize.Op.between]: [startDate, endDate]
                    }
                },
                include: [{
                    model: Employee,
                    attributes: ['third_company_id'],
                    include: [{
                        model: ThirdCompany,
                        attributes: ['name']
                    }]
                }],
                group: ['Employee.third_company_id'],
                attributes: ['Employee.ThirdCompany.name', [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.fn('DATE', sequelize.col('timestamp')))), 'accessCount']],
                raw: true
            });

            res.json(accessCount);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    exports.getTotalUniqueEmployees = async (req, res) => {
        try {
            const { projectId } = req.body;

            const totalEmployees = await Employee.count({
                include: [{
                    model: Event,
                    where: { projectId },
                    attributes: []
                }],
                distinct: true,
                col: 'id'
            });

            res.json({ totalEmployees });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    exports.getCurrentPeopleOnboarded = async (req, res) => {
        try {
            const { projectId } = req.body;
            const project = await Project.findByPk(projectId, {
                include: [{
                    model: Vessel,
                    as: 'vessel',
                    include: [{
                        model: Employee,
                        as: 'crew'
                    }]
                }]
            });
    
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
    
            const onboardedEmployees = await Employee.findAll({
                include: [{
                    model: Event,
                    as: 'events',
                    where: {
                        projectId,
                        action: 3
                    },
                    include: [{
                        model: Sensor,
                        as: 'sensor',
                        where: { in_vessel: true },
                        required: true
                    }],
                    order: [['timestamp', 'DESC']],
                    limit: 1
                }]
            });
    
            const totalOnboarded = onboardedEmployees.length;
            const crewOnboarded = onboardedEmployees.filter(e => project.vessel.crew_id.includes(e.id)).length;
            const employeeOnboarded = totalOnboarded - crewOnboarded;
    
            res.json({ totalOnboarded, crewOnboarded, employeeOnboarded });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    exports.getUniqueThirdCompaniesOnboarded = async (req, res) => {
        try {
            const { projectId } = req.body;
    
            const thirdCompanyCounts = await Employee.findAll({
                attributes: [
                    'third_company_id',
                    [sequelize.fn('COUNT', sequelize.col('third_company_id')), 'totalEmployees']
                ],
                include: [{
                    model: Event,
                    as: 'events',
                    where: { projectId },
                    attributes: []
                }],
                group: ['third_company_id'],
                raw: true
            });
    
            const thirdCompanies = await ThirdCompany.findAll({
                where: {
                    id: thirdCompanyCounts.map(c => c.third_company_id)
                }
            });
    
            const result = thirdCompanies.map(tc => ({
                thirdCompanyName: tc.name,
                totalEmployees: thirdCompanyCounts.find(c => c.third_company_id === tc.id).totalEmployees
            }));
    
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    
    exports.getOnboardedEmployeesDetails = async (req, res) => {
        try {
            const { projectId } = req.body;
    
            const onboardedEmployees = await Employee.findAll({
                attributes: ['name', 'number', 'last_area_found'],
                include: [{
                    model: Event,
                    as: 'events',
                    where: {
                        projectId,
                        action: 3
                    },
                    include: [{
                        model: Sensor,
                        as: 'sensor',
                        where: { in_vessel: true },
                        required: true
                    }],
                    order: [['timestamp', 'DESC']],
                    limit: 1
                }, {
                    model: ThirdCompany,
                    as: 'thirdCompany',
                    attributes: ['name']
                }]
            });
    
            const result = onboardedEmployees.map(e => ({
                name: e.name,
                number: e.number,
                lastAreaFound: e.last_area_found,
                thirdCompanyName: e.thirdCompany.name
            }));
    
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };