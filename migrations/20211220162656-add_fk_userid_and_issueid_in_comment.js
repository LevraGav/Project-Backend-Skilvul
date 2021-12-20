'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('Comments', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_in_comment',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['issue_id'],
      type: 'foreign key',
      name: 'fk_issue_in_comment',
      references: { //Required field
        table: 'Issues',
        field: 'issue_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('Comments', 'fk_user_in_comment', {})
     await queryInterface.removeConstraint('comments', 'fk_issue_in_comment', {})
  }
};
