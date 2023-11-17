'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        let plainPassword = user.password
        const hashedPassword = bcrypt.hashSync(plainPassword, salt)
        user.password = hashedPassword
      },
      beforeUpdate: (user, options) => {
        let plainPassword = user.password
        const hashedPassword = bcrypt.hashSync(plainPassword, salt)
        user.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};