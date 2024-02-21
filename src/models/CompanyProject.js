const { Model, DataTypes } = require('sequelize');

class CompanyProject extends Model {
    static init(sequelize) {
      super.init({
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        company_id: {
          type: DataTypes.STRING,
          references: { model: 'companies', key: 'id' },
        },
        project_id: {
          type: DataTypes.STRING,
          references: { model: 'projects', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'CompanyProject',
        tableName: 'company_projects',
        timestamps: false,
      });
    }
    static associate(models) {
        this.belongsTo(models.Company, { foreignKey: 'company_id' });
        this.belongsTo(models.Project, { foreignKey: 'project_id' });
      }      
  }

module.exports = CompanyProject;