const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Employee extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      third_company_id: DataTypes.STRING,
      visitor_company: DataTypes.STRING, //if employee is a visitor
      role: DataTypes.STRING,
      project: DataTypes.STRING,
      number: DataTypes.INTEGER,
      blood_type: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      area: DataTypes.STRING,
      last_area_found: DataTypes.STRING,
      last_time_found: DataTypes.DATE,
      is_blocked: DataTypes.BOOLEAN,
      block_reason: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Employee',
    });
  }
}

module.exports = Employee;
