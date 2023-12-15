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
      camera_status: DataTypes.INTEGER,
      camera_ip: DataTypes.STRING,
      rfid_status: DataTypes.INTEGER,
      rfid_ip: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Portal',
    });
  }
}

module.exports = Portal;
