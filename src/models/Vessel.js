const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Vessel extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      company_id: DataTypes.STRING,
      crew_id: DataTypes.ARRAY(DataTypes.STRING),
      onboarded_count: DataTypes.INTEGER,
      areas_id: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Vessel',
    });
  }
  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id' });
  }
  
}

module.exports = Vessel;
