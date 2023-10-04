'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Lodging, { foreignKey: 'authorId' })
      User.hasMany(models.Bookmark, { foreignKey: 'authorId' })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'this email has been used'
      },
      validate: {
        notNull: {
          msg: 'email cannot be null'
        },
        notEmpty: {
          msg: 'email cannot be empty'
        },
        isEmail: {
          msg: 'email must be in email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be null'
        },
        notEmpty: {
          msg: 'password cannot be empty'
        },
        min5Char() {
          if(this.password.length < 5) {
            throw new Error(`Minimum Password's Length is 5 Character`);
          }
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })


  return User;
};