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
     await queryInterface.bulkInsert("Messages", [
      {
        context: "Halo saya Devi, menurut saya akan lebih baik jika issue dibuat lebih banyak karena platform forum ini sangat menarik",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        context: "This website is amazing, i like it! thank you for making this website!",
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Messages", null, {});
  }
};
