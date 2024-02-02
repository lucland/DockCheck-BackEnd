const { Model, DataTypes } = require('sequelize');

class Vessel extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      company_id: DataTypes.STRING,
      onboarded_count: DataTypes.INTEGER,
      areas: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Vessel',
    });
  }
}

module.exports = Vessel;
