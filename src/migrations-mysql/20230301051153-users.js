'use strict';

const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue:Sequelize.literal('gen_random_uuid()')
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    access_token:{
      type: Sequelize.STRING,
      allowNull: true
    },
    refresh_token:{
      type: Sequelize.STRING,
      allowNull: true
    },
   access_token_expiry_date:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    picture:{
      type: Sequelize.STRING,
      allowNull: true
    },
    email:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    locale:{
      type: Sequelize.STRING,
      allowNull: true
    }
  })}

async function down({ context: queryInterface }) {
	await queryInterface.dropTable('users');
}

module.exports = { up, down };