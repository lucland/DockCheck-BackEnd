const Document = require('../models/Document');
const Employee = require('../models/Employee');
const ThirdCompany = require('../models/ThirdCompany');
const Event = require('../models/Event');
const Sensor = require('../models/Sensor');
const Area = require('../models/Area');

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
