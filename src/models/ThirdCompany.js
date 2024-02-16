const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ThirdCompany extends Model {
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
      is_vessel_company: DataTypes.BOOLEAN,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'ThirdCompany',
    });
  }
}

module.exports = ThirdCompany;
