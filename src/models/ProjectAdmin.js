const { Model, DataTypes } = require('sequelize');

class ProjectAdmin extends Model {
    static init(sequelize) {
      super.init({
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        project_id: {
          type: DataTypes.STRING,
          references: { model: 'projects', key: 'id' },
        },
        user_id: {
          type: DataTypes.STRING,
          references: { model: 'users', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'ProjectAdmin',
        tableName: 'project_admins',
        timestamps: false,
      });
    }
    static associate(models) {
        this.belongsTo(models.Project, { foreignKey: 'project_id' });
        this.belongsTo(models.User, { foreignKey: 'user_id' });
      }
      
  }

module.exports = ProjectAdmin;