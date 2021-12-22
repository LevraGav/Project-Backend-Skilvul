'use strict';
const data = require('../data/tags.json')

const dataTag = []

data.forEach(tag => {
  const temp = {
    title: tag.title,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  dataTag.push(temp)
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
     await queryInterface.bulkInsert('Tags', dataTag, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Tags', null, {});
  }
};
