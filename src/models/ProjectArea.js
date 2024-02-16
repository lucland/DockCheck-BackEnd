const { Model, DataTypes } = require('sequelize');

class ProjectArea extends Model {
    static init(sequelize) {
      super.init({
        project_id: {
          type: DataTypes.STRING,
          references: { model: 'projects', key: 'id' },
        },
        area_id: {
          type: DataTypes.STRING,
          references: { model: 'areas', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'ProjectArea',
        tableName: 'project_areas',
        timestamps: false,
      });
    }
    static associate(models) {
        this.belongsTo(models.Project, { foreignKey: 'project_id' });
        this.belongsTo(models.Area, { foreignKey: 'area_id' });
      }
      
  }

module.exports = ProjectArea;