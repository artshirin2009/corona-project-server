const Sequelize = require('sequelize');
const sequelize = require('../db/connection')
const Model = Sequelize.Model;

class CourseCategory extends Model {}
CourseCategory.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(45)
  },
  image:{
    type: Sequelize.STRING(250)
  }
}, {
  freezeTableName: true,
  tableName: "categories-of-courses",
  sequelize,
  charset: 'utf8mb4',
  timestamps: false,
});
// Remove in production 
CourseCategory.sync({
  force: false
});

module.exports = CourseCategory