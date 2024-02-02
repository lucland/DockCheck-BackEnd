const { Model, DataTypes } = require('sequelize');

class Sensor extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      beacons_found: DataTypes.ARRAY(DataTypes.STRING),
      area: DataTypes.STRING,
      code: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
      status: DataTypes.STRING,
      location_x: DataTypes.INTEGER,
      location_y: DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'Sensor',
    });
  }
}

module.exports = Sensor;
