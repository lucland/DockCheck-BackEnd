const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Login extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: DataTypes.STRING,
      timestamp: DataTypes.DATE,
      expiration: DataTypes.DATE,
      system: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Login',
    });
  }
  /*
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
  */
}

module.exports = Login;
