const { Model, DataTypes } = require('sequelize');

class Receptor extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      beacons: DataTypes.ARRAY(DataTypes.STRING),
      vessel: DataTypes.STRING,
      updated_at: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'Receptor',
    });
  }
}

module.exports = Receptor;
