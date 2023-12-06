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
      direction: DataTypes.INTEGER,
      picture: DataTypes.STRING,
      vessel_id: DataTypes.STRING,
      action: DataTypes.INTEGER,
      manual: DataTypes.BOOLEAN,
      justification: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'Event',
    });
  }
}

module.exports = Event;
