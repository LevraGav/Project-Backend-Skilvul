"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Favorite_Issues", {
      fields: ["issue_id"],
      type: "foreign key",
      name: "fk_issue_in_favoriteissue",
      references: {
        //Required field
        table: "Issues",
        field: "issue_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      "Favorite_Issues",
      "fk_issue_in_favoriteissue",
      {}
    );
  },
};
