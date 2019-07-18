const Sequelize = require('sequelize');
const sequelize = require('../db/connection')
const Model = Sequelize.Model;

class User extends Model {}
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING(45)
  },
  password: {
    type: Sequelize.STRING(45)
  },
  name: {
    type: Sequelize.STRING(45)
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  image:{
    type: Sequelize.STRING(250)
  }
}, {
  freezeTableName: true,
  tableName: "users",
  sequelize,
  timestamps: false,
});
// Remove in production 
User.sync({
  force: false
});

module.exports = User