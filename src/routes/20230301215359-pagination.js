'use strict';

const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('pagination', {
    folder_name:{
      type: Sequelize.STRING,
      allowNull: false
    },
    user_id:{
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    next_page_token:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        allowNull:false,
      },
  
  })
  await queryInterface.addConstraint('pagination', {
    type: 'primary key',
    name: 'pagination_pk',
    fields: ['user_id', 'folder_name'],
  });
}

async function down({ context: queryInterface }) {
  // await queryInterface.removeConstraint('emailfolders', 'userId');
	await queryInterface.dropTable('pagination');
}

module.exports = { up, down };
