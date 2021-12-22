'use strict';

const data = require('../data/issues.json')

const dataIssues = []

data.forEach(issue => {
  const temp = {
    title: issue.title,
    summary: issue.summary,
    author_name: issue.author_name,
    image: issue.image,
    likes: issue.likes,
    comments: issue.comments,
    createdAt: new Date(),
    updatedAt: new Date(),
    tag_id: issue.tag_id,
    forum_id: issue.forum_id
  }
  dataIssues.push(temp)
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
     await queryInterface.bulkInsert('Issues', dataIssues, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Issues', null, {});
  }
};
