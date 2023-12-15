const { Model, DataTypes } = require('sequelize');

class Vessel extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      company_id: DataTypes.STRING,
      updated_at: DataTypes.DATE,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      admins: DataTypes.ARRAY(DataTypes.STRING),
      onboarded_count: DataTypes.INTEGER,
      portals: DataTypes.ARRAY(DataTypes.STRING),
      onboarded_users: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Vessel',
    });
  }
}

module.exports = Vessel;
