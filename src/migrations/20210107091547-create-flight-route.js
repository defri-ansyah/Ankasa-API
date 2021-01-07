'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FlightRoutes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightClass: {
        type: Sequelize.STRING,
        allowNull: false
      },
      routeFrom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      routeTo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      flightDuration: {
        allowNull: false,
        type: Sequelize.TIME
      },
      departureTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      timeArrived: {
        allowNull: false,
        type: Sequelize.TIME
      },
      transit: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      direct: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      airLinesId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'AirLines',
          key: 'id'
        }
      },
      price: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FlightRoutes');
  }
};