const { Model, DataTypes } = require('sequelize');

class Beacon extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      rssi: DataTypes.INTEGER,
      found: DataTypes.DATE,
      user_id: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Beacon',
    });
  }
}

module.exports = Beacon;
