const { Model, DataTypes } = require('sequelize');

class Login extends Model {
  static init(sequelize) {
    super.init({
      user_id: DataTypes.STRING,
      timestamp: DataTypes.DATE,
      expiration: DataTypes.DATE,
      system: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Login',
    });
  }
}

module.exports = Login;
