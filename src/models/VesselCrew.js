const { Model, DataTypes } = require('sequelize');

class VesselCrew extends Model {
    static init(sequelize) {
      super.init({
        vessel_id: {
          type: DataTypes.STRING,
          references: { model: 'vessels', key: 'id' },
        },
        employee_id: {
          type: DataTypes.STRING,
          references: { model: 'employees', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'VesselCrew',
        tableName: 'vessel_crew',
        timestamps: false,
      });
    }
    static associate(models) {
        this.belongsTo(models.Vessel, { foreignKey: 'vessel_id' });
        this.belongsTo(models.Employee, { foreignKey: 'employee_id' });
      }      
  }

  
module.exports = VesselCrew;