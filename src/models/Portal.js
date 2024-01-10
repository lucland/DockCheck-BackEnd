const { Model, DataTypes } = require('sequelize');

class Portal extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      vessel_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      onboard_count: DataTypes.INTEGER,
      last_event: DataTypes.DATE,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Portal',
    });
  }
}

module.exports = Portal;
