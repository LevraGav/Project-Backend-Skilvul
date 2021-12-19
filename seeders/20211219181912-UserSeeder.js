"use strict";
const { hashPassword } = require("../helpers/bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullname: "Ananda Raisa",
          email: "riska123@gmail.com",
          username: "anarai123",
          password: hashPassword("65423"),
          avatar: "img1",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: "Jonathan Leo",
          email: "leo456@gmail.com",
          username: "Jojo4567",
          password: hashPassword("85742"),
          avatar: "img3",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
