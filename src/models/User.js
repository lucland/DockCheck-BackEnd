const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      vessel_id: DataTypes.STRING,
      name: DataTypes.STRING,
      company: DataTypes.STRING,
      role: DataTypes.STRING,
      project: DataTypes.STRING,
      number: DataTypes.INTEGER,
      identidade: DataTypes.STRING,
      cpf: DataTypes.STRING,
      aso: DataTypes.DATE,
      aso_document: DataTypes.STRING,
      nr34: DataTypes.DATE,
      nr34_document: DataTypes.STRING,
      nr35: DataTypes.DATE,
      nr35_document: DataTypes.STRING,
      nr33: DataTypes.DATE,
      nr33_document: DataTypes.STRING,
      email: DataTypes.STRING,
      area: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      is_visitor: DataTypes.BOOLEAN,
      is_blocked: DataTypes.BOOLEAN,
      block_reason: DataTypes.STRING,
      rfid: DataTypes.STRING,
      picture: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      events: DataTypes.ARRAY(DataTypes.STRING),
      type_job: DataTypes.STRING,
      start_job: DataTypes.DATE,
      end_job: DataTypes.DATE,
      user: DataTypes.STRING,
      password : DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'User',
    });
  }
}

module.exports = User;
