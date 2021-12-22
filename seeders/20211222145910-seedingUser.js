"use strict";
const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullname: "Ananda Raisa",
          email: "anarai@gmail.com",
          username: "anarai123",
          password: hashPassword("Anar4!"),
          avatar: "img1",
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: "Jonathan Leo",
          email: "leo456@gmail.com",
          username: "jojo4567",
          password: hashPassword("j0Jo12&!"),
          avatar: "img3",
          role_id: 2,
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
