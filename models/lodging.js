'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lodging.belongsTo(models.User, { foreignKey: 'authorId' })
      Lodging.belongsTo(models.Type, { foreignKey: 'typeId' })
      Lodging.hasMany(models.Bookmark, { foreignKey: 'lodgingId' })
    }
  }
  Lodging.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name cannot be null'
        },
        notEmpty: {
          msg: 'name cannot be empty'
        }
      }
    },
    facility: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'facility cannot be null'
        },
        notEmpty: {
          msg: 'facility cannot be empty'
        }
      }
    },
    roomCapacity:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'room capacity cannot be null'
        },
        notEmpty: {
          msg: 'room capacity cannot be empty'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image cannot be null'
        },
        notEmpty: {
          msg: 'image cannot be empty'
        },
        isUrl: {
          args: true,
          msg: 'image must be in Url format'
        }
      }
    },
    authorId: DataTypes.INTEGER,
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'location cannot be null'
        },
        notEmpty: {
          msg: 'location cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price cannot be null'
        },
        notEmpty: {
          msg: 'price cannot be empty'
        },
        min: {
          args: 50000,
          msg: 'Minimum price is Rp. 75,000'
        }
      }
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'typeId cannot be null'
        },
        notEmpty: {
          msg: 'typeId cannot be empty'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lodging',
  });
  return Lodging;
};