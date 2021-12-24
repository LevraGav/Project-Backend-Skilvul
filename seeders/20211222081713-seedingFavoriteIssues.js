"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Favorite_Issues", [
      {
        user_id: 1,
        issue_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        issue_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        issue_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        issue_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Favorite_Issues", null, {});
  },
};
