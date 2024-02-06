//creae a complete CRUD controller for area

const Area = require('../models/Area');

exports.createArea = async (req, res) => {
    try {
        const area = await Area.create(req.body);
        console.log("201 - area created successfully");
        res.status(201).json(area);
    } catch (error) {
        console.log("400 - error creating area");
        res.status(400).json({ message: 'Error creating area', error });
    }
};

exports.getArea = async (req, res) => {
    try {
        const area = await Area.findByPk(req.params.id);
        if (!area) {
            console.log("404 - area not found");
            return res.status(404).json({ message: 'Area not found' });
        }
        console.log("200 - area fetched successfully");
        res.status(200).json(area);
    } catch (error) {
        console.log("400 - error fetching area");
        res.status(400).json({ message: 'Error fetching area', error });
    }
};

exports.getAllAreas = async (req, res) => {
    try {
        const areas = await Area.findAll();
        console.log("200 - areas fetched successfully");
        res.status(200).json(areas);
    } catch (error) {
        console.log("400 - error fetching areas");
        res.status(400).json({ message: 'Error fetching areas', error });
    }
};

exports.updateArea = async (req, res) => {
    try {
        const area = await Area.findByPk(req.params.id);
        if (!area) {
            console.log("404 - area not found");
            return res.status(404).json({ message: 'Area not found' });
        }
        const { name, description, updated_at, status } = req.body;
        await area.update({
            name,
            description,
            updated_at,
            status,
        });
        console.log("200 - area updated successfully");
        res.status(200).json(area);
    } catch (error) {
        console.log("400 - error updating area");
        res.status(400).json({ message: 'Error updating area', error });
    }
};

exports.deleteArea = async (req, res) => {
    try {
        const area = await Area.findByPk(req.params.id);
        if (!area) {
            console.log("404 - area not found");
            return res.status(404).json({ message: 'Area not found' });
        }
        await area.destroy();
        console.log("200 - area deleted successfully");
        res.status(200).json({ message: 'Area deleted successfully' });
    } catch (error) {
        console.log("400 - error deleting area");
        res.status(400).json({ message: 'Error deleting area', error });
    }
};
