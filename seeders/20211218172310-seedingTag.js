"use strict";
const data = require("../data/tags.json");

const dataTag = [];

data.forEach((tag) => {
  const temp = {
    title: tag.title,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  dataTag.push(temp);
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tags", dataTag, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
