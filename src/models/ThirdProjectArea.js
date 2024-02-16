const { Model, DataTypes } = require('sequelize');

class ThirdProjectArea extends Model {
    static init(sequelize) {
      super.init({
        third_project_id: {
          type: DataTypes.STRING,
          references: { model: 'third_projects', key: 'id' },
        },
        area_id: {
          type: DataTypes.STRING,
          references: { model: 'areas', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'ThirdProjectArea',
        tableName: 'third_project_areas',
        timestamps: false,
      });
    }
    static associate(models) {
        this.belongsTo(models.ThirdProject, { foreignKey: 'third_project_id' });
        this.belongsTo(models.Area, { foreignKey: 'area_id' });
      }
      
  }

module.exports = ThirdProjectArea;