'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('posts', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      //foreign key 
      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
        references: {
            model: 'posts',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      content: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      owner_email: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
      },
      comment_counter: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      like_counter: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dislike_counter: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    
     queryInterface.dropTable('posts')
  }
};
