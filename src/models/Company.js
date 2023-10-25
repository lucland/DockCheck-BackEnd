const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      supervisors: DataTypes.ARRAY(DataTypes.STRING),
      vessels: DataTypes.ARRAY(DataTypes.STRING),
      updated_at: DataTypes.DATE,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      expiration_date: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'Company',
    });
  }
}

module.exports = Company;
