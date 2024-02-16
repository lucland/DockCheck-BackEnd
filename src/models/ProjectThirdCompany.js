const { Model, DataTypes } = require('sequelize');

class ProjectThirdCompany extends Model {
    static init(sequelize) {
      super.init({
        project_id: {
          type: DataTypes.STRING,
          references: { model: 'projects', key: 'id' },
        },
        third_company_id: {
          type: DataTypes.STRING,
          references: { model: 'third_companies', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'ProjectThirdCompany',
        tableName: 'project_third_companies',
        timestamps: false,
      });
    }
    static associate(models) {
        this.belongsTo(models.Project, { foreignKey: 'project_id' });
        this.belongsTo(models.ThirdCompany, { foreignKey: 'third_company_id' });
      }
      
  }

module.exports = ProjectThirdCompany;
