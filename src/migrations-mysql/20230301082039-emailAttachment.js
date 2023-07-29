'use strict';

const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('emailattachments', {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email_id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'emails',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    filename:{
      type: Sequelize.STRING,
      allowNull: false
    },
    size:{
      type: Sequelize.INTEGER,
      allowNull: true
    },
    type:{
      type: Sequelize.STRING,
      allowNull: true
    },
    path:{
      type: Sequelize.STRING,
      allowNull: true
    }
  })}

async function down({ context: queryInterface }) {
  // await queryInterface.removeConstraint('emailattachments', 'emailId');
	await queryInterface.dropTable('emailattachments');
}

module.exports = { up, down };
