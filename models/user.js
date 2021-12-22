"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        targetKey: "role_id",
      });
    }
  }
  User.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fullname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email address format! Example: greecotopia@email.com",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: ["^[^0-9][^/_!@#$%^&*.]{5,}"],
            msg: "Username must have at least 6 characters, the first letter cannot be a number, and must not contain any symbols",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: [
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[/!@#$%^&*.])(?=.{8,})",
            ],
            msg: "Password must have at least 8 characters consisting of uppercase and lowercase letters, numbers, symbols(!@#$%^&*)",
          },
        },
      },
      avatar: {
        type: DataTypes.ENUM("img1", "img2", "img3"),
        validate: {
          isIn: {
            args: [["img1", "img2", "img3"]],
            msg: "You can only select avatar 'img1', 'img2', 'img3'",
          },
        },
      },
      role_id: DataTypes.INTEGER,
      role_id: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: {
            args: [[1, 2]],
            msg: "'role_id' must be 1 (admin) or 2 (member)",
          },
          notEmpty: {
            msg: "Role can't be empty",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(model) {
          model.password = hashPassword(model.password);
          if (!model.avatar) {
            model.avatar = "img1";
          }
          if (!model.role_id) {
            model.role_id = 2;
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
