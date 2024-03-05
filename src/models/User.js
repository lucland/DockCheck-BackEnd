const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      company_id: DataTypes.STRING,
      role: DataTypes.STRING,
      number: DataTypes.INTEGER,
      blood_type: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      is_blocked: DataTypes.BOOLEAN,
      block_reason: DataTypes.STRING,
      can_create: DataTypes.BOOLEAN,
      username: DataTypes.STRING,
      salt: DataTypes.STRING,
      hash: DataTypes.STRING,
      status: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'User',
    });
  }
  /*
  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id' });
  }  
*/
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
