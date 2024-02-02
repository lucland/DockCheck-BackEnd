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
      blood_type: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      is_blocked: DataTypes.BOOLEAN,
      block_reason: DataTypes.STRING,
      username: DataTypes.STRING,
      salt: DataTypes.STRING,
      hash: DataTypes.STRING,
      status: DataTypes.STRING,
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
