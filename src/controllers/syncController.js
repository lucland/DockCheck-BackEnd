//add sync controller updating status field of all models
const Model = require('../models/Model');

const syncController = async (req, res) => {
    try {
        // Update the status field of all models
        await Model.updateMany({}, { status: 'synced' });

        res.status(200).json({ message: 'Sync completed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during sync' });
    }
};

module.exports = syncController;
