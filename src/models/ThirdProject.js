const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ThirdProject extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      status: DataTypes.STRING,
      third_company_id: DataTypes.STRING,
      project_id: DataTypes.STRING,
      allowed_areas_id: DataTypes.ARRAY(DataTypes.STRING),
      employees_id: DataTypes.ARRAY(DataTypes.STRING),
      is_docking: DataTypes.BOOLEAN,
    }, {
      sequelize,
      modelName: 'ThirdProject',
    });
  }
}

module.exports = ThirdProject;
