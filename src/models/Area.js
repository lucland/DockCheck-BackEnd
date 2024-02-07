const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Area extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      count: DataTypes.INTEGER,
      name: DataTypes.STRING,
      is_portalo: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Area',
    });
  }
}

module.exports = Area;
