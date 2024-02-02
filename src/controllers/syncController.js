const Sequelize = require('sequelize'); // Make sure Sequelize is imported
const Event = require('../models/Event');
const Company = require('../models/Company');
const Vessel = require('../models/Vessel');
const Docking = require('../models/Project');
const Portal = require('../models/Portal');
const Supervisor = require('../models/Supervisor');
const User = require('../models/User');
const { Op } = require('sequelize');

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

exports.getFilteredUsersByVessel = async (req, res) => {
  try {
    const { vessel_id } = req.params;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const users = await User.findAll({
      where: {
        // Assuming you have a vessel_id field in your User model
        vessel_id: vessel_id,
        [Op.or]: [
          {
            has_aso: true,
            aso: {
              [Op.lte]: todayStr
            }
          },
          {
            has_nr34: true,
            nr34: {
              [Op.lte]: todayStr
            }
          },
          {
            has_nr35: true,
            nr35: {
              [Op.lte]: todayStr
            }
          },
          {
            has_nr33: true,
            nr33: {
              [Op.lte]: todayStr
            }
          },
          {
            has_nr10: true,
            nr10: {
              [Op.lte]: todayStr
            }
          },
          {
            end_job: {
              [Op.lte]: todayStr
            }
          },
          {
            is_blocked: true
          }
        ]
      }
    });

    const rfidList = users.map(user => user.rfid);

    res.status(200).json(rfidList);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching filtered users', error });
  }
};

