const { Model, DataTypes } = require('sequelize');

class ThirdProject extends Model {
  static init(sequelize) {
    super.init({
      onboarded_count: DataTypes.INTEGER,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      status: DataTypes.STRING,
      third_company_id: DataTypes.STRING,
      project_id: DataTypes.STRING,
      allowed_areas_id: DataTypes.ARRAY(DataTypes.STRING),
      employees_id: DataTypes.ARRAY(DataTypes.STRING),
    }, {
      sequelize,
      modelName: 'ThirdProject',
    });
  }
}

module.exports = ThirdProject;
