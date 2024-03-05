const { Model, DataTypes } = require('sequelize');

class Invite extends Model {
    static init(sequelize) {
      super.init({
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        email: DataTypes.STRING,
        accepted: DataTypes.BOOLEAN,
        sent: DataTypes.BOOLEAN,
        thirdCompanyName: DataTypes.STRING,
        dateSent: DataTypes.DATE,
        viewed: DataTypes.BOOLEAN,
      }, {
        sequelize,
        modelName: 'Invite',
      });
    }
}

module.exports = Invite;