const Daily = require('../models/Daily');

// Get all daily records
const getAllDaily = async (req, res) => {
    try {
        const dailyRecords = await Daily.findAll();
        res.json(dailyRecords);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve daily records' });
    }
};

// Get a specific daily record by ID
const getDailyById = async (req, res) => {
    const { id } = req.params;
    try {
        const dailyRecord = await Daily.findByPk(id);
        if (dailyRecord) {
            res.json(dailyRecord);
        } else {
            res.status(404).json({ error: 'Daily record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve daily record' });
    }
};

// Create a new daily record
const createDaily = async (req, res) => {
    const { id, employee_id, first, project_id, final, company, status, beacon_id } = req.body;
    try {
        const newDaily = await Daily.create({
            id,
            employee_id,
            first,
            project_id,
            final,
            company,
            status,
            beacon_id,
        });
        res.status(201).json(newDaily);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create daily record' });
    }
};

// Update param first of an existing daily record
const updateFirst = async (req, res) => {
    const { id } = req.params;
    const { first } = req.body;
    try {
        const dailyRecord = await Daily.findByPk(id);
        if (dailyRecord) {
            dailyRecord.first = first;
            await dailyRecord.save();
            res.json(dailyRecord);
        } else {
            res.status(404).json({ error: 'Daily record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update daily record' });
    }
};

// Update param final of an existing daily record
const updateFinal = async (req, res) => {
    const { id } = req.params;
    const { final } = req.body;
    try {
        const dailyRecord = await Daily.findByPk(id);
        if (dailyRecord) {
            dailyRecord.final = final;
            await dailyRecord.save();
            res.json(dailyRecord);
        } else {
            res.status(404).json({ error: 'Daily record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update daily record' });
    }
};

// Delete a daily record
const deleteDaily = async (req, res) => {
    const { id } = req.params;
    try {
        const dailyRecord = await Daily.findByPk(id);
        if (dailyRecord) {
            await dailyRecord.destroy();
            res.json({ message: 'Daily record deleted successfully' });
        } else {
            res.status(404).json({ error: 'Daily record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete daily record' });
    }
};

module.exports = {
    getAllDaily,
    getDailyById,
    createDaily,
    updateFirst,
    updateFinal,
    deleteDaily,
};