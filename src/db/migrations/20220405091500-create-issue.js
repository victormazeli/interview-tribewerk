'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Issues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userEmail: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.TEXT
      },
      statement: {
        type: Sequelize.TEXT
      },
      assignedTo: {
        type: Sequelize.INTEGER
      },
      issueNo: {
        type: Sequelize.STRING
      },
      status: {
        type:   Sequelize.ENUM,
        values: ['resolved', 'unresolved'],
        defaultValue: 'unresolved'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Issues');
  }
};