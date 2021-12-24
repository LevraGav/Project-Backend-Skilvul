"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Issues", {
      issue_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(40),
      },
      summary: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      author_name: {
        allowNull: false,
        type: Sequelize.STRING(40),
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      likes: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      comments: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tag_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      forum_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Issues");
  },
};
