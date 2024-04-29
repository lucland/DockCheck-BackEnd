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
        console.log("Creating event...");
        const { id, employee_id, timestamp, project_id, action, sensor_id, beacon_id, status } = req.body;

        //if we receive the sensor_id as "P1B", turn it into just "P1" instead
        if (sensor_id.includes("B")) {
            sensor_id = sensor_id.slice(0, -1);
        }

        if (action !== 3 && action !== 7) {
            console.log(`Action is not 3, creating event without array manipulation. Action: ${action}`);
            const eventQuery = `INSERT INTO events (id, employee_id, timestamp, project_id, action, sensor_id, beacon_id, status, created_at, updated_at)
                                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *;`;
            const event = await sequelize.query(eventQuery, { bind: [id, employee_id, timestamp, project_id, action, sensor_id, beacon_id, status], type: sequelize.QueryTypes.INSERT });
            return res.status(201).json(event[0][0]);
        }

        
        const employeeQuery = `SELECT * FROM employees WHERE area = $1 LIMIT 1;`;
        const employeeResults = await sequelize.query(employeeQuery, { bind: [beacon_id], type: sequelize.QueryTypes.SELECT });

        if (employeeResults.length === 0) {
            console.log(`No employee found with ID: ${employee_id}`);
            return res.status(404).json({ error: 'Employee not found.' });
        }
        const employee = employeeResults[0];

        const sensorQuery = `SELECT * FROM sensors WHERE id = $1 LIMIT 1;`;
        const sensorResults = await sequelize.query(sensorQuery, { bind: [sensor_id], type: sequelize.QueryTypes.SELECT });

        if (sensorResults.length === 0) {
            console.log(`No sensor found with id: ${sensor_id}`);
            return res.status(404).json({ error: 'Sensor not found.' });
        }
        const sensor = sensorResults[0];

        const eventInsertQuery = `INSERT INTO events (id, employee_id, timestamp, project_id, action, sensor_id, beacon_id, status, created_at, updated_at)
                                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *;`;
        const event = await sequelize.query(eventInsertQuery, { bind: [id, employee.id, timestamp, project_id, action, sensor_id, beacon_id, status], type: sequelize.QueryTypes.INSERT });

       // Convert both timestamps to ISO String format (YYYY-MM-DDTHH:MM:SS.sssZ)
const receivedTimeISO = new Date(timestamp).toISOString();
const lastTimeFoundISO = new Date(employee.last_time_found).toISOString();

//if action is 7 and sesor_id is P1, retun
if (action === 7 && sensor_id === "P1") {
    console.log("Received action is 7 and sensor_id is P1, skipping updates.");
    return res.status(201).json({ message: "No update needed as event is older." });
}

//if action is 0 or lower than 0, return
if (action <= 0) {
    console.log("Received action is 0 or lower, skipping updates.");
    return res.status(201).json({ message: "No update needed as event is older." });
}

