const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Sensor extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      beacons_found: DataTypes.ARRAY(DataTypes.STRING),
      area_id: {
        type: DataTypes.STRING,
        index: true,
      },
      code: DataTypes.INTEGER,
      status: DataTypes.STRING,
      in_vessel: DataTypes.BOOLEAN,
      location_x: DataTypes.INTEGER,
      location_y: DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'Sensor',
    });
  }
  static associate(models) {
    this.belongsTo(models.Area, { foreignKey: 'area_id' });
  }
  
}

module.exports = Sensor;
