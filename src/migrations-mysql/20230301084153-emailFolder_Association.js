'use strict';

const { Sequelize } = require('sequelize');
async function up({ context: queryInterface }) {
  await queryInterface.createTable('emailfolder_association', {
    folder_id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'emailfolders',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    }
  })
  await queryInterface.addConstraint('emailfolder_association', {
    type: 'primary key',
    name: 'emailfolder_association_pk',
    fields: ['email_id', 'folder_id'],
  });
}

async function down({ context: queryInterface }) {
  // await queryInterface.removeConstraint('emailfolder_association', 'folderId');
  // await queryInterface.removeConstraint('emailfolder_association', 'emailId');
  // await queryInterface.removeConstraint('emailfolder_association', 'emailfolder_association_pk');
	await queryInterface.dropTable('emailfolder_association');
}

module.exports = { up, down };
