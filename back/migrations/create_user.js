'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        pseudo: {
          allowNull: false,
          type: Sequelize.STRING,
          unique:true
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique:true
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        image_url: {
          allowNull: true,
          type: Sequelize.STRING
        },
        biography: {
          allowNull: true,
          type: Sequelize.TEXT
        },
        is_admin: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Users');
    }
  };