const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Daily extends Model {
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
      first:  {
        type: DataTypes.DATE,
        index: true,
      },
      project_id: {
        type: DataTypes.STRING,
        index: true,
      },
      final:  {
        type: DataTypes.DATE,
        index: true,
      },
      company:{
        type: DataTypes.STRING,
        index: true,
      },
      status: DataTypes.STRING,
      beacon_id: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Daily',
    });
  }
}

module.exports = Daily;
