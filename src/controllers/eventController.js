const Event = require('../models/Event');
const Beacon = require('../models/Beacon');
const Sensor = require('../models/Sensor');
const Employee = require('../models/Employee');
const Area = require('../models/Area');
const Project = require('../models/Project');
const Vessel = require('../models/Vessel');
const sequelize = require('../config/database');


async function manageBeaconTransition(beaconId, sensorId) {
    // Check if any previous sensor has this beacon and is not the current sensor
    const previousSensorQuery = `SELECT id FROM sensors WHERE beacons_found @> ARRAY[$1::VARCHAR] AND id <> $2;`;
    const previousSensorResults = await sequelize.query(previousSensorQuery, { bind: [beaconId, sensorId], type: sequelize.QueryTypes.SELECT });

    // If found, remove the beacon from the previous sensor
    for (const sensor of previousSensorResults) {
        console.log(`Removing beacon from previous sensor: ${sensor.id}`);
        const removeBeaconQuery = `UPDATE sensors SET beacons_found = array_remove(beacons_found, $1) WHERE id = $2;`;
        await sequelize.query(removeBeaconQuery, { bind: [beaconId, sensor.id], type: sequelize.QueryTypes.UPDATE });
    }
}

async function updateEmployeeAndSensorData(employee, sensor, timestamp, action) {
    let areaToUpdate = sensor.area_id;

    // Determine if we need to set the last_area_found to empty
    if (["P1", "P2"].includes(sensor.id)) {
        areaToUpdate = ""; // Set area to empty string as per the conditions
    }

    // Update the employee's last found area and timestamp
    console.log(`Updating last found data for employee: ${employee.id}, area: ${areaToUpdate}`);
    const updateEmployeeQuery = `UPDATE employees SET last_area_found = $1, last_time_found = $2 WHERE id = $3;`;
    await sequelize.query(updateEmployeeQuery, {
        bind: [areaToUpdate, timestamp, employee.id],
        type: sequelize.QueryTypes.UPDATE
    });
}

// Main event creation function remains mostly unchanged
exports.createEvent = async (req, res) => {
    const { id, employee_id, timestamp, project_id, action, sensor_id, beacon_id, status } = req.body;

    try {
        console.log("Creating event...");
        let modifiedSensorId = sensor_id.includes("B") ? sensor_id.slice(0, -1) : sensor_id;

        // Check if the event timestamp is more than 3 minutes into the future
        if (new Date(timestamp) > new Date(new Date().getTime() + 3 * 60000)) {
            console.log("Received timestamp is more than 3 minutes into the future, skipping event creation.");
            return res.status(400).json({ message: "Event timestamp is too far in the future, event not created." });
        }

        // If action is 7 and sensor_id is not "P1" or "P2", do not update employee and do not save event
        if (action === 7 && !["P1", "P2"].includes(modifiedSensorId)) {
            console.log(`Action is 7 and sensor ID is ${modifiedSensorId}, skipping event creation and employee update.`);
            return res.status(400).json({ message: "Event not created due to business rules." });
        }

        const employee = await fetchEmployee(beacon_id);
        if (!employee) {
            console.log(`No employee found with ID: ${beacon_id}`);
            return res.status(404).json({ error: 'Employee not found.' });
        } else {

        const sensor = await fetchSensor(sensor_id);
        if (!sensor) {
            console.log(`No sensor found with id: ${sensor_id}`);
            return res.status(404).json({ error: 'Sensor not found.' });
        }
        
        const event = await createEvent(id, employee.id, timestamp, project_id, action, sensor_id, beacon_id, status);
        console.log(`Event created with ID: ${event.id}`);

        await manageBeaconTransition(beacon_id, sensor_id);
        await updateEmployeeAndSensorData(employee, sensor, timestamp, action);

        console.log("Completed event creation and updates.");
        res.status(201).json(event);
    }
    } catch (error) {
        console.error('Error in createEvent function:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

async function createEvent(id, employeeId, timestamp, projectId, action, sensorId, beaconId, status) {
    const eventInsertQuery = `INSERT INTO events (id, employee_id, timestamp, project_id, action, sensor_id, beacon_id, status, created_at, updated_at)
                              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *;`;
    const events = await sequelize.query(eventInsertQuery, {
        bind: [id, employeeId, timestamp, projectId, action, sensorId, beaconId, status],
        type: sequelize.QueryTypes.INSERT
    });
    return events[0];
}

async function fetchEmployee(beaconId) {
    const employeeQuery = `SELECT * FROM employees WHERE area = $1 LIMIT 1;`;
    console.log(`Fetching employee with beacon ID: ${beaconId}`);
    const results = await sequelize.query(employeeQuery, { bind: [beaconId], type: sequelize.QueryTypes.SELECT });
    console.log(`Employee query results: ${results}`);
    return results[0];
}

async function fetchSensor(sensorId) {
    const sensorQuery = `SELECT * FROM sensors WHERE id = $1 LIMIT 1;`;
    const results = await sequelize.query(sensorQuery, { bind: [sensorId], type: sequelize.QueryTypes.SELECT });
    return results[0];
}


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
