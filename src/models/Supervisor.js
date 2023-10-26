const { Model, DataTypes } = require('sequelize');

class Supervisor extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      username: DataTypes.STRING,  // Changed from 'user'
      salt: DataTypes.STRING,  // Changed from 'password'
      hash: DataTypes.STRING,  // Added 'hash' field
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

  setPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  }

  validPassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  }
}

module.exports = Supervisor;
