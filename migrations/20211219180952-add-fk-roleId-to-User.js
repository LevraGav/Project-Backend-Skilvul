"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Users", {
      fields: ["roleId"],
      type: "foreign key",
      name: "fk_roleId_in_Users",
      references: {
        //Required field
        table: "Roles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Users", "fk_roleId_in_Users", {});
  },
};
