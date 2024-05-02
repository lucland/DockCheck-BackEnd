const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Employee extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      authorizations_id: DataTypes.ARRAY(DataTypes.STRING),
      name: DataTypes.STRING,
      third_company_id:  {
        type: DataTypes.STRING,
        index: true, // Add an index to improve query performance
      },
      visitor_company: DataTypes.STRING,
      role: DataTypes.STRING,
      number: DataTypes.INTEGER,
      blood_type: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      area: DataTypes.STRING,
      last_area_found: DataTypes.STRING,
      last_time_found: DataTypes.DATE,
      is_blocked: DataTypes.BOOLEAN,
      documents_ok: DataTypes.BOOLEAN,
      block_reason: DataTypes.STRING,
      status: DataTypes.STRING,
      user_id: DataTypes.STRING,
      telephone: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Employee',
    });
  }
}

module.exports = Employee;
