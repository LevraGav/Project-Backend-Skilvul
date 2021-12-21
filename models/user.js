"use strict";
const { Model } = require("sequelize");
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
            msg: "Invalid Format Email. Example: foo@bar.com",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^\S+$/,
            msg: `Username can't contain whitespace`,
          },
          notEmpty: {
            msg: `Username can't be empty`,
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
            msg: "Password minimal 8 karater terdiri dari huruf besar dan kecil, angka, simbol(!@#$%^&*)",
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
