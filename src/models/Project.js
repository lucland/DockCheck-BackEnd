const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Project extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
      vessel_id: DataTypes.STRING,
      company_id: DataTypes.STRING,
      third_companies_id: DataTypes.ARRAY(DataTypes.STRING),
      admins_id: DataTypes.ARRAY(DataTypes.STRING),
      areas_id: DataTypes.ARRAY(DataTypes.STRING),
      is_docking: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Project',
    });
  }
}

module.exports = Project;
