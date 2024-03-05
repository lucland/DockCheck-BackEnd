const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Event extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.STRING,
        index: true,
      },
      timestamp:  {
        type: DataTypes.DATE,
        index: true,
      },
      project_id: {
        type: DataTypes.STRING,
        index: true,
      },
      action: DataTypes.INTEGER,
      sensor_id:{
        type: DataTypes.STRING,
        index: true,
      },
      status: DataTypes.STRING,
      beacon_id: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Event',
    });
  }
 /* static associate(models) {
    this.belongsTo(models.Employee, { foreignKey: 'employee_id' });
    this.belongsTo(models.Project, { foreignKey: 'project_id' });
    this.belongsTo(models.Sensor, { foreignKey: 'sensor_id' });
    this.belongsTo(models.Beacon, { foreignKey: 'beacon_id' });
  }
  */
}

module.exports = Event;
