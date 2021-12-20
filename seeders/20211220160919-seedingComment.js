'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert("Comments", [
      {
        context: "Issue ini sangat menarik",
        createdAt: new Date(),
        updatedAt: new Date(),
        rep_comments: {
          "uuid": '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          "context": "Setuju",
          "author": 2,
          "depends_on": 1
        },
        user_id: 1,
        issue_id: 1
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Comments", null, {});
  }
};
