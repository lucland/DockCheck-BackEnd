const Sequelize = require('sequelize'); // Make sure Sequelize is imported
const Event = require('../models/Event');
const Company = require('../models/Company');
const Vessel = require('../models/Vessel');
const Docking = require('../models/Docking');
const Portal = require('../models/Portal');
const Supervisor = require('../models/Supervisor');
const User = require('../models/User');

const models = {
  Event,
  Company,
  Vessel,
    Docking,
    Portal,
    Supervisor,
    User
};

exports.syncData = async (req, res) => {
  const transaction = await Sequelize.transaction();

  try {
    const records = req.body.records; // Array of records to sync
    const modelName = req.body.model; // The model to which these records belong
    const model = models[modelName];

    if (!model) {
      return res.status(400).json({ message: 'Invalid model name' });
    }

    // Split records into batches of 100
    for (let i = 0; i < records.length; i += 100) {
      const batch = records.slice(i, i + 100);

      // Upsert into PostgreSQL
      await model.bulkCreate(batch, {
        updateOnDuplicate: ['id'],
        transaction,
      });
    }

    await transaction.commit();
    res.status(200).json({ success: true });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ success: false, error });
  }
};
