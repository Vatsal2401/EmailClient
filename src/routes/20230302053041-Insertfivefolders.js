'use strict';

// const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('emailFolders', [
    {
      id:1,
      name: 'Inbox',
      userId: 1,
      providerId: 1,
    },
    {
      id:2,
      name: 'Sent',
      userId: 1,
      providerId: 2,
    },
    {
      id:3,
      name: 'Archived',
      userId: 1,
      providerId: 3,
    },
    {
      id:4,
      name: 'Outbox',
      userId: 1,
      providerId: 4,
    },
    {
      id:5,
      name: 'Trash',
      userId: 1,
      providerId: 5,
    }
  ], {});
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('users', null, {});
}

module.exports = { up, down };