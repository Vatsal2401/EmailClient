'use strict';

const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('emails', {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body_text:{
      type: Sequelize.TEXT,
      allowNull: true
    },
    body_html:{
      type: Sequelize.TEXT,
      allowNull: true
    },
    subject:{
      type: Sequelize.STRING,
      allowNull: false
    },
    thread_id:{
      type: Sequelize.STRING,
      allowNull: false
    },
    in_reply_to:{
      type: Sequelize.STRING
      // allowNull: true
    },
    created_at:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
    is_read:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    is_trashed:{
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
     },
     is_archive:{
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
     },
    message_id:{
      type: Sequelize.STRING,
      allowNull: false
    },
    is_scheduled:{
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
  },
    snippet:{
    type: Sequelize.STRING,
    allowNull: false,
}  
  })}

async function down({ context: queryInterface }) {
  // await queryInterface.removeConstraint('emails', 'userId');
	await queryInterface.dropTable('emails');
}

module.exports = { up, down };

// CREATE TABLE email(
//   id INTEGER PRIMARY KEY AUTO_INCREMENT,
//   sender_id INTEGER NOT NULL,
//   subject VARCHAR(255) NOT NULL,
//   body TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   thread_id INTEGER,
//   is_read BOOLEAN NOT NULL DEFAULT 0,
//   imid VARCHAR(255),
//   FOREIGN KEY (sender_id) REFERENCES users(id),
// );