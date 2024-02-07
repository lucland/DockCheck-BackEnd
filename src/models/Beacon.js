const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Beacon extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      itag: DataTypes.STRING,
      is_valid: DataTypes.BOOLEAN,
      employee_id: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Beacon',
    });
  }
}

module.exports = Beacon;
