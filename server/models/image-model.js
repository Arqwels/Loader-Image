const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Image = sequelize.define('image', {
  descriptionFile: {
    type: DataTypes.TEXT
  },
  nameFile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  }
});

module.exports = Image;