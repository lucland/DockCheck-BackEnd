const Event = require('../models/Event');
const Beacon = require('../models/Beacon');
const Sensor = require('../models/Sensor');
const Employee = require('../models/Employee');
const Area = require('../models/Area');
const Project = require('../models/Project');
const Vessel = require('../models/Vessel');
const sequelize = require('../config/database');

exports.createEvent = async (req, res) => {
    try {
        const { id, employee_id, timestamp, project_id, action, sensor_id, status, beacon_id } = req.body;

        // 1 - retrieve the employee id of the given beacon_id where req.body.beacon_id = employee.area
        const employee = await Employee.findOne({
            where: { area: beacon_id },
            attributes: ['id']
        });

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with the given itag.' });
        }

        // 2 - retrieve the beacon id of the given itag
        /*const beacon = await Beacon.findOne({
            where: { itag },
            attributes: ['id']
        });

        if (!beacon) {
            return res.status(404).json({ error: 'Beacon not found with the given itag.' });
        }*/

        // 3 - retrieve the sensor_id from the sensor table
        const sensor = await Sensor.findOne({
            where: { id: sensor_id },
        });

        if (!sensor) {
            return res.status(404).json({ error: 'Sensor not found with the given code.' });
        }

        // 4 - create a event object
        const event = await Event.create({
            id: id,
            employee_id: employee.id,
            timestamp,
            project_id,
            action,
            sensor_id,
            status,
            beacon_id
        });

        // 5 - update the sensor.beacons_found array
        if (action === 3) {
            //check if the beacon_id is already in the beacons_found array
            

            if (sensor.beacons_found.includes(beacon_id)) {
                return res.status(400).json({ error: 'Beacon already found.' });
            }
    
            await sensor.update({
                beacons_found: sequelize.fn('array_append', sequelize.col('beacons_found'), beacon_id)
            });
        }

        // 6 - update employee.last_area_found
        if (action === 3) {
            const area = await Area.findOne({
                where: { id: sensor.area_id },
            });
            await employee.update({ last_area_found: area.name });
        }

        // 7 - update employee.last_time_found
        if (action === 3) {
            await employee.update({ last_time_found: timestamp });
        }

        // 8 - update vessel.onboarded_count
        const project = await Project.findByPk(project_id);
        const vessel = await Vessel.findByPk(project.vessel_id);


        const lastEvent = await Event.findOne({
            where: { employee_id: employee.id },
            order: [['timestamp', 'DESC']]
        });

        
        if (action === 3 && lastEvent && lastEvent.action !== 3) {
            const lastSensor = await Sensor.findOne({
                where: { id: lastEvent.sensor_id }
            });
            const currentSensor = await Sensor.findOne({
                where: { id: sensor.id }
            });
            if (lastSensor.in_vessel === false && currentSensor.in_vessel === true) {
                await vessel.update({ onboarded_count: sequelize.literal('onboarded_count + 1') });
            }
        }

        // 9 - update the area.count
        if (action === 3) {
            const area = await Area.findByPk(sensor.area_id);
            const sensorsInArea = await Sensor.findAll({
                where: { area_id: sensor.area_id },
                attributes: ['beacons_found']
            });
            let totalCount = 0;
            sensorsInArea.forEach(s => {
                totalCount += s.beacons_found.length;
            });
            await area.update({ count: totalCount });
        }

        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getEventsByEmployeeId = async (req, res) => {
    try {
        const { employee_id } = req.params;

        const events = await Event.findAll({
            where: { employee_id },
            attributes: ['id']
        });

        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createSpecificEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
