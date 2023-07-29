'use strict';

const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
 
  await queryInterface.createTable('emailrecipients', {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
    // recipienttype:{
    //   type: Sequelize.ENUM,
    //   values: ['from', 'to', 'bcc','cc'],
    //   allowNull: false,
    //   defaultValue: 'from',
    //   field: 'recipient_type'
    // } 
  })
  await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_recipient_type";`);
  await queryInterface.sequelize.query(`CREATE TYPE \"enum_recipient_type\" AS ENUM('from', 'to', 'bcc','cc');`);
  await queryInterface.sequelize.query( 'ALTER TABLE "emailrecipients" ADD COLUMN "recipienttype" "enum_recipient_type";');
}
async function down({ context: queryInterface }) {
  // await queryInterface.removeConstraint('emailrecipients', 'emailId');
	await queryInterface.dropTable('emailrecipients');
}

module.exports = { up, down };
