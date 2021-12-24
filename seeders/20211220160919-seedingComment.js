'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert("Comments", [
      {
        context: "Issue ini sangat menarik",
        createdAt: new Date(),
        updatedAt: new Date(),
        rep_comments: null,
        user_id: 1,
        issue_id: 1
      },
      {
        context: "Hal seperti ini harus didukung agar bumi kita menjadi lebih baik",
        createdAt: new Date(),
        updatedAt: new Date(),
        rep_comments: null,
        user_id: 2,
        issue_id: 3
      },
      {
        context: "Apa yang bisa kita lakukan untuk beraksi supaya issue ini tidak semakin parah?",
        createdAt: new Date(),
        updatedAt: new Date(),
        rep_comments: null,
        user_id: 1,
        issue_id: 2
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete("Comments", null, {});
  }
};
