const Sequelize = require('sequelize');
const sequelize = require('../db/connection')
const Model = Sequelize.Model;

class Product extends Model {}
Product.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryId:{
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING(45)
  },
  image:{
    type: Sequelize.STRING(250)
  },

}, {
  freezeTableName: true,
  tableName: "products",
  sequelize,
  charset: 'utf8mb4',
  timestamps: false,
});
// Remove in production 
Product.sync({
  force: false
});

module.exports = Product