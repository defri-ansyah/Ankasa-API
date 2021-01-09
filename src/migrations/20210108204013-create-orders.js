'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flight_route_id: {
        type: Sequelize.STRING
      },
      booking_code: {
        type: Sequelize.STRING
      },
      terminal: {
        type: Sequelize.STRING
      },
      gate: {
        type: Sequelize.STRING
      },
      barcode: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      cp_fullname: {
        type: Sequelize.STRING
      },
      cp_email: {
        type: Sequelize.STRING
      },
      cp_phone: {
        type: Sequelize.STRING
      },
      passenger_name: {
        type: Sequelize.STRING
      },
      passenger_nationality: {
        type: Sequelize.STRING
      },
      passenger_desc: {
        type: Sequelize.STRING
      },
      total_passenger: {
        type: Sequelize.INTEGER
      },
      is_insurance: {
        type: Sequelize.BOOLEAN
      },
      total_payment: {
        type: Sequelize.INTEGER
      },
      status_payment: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('orders');
  }
};