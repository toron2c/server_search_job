'use strict';
module.exports = {
  async up( queryInterface, Sequelize ) {

    // user
    await queryInterface.createTable( 'user', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      user_login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      user_password: {
        type: Sequelize.STRING,
        allowNULL: false,
        unique: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );

    //company
    await queryInterface.createTable( 'company', {
      company_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      company_login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      company_password: {
        type: Sequelize.STRING,
        allowNULL: false,
        unique: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );

    //vacancy
    await queryInterface.createTable( 'vacancy', {
      vacancy_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        reference: {
          model: 'company',
          key: 'company_id'
        }
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    } );

    await queryInterface.createTable( 'tag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNULL: false,
        unique: true,
      },
    } );
  },
  async down( queryInterface, Sequelize ) {
    await queryInterface.dropAllTables();
  }
};