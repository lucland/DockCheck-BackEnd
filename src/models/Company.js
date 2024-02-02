const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      supervisors: DataTypes.ARRAY(DataTypes.STRING),
      crew: DataTypes.ARRAY(DataTypes.STRING),
      projects: DataTypes.ARRAY(DataTypes.STRING),
      admins: DataTypes.ARRAY(DataTypes.STRING),
      razao_social: DataTypes.STRING,
      cnpj: DataTypes.STRING,
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
