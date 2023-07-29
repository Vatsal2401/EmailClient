'use strict';

const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('emailfolders', {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
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
    provider_id:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    next_page_token:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    priority:{
      type:sequelize.INTEGER,
      allowNull:true,
      defaultValue: 1,
    }
  })
  await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_sync_status_type";`);
  await queryInterface.sequelize.query(`CREATE TYPE \"enum_sync_status_type\" AS ENUM('stand_by', 'fetching', 'fetched');`);
  await queryInterface.sequelize.query( 'ALTER TABLE "emailfolders" ADD COLUMN "sync_status" "enum_sync_status_type";');
}

async function down({ context: queryInterface }) {
  // await queryInterface.removeConstraint('emailfolders', 'userId');
	await queryInterface.dropTable('emailfolders');
}

module.exports = { up, down };
