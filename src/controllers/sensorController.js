//create complete CRUD controller for sensor

const Sensor = require('../models/Sensor');

exports.createSensor = async (req, res) => {
    try {
        const sensor = await Sensor.create(req.body);
        console.log("201 - sensor created successfully");
        res.status(201).json(sensor);
    } catch (error) {
        console.log("400 - error creating sensor");
        res.status(400).json({ message: 'Error creating sensor', error });
    }
};

exports.getSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            console.log("404 - sensor not found");
            return res.status(404).json({ message: 'Sensor not found' });
        }
        console.log("200 - sensor fetched successfully");
        res.status(200).json(sensor);
    } catch (error) {
        console.log("400 - error fetching sensor");
        res.status(400).json({ message: 'Error fetching sensor', error });
    }
};

exports.getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.findAll();
        console.log("200 - sensors fetched successfully");
        res.status(200).json(sensors);
    } catch (error) {
        console.log("400 - error fetching sensors");
        res.status(400).json({ message: 'Error fetching sensors', error });
    }
};

exports.updateSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            console.log("404 - sensor not found");
            return res.status(404).json({ message: 'Sensor not found' });
        }
        const { name, beacons_found, area_id, code, location_x, location_y, status } = req.body;
        //if beacons_found is not provided, do not update it
        if (!beacons_found) {
            delete req.body.beacons_found;
        }
        await sensor.update({
            name,
            beacons_found,
            area_id,
            code,
            in_vessel,
            location_x,
            location_y,
            status,
        });
        console.log("200 - sensor updated successfully");
        res.status(200).json(sensor);
    } catch (error) {
        console.log("400 - error updating sensor");
        res.status(400).json({ message: 'Error updating sensor', error });
    }
};

exports.deleteSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            console.log("404 - sensor not found");
            return res.status(404).json({ message: 'Sensor not found' });
        }
        await sensor.destroy();
        console.log("200 - sensor deleted successfully");
        res.status(200).json({ message: 'Sensor deleted successfully' });
    } catch (error) {
        console.log("400 - error deleting sensor");
        res.status(400).json({ message: 'Error deleting sensor', error });
    }
};

//update beacons_found in sensor
exports.updateBeaconsFound = async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            console.log("404 - sensor not found");
            return res.status(404).json({ message: 'Sensor not found' });
        }
        const { beacons_found } = req.body;
        await sensor.update({
            beacons_found,
        });
        console.log("200 - sensor updated successfully");
        res.status(200).json(sensor);
    } catch (error) {
        console.log("400 - error updating sensor");
        res.status(400).json({ message: 'Error updating sensor', error });
    }
};

//update sensor location
exports.updateSensorLocation = async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            console.log("404 - sensor not found");
            return res.status(404).json({ message: 'Sensor not found' });
        }
        const { location_x, location_y } = req.body;
        await sensor.update({
            location_x,
            location_y,
        });
        console.log("200 - sensor updated successfully");
        res.status(200).json(sensor);
    } catch (error) {
        console.log("400 - error updating sensor");
        res.status(400).json({ message: 'Error updating sensor', error });
    }
};

