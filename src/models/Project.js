const { Model, DataTypes } = require('sequelize');

class Project extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
      vessel_id: DataTypes.STRING,
      third_companies: DataTypes.ARRAY(DataTypes.STRING),
      admins_id: DataTypes.ARRAY(DataTypes.STRING),
      areas: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Project',
    });
  }
}

module.exports = Project;