// Compare ISO strings directly
if (employee.last_time_found !== null && receivedTimeISO < lastTimeFoundISO 
    && receivedTimeISO < new Date(Date.now() + 5 * 60000).toISOString()
    ) {
    console.log("Received timestamp is earlier than last recorded time, skipping updates.");
    console.log(timestamp);
    console.log(employee.last_time_found);
    return res.status(201).json({ message: "No update needed as event is older." });
} else {
    console.log("Received timestamp is later than last recorded time, updating employee and sensor data.");

    //select last event from the employee
    const lastEventQuery = `SELECT * FROM events WHERE employee_id = $1 ORDER BY timestamp DESC LIMIT 1;`;
    const lastEventResults = await sequelize.query(lastEventQuery, { bind: [employee.id], type: sequelize.QueryTypes.SELECT });

    //retrieve the sensor from the last event by the sensor_id
    const lastSensorQuery = `SELECT * FROM sensors WHERE id = $1;`;
    const lastSensorResults = await sequelize.query(lastSensorQuery, { bind: [lastEventResults[0].sensor_id], type: sequelize.QueryTypes.SELECT });


        // Retrieve the vessel ID from the project
        const projectQuery = `SELECT vessel_id FROM projects WHERE id = $1;`;
        const projectResults = await sequelize.query(projectQuery, { bind: [project_id], type: sequelize.QueryTypes.SELECT });
        const vessel_id = projectResults[0].vessel_id;

        // Manage beacon transition between sensors
        const previousSensorQuery = `SELECT id, area_id, in_vessel FROM sensors WHERE beacons_found @> ARRAY[$1]::VARCHAR[] AND id <> $2;`;
        const previousSensorResults = await sequelize.query(previousSensorQuery, { bind: [beacon_id, sensor_id], type: sequelize.QueryTypes.SELECT });

        if (previousSensorResults.length > 0) {
            const previousSensor = previousSensorResults[0];
            const removeBeaconQuery = `UPDATE sensors SET beacons_found = array_remove(beacons_found, $1) WHERE id = $2;`;
            await sequelize.query(removeBeaconQuery, { bind: [beacon_id, previousSensor.id], type: sequelize.QueryTypes.UPDATE });

           /* // Decrement the area count and vessel count if the previous sensor was in_vessel
            const decrementAreaQuery = `UPDATE areas SET count = count - 1 WHERE id = $1;`;
            const vessel = await Vessel.findByPk(vessel_id);
            await sequelize.query(decrementAreaQuery, { bind: [previousSensor.area_id], type: sequelize.QueryTypes.UPDATE });
            if (previousSensor.in_vessel && vessel.onboarded_count > 0) {
                const decrementVesselQuery = `UPDATE vessels SET onboarded_count = onboarded_count - 1 WHERE id = $1;`;
                await sequelize.query(decrementVesselQuery, { bind: [vessel_id], type: sequelize.QueryTypes.UPDATE });
            }*/
        }


        // Add the beacon to the current sensor's beacons_found if not already included
        if (!sensor.beacons_found.includes(beacon_id)) {
            const updateSensorQuery = `UPDATE sensors SET beacons_found = array_append(beacons_found, $1) WHERE id = $2;`;
            await sequelize.query(updateSensorQuery, { bind: [beacon_id, sensor_id], type: sequelize.QueryTypes.UPDATE });
        }

        // Update the employee's last found area
        const updateEmployeeQuery = `UPDATE employees SET last_area_found = $1, last_time_found = $2 WHERE id = $3;`;
        await sequelize.query(updateEmployeeQuery, { bind: [lastSensorResults[0].area_id, lastEventResults[0].timestamp, employee.id], type: sequelize.QueryTypes.UPDATE });

        //if received action from req.body is equal 7, update the last_area_found to ""
        if (lastSensorResults[0].id === "P2") {
            const updateEmployeeQuery = `UPDATE employees SET last_area_found = $1, last_time_found = $2 WHERE id = $3;`;
            await sequelize.query(updateEmployeeQuery, { bind: ["", lastEventResults[0].timestamp, employee.id], type: sequelize.QueryTypes.UPDATE });

            //remove the beacon from the sensor's beacons_found
            const removeBeaconQuery = `UPDATE sensors SET beacons_found = array_remove(beacons_found, $1) WHERE id = $2;`;
            await sequelize.query(removeBeaconQuery, { bind: [beacon_id, lastSensorResults[0].id], type: sequelize.QueryTypes.UPDATE });
        }

        if (lastSensorResults[0].id === "P1") {
            const updateEmployeeQuery = `UPDATE employees SET last_area_found = $1, last_time_found = $2 WHERE id = $3;`;
            await sequelize.query(updateEmployeeQuery, { bind: ["", lastEventResults[0].timestamp, employee.id], type: sequelize.QueryTypes.UPDATE });

            //remove the beacon from the sensor's beacons_found
            const removeBeaconQuery = `UPDATE sensors SET beacons_found = array_remove(beacons_found, $1) WHERE id = $2;`;
            await sequelize.query(removeBeaconQuery, { bind: [beacon_id, lastSensorResults[0].id], type: sequelize.QueryTypes.UPDATE });
        }

         // Retrieve all sensors in the same area and sum their beacons_found
         const sensorsInAreaQuery = `SELECT beacons_found FROM sensors WHERE area_id = $1;`;
         const sensorsInAreaResults = await sequelize.query(sensorsInAreaQuery, { bind: [sensor.area_id], type: sequelize.QueryTypes.SELECT });
         let totalBeaconsInArea = sensorsInAreaResults.reduce((sum, record) => {
             let uniqueBeacons = new Set(record.beacons_found);
             return sum + uniqueBeacons.size; // Sum the number of unique beacons for each sensor
         }, 0);
 
         // Update area count
         const updateAreaCountQuery = `UPDATE areas SET count = $1 WHERE id = $2;`;
         await sequelize.query(updateAreaCountQuery, { bind: [totalBeaconsInArea, sensor.area_id], type: sequelize.QueryTypes.UPDATE });
 
        // Update vessel onboard count based on the sum of counts from sensors with in_vessel=true
        const sensorsInVesselQuery = `SELECT beacons_found FROM sensors WHERE in_vessel = true;`;
        const sensorsResults = await sequelize.query(sensorsInVesselQuery, { type: sequelize.QueryTypes.SELECT });
        let totalOnboardCount = sensorsResults.reduce((sum, record) => sum + record.beacons_found.length, 0);

        const updateVesselQuery = `UPDATE vessels SET onboarded_count = $1 WHERE id = $2;`;
        await sequelize.query(updateVesselQuery, { bind: [totalOnboardCount, projectResults[0].vessel_id], type: sequelize.QueryTypes.UPDATE });


        console.log("Completed event creation and updates.");
        res.status(201).json(event[0][0]);
    }
    } catch (error) {
        console.error('Error in createEvent function:', error);
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
