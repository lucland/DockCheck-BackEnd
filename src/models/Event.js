const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Event extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.STRING,
        index: true,
      },
      timestamp:  {
        type: DataTypes.DATE,
        index: true,
      },
      project_id: {
        type: DataTypes.STRING,
        index: true,
      },
      action: DataTypes.INTEGER,
      sensor_id:{
        type: DataTypes.STRING,
        index: true,
      },
      status: DataTypes.STRING,
      beacon_id: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Event',
    });
  }
}

module.exports = Event;
