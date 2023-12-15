const { Model, DataTypes } = require('sequelize');

class Docking extends Model {
  static init(sequelize) {
    super.init({
      onboarded_count: DataTypes.INTEGER,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date_start: DataTypes.DATE,
      date_end: DataTypes.DATE,
      admins: DataTypes.ARRAY(DataTypes.STRING),
      vessel_id: DataTypes.STRING,
      updated_at: DataTypes.DATE,
      draft_meters: DataTypes.DOUBLE,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Docking',
    });
  }
}

module.exports = Docking;
