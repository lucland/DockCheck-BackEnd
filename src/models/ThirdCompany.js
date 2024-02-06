const { Model, DataTypes } = require('sequelize');

class ThirdCompany extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      supervisors: DataTypes.ARRAY(DataTypes.STRING),
      razao_social: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      address: DataTypes.STRING,
      updated_at: DataTypes.DATE,
      is_vessel_company: DataTypes.BOOLEAN,
      telephone: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    }, {
      sequelize,
      modelName: 'ThirdCompany',
    });
  }
}

module.exports = ThirdCompany;
