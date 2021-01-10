'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FlightRoutes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
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
      tripType: {
        allowNull: false,
        type: Sequelize.ENUM('one way', 'round trip')
      },
      tripDate: {
        allowNull: false,
        type: Sequelize.DATE
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
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('flightroutes');
  }
};