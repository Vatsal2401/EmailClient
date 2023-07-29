'use strict';

// const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  return queryInterface.addIndex('users', ['email']);
}

async function down({ context: queryInterface }) {
	return queryInterface.removeIndex('users', ['email']);
}

module.exports = { up, down };