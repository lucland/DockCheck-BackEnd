const { Model, DataTypes } = require('sequelize');

class Pic extends Model {
    static init(sequelize) {
    super.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        user_id: DataTypes.STRING,
        picture: DataTypes.TEXT,
        }, {
      sequelize,
      modelName: 'Pic',
    });
  }
}

module.exports = Pic;
