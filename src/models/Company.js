const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      crew_id: DataTypes.ARRAY(DataTypes.STRING),
      projects_id: DataTypes.ARRAY(DataTypes.STRING),
      admins_id: DataTypes.ARRAY(DataTypes.STRING),
      razao_social: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      address: DataTypes.STRING,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    }, {
      sequelize,
      modelName: 'Company',
    });
  }
}

module.exports = Company;
