const { Model, DataTypes } = require('sequelize');

class CompanyAdmin extends Model {
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
        user_id: {
          type: DataTypes.STRING,
          references: { model: 'users', key: 'id' },
        },
      }, {
        sequelize,
        modelName: 'CompanyAdmin',
        tableName: 'company_admins',
        timestamps: false,
      });
    }
    static associate(models) {
        this.belongsTo(models.Company, { foreignKey: 'company_id' });
        this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
      
}

module.exports = CompanyAdmin;