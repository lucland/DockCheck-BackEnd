const { Model, DataTypes } = require('sequelize');

class VesselArea extends Model {
    static init(sequelize) {
      super.init({
        vessel_id: {
          type: DataTypes.STRING,
          references: { model: 'vessels', key: 'id' },
        },
        area_id: {
          type: DataTypes.STRING,
          references: { model: 'areas', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'VesselArea',
        tableName: 'vessel_area',
        timestamps: false,
      });
    }
    static associate(models) {
        this.belongsTo(models.Vessel, { foreignKey: 'vessel_id' });
        this.belongsTo(models.Area, { foreignKey: 'area_id' });
      }
      
  }

  
module.exports = VesselArea;