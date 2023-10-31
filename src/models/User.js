const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      authorizations_id: DataTypes.ARRAY(DataTypes.STRING),
      name: DataTypes.STRING,
      company: DataTypes.STRING,
      role: DataTypes.STRING,
      project: DataTypes.STRING,
      number: DataTypes.INTEGER,
      identidade: DataTypes.STRING,
      cpf: DataTypes.STRING,
      aso: DataTypes.DATE,
      aso_document: DataTypes.STRING,
      has_aso: DataTypes.BOOLEAN,
      nr34: DataTypes.DATE,
      nr34_document: DataTypes.STRING,
      has_nr34: DataTypes.BOOLEAN,
      nr35: DataTypes.DATE,
      nr35_document: DataTypes.STRING,
      has_nr35: DataTypes.BOOLEAN,
      nr33: DataTypes.DATE,
      nr33_document: DataTypes.STRING,
      has_nr33: DataTypes.BOOLEAN,
      nr10: DataTypes.DATE,
      nr10_document: DataTypes.STRING,
      has_nr10: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      area: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      is_visitor: DataTypes.BOOLEAN,
      is_guardian: DataTypes.BOOLEAN,
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
      username: DataTypes.STRING,
      salt: DataTypes.STRING,
      hash: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'User',
    });
  }

  setPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  }

  validPassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  }
}

module.exports = User;
