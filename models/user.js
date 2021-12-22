"use strict";
const req = require("express/lib/request");
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
            args: ["^[^0-9][^[/!@#$_%^&*.]{5,}"],
            msg: "Username must have at least 6 characters, the first letter cannot be a number, and must not contain any symbols(!@#$_%^&*). Example: gre3C0topi4",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: [
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_/!@#$%^&*.])(?=.{8,})",
            ],
            msg: "Password must have at least 8 characters consisting of uppercase and lowercase letters, numbers, symbols(!@#$_%^&*). Example: Gre3c0topi4!",
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
      role_id: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: {
            args: [[1, 2]],
            msg: "You can only select role_id 1 (admin) or 2 (member)",
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
