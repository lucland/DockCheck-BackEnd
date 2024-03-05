const { Model, DataTypes } = require('sequelize');

class ThirdCompanyAdmin extends Model {
    static init(sequelize) {
      super.init({
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        third_company_id: {
          type: DataTypes.STRING,
          references: { model: 'third_companies', key: 'id' },
        },
        user_id: {
          type: DataTypes.STRING,
          references: { model: 'users', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'ThirdCOmpanyAdmin',
        tableName: 'third_company_admins',
        timestamps: false,
      });
    }
    /*
    static associate(models) {
        this.belongsTo(models.ThirdCompany, { foreignKey: 'third_company_id' });
        this.belongsTo(models.User, { foreignKey: 'user_id' });
      }      
      */
  }

module.exports = ThirdCompanyAdmin;