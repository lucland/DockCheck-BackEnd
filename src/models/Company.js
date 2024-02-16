const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Company extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      razao_social: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Company',
    });
  }
}

module.exports = Company;
