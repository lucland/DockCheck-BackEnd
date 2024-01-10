const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      portal_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      timestamp: DataTypes.DATE,
      vessel_id: DataTypes.STRING,
      action: DataTypes.INTEGER,
      justification: DataTypes.STRING,
      status: DataTypes.STRING,
      beacon_id: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Event',
    });
  }
}

module.exports = Event;
