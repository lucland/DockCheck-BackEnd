const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Authorization extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      third_project_id: DataTypes.STRING,
      expiration_date: DataTypes.DATE,
      employee_id: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Authorization',
    });
  }
}

module.exports = Authorization;
