const { Model, DataTypes } = require('sequelize');

class Authorization extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      vessel_id: DataTypes.STRING,
      expiration_date: DataTypes.DATE,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Authorization',
    });
  }
}

module.exports = Authorization;
