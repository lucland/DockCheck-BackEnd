const { Model, DataTypes } = require('sequelize');

class ThirdProjectThirdCompany extends Model {
    static init(sequelize) {
      super.init({
        third_project_id: {
          type: DataTypes.STRING,
          references: { model: 'third_projects', key: 'id' },
        },
        third_company_id: {
          type: DataTypes.STRING,
          references: { model: 'third_companies', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'ThirdProjectThirdCompany',
        tableName: 'third_project_third_companies',
        timestamps: false,
      });
    }
  }

module.exports = ThirdProjectThirdCompany;