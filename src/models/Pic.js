const { Model, DataTypes } = require('sequelize');

class Pic extends Model {
    static init(sequelize) {
    super.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        employee_id: DataTypes.STRING,
        base_64: DataTypes.TEXT,
        doc_path: DataTypes.STRING,
        }, {
      sequelize,
      modelName: 'Pic',
    });
  }
}

module.exports = Pic;
