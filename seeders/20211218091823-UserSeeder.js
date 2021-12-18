"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        fullname: "Ananda Raisa",
        email: "riska123@gmail.com",
        username: "anarai123",
        password: "ananda1234",
        avatar: "img1",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Jonathan Leo",
        email: "leo456@gmail.com",
        username: "Jojo4567",
        password: "jleo4567",
        avatar: "img2",
        role: "member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
