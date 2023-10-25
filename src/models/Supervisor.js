const { Model, DataTypes } = require('sequelize');

class Supervisor extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      user: DataTypes.STRING,
      password: DataTypes.STRING,
      company_id: DataTypes.STRING,
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      updated_at: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'Supervisor',
    });
  }
}

module.exports = Supervisor;
