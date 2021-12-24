'use strict';
const data = require('../data/forums.json')

const dataForum = []

data.forEach(forum => {
  const temp = {
    title: forum.title,
    image: forum.image,
    description: forum.description,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  dataForum.push(temp)
})

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
     await queryInterface.bulkInsert('Forums', dataForum, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Forums', null, {});
  }
};
