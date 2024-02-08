const Vessel = require('../models/Vessel');

exports.createVessel = async (req, res) => {
    try {
        const newVessel = await Vessel.create(req.body);
        console.log("201 - Vessel created successfully");
        res.status(201).json({ message: 'Vessel created successfully', vessel: newVessel });
    } catch (error) {
        console.log("400 - Error creating vessel");
        res.status(400).json({ message: 'Error creating vessel', error });
    }
};

exports.getVessel = async (req, res) => {
    try {
        const vessel = await Vessel.findByPk(req.params.id);
        if (!vessel) {
            console.log("404 - Vessel not found");
            return res.status(404).json({ message: 'Vessel not found' });
        }
        console.log("200 - Vessel fetched successfully");
        res.status(200).json(vessel);
    } catch (error) {
        console.log("400 - Error fetching vessel");
        res.status(400).json({ message: 'Error fetching vessel', error });
    }
};

exports.updateVessel = async (req, res) => {
    try {
        const vessel = await Vessel.findByPk(req.params.id);
        if (!vessel) {
            console.log("404 - Vessel not found");
            return res.status(404).json({ message: 'Vessel not found' });
        }
        const updatedVessel = await vessel.update(req.body);
        console.log("200 - Vessel updated successfully");
        res.status(200).json(updatedVessel);
    } catch (error) {
        console.log("400 - Error updating vessel");
        res.status(400).json({ message: 'Error updating vessel', error });
    }
};

exports.deleteVessel = async (req, res) => {
    try {
        const vessel = await Vessel.findByPk(req.params.id);
        if (!vessel) {
            console.log("404 - Vessel not found");
            return res.status(404).json({ message: 'Vessel not found' });
        }
        await vessel.destroy();
        console.log("204 - Vessel deleted successfully");
        res.status(204).json({ message: 'Vessel deleted successfully' });
    } catch (error) {
        console.log("400 - Error deleting vessel");
        res.status(400).json({ message: 'Error deleting vessel', error });
    }
};

exports.getVesselsByCompany = async (req, res) => {
    try {
        const vessels = await Vessel.findAll({
            where: { company_id: req.params.company_id }
        });
        if (vessels.length === 0) {
            console.log("404 - No vessels found for this company");
            return res.status(404).json({ message: 'No vessels found for this company' });
        }
        console.log("200 - Vessels fetched successfully");
        res.status(200).json(vessels);
    } catch (error) {
        console.log("400 - Error fetching vessels");
        res.status(400).json({ message: 'Error fetching vessels', error });
    }
};

exports.getAllVessels = async (req, res) => {
    try {
        const vessels = await Vessel.findAll();
        console.log("200 - Vessels fetched successfully");
        res.status(200).json(vessels);
    } catch (error) {
        console.log("400 - Error fetching vessels");
        res.status(400).json({ message: 'Error fetching vessels', error });
    }
};
