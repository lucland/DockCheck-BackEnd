const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Document extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      type: DataTypes.STRING,
      expiration_date: DataTypes.DATE,
      path: DataTypes.STRING,
      employee_id: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Document',
    });
  }
  /*
  static associate(models) {
    this.belongsTo(models.Employee, { foreignKey: 'employee_id' });
  }
  */
}

module.exports = Document;
