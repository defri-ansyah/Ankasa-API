'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orders.init({
    flight_route_id: DataTypes.STRING,
    booking_code: DataTypes.STRING,
    terminal: DataTypes.STRING,
    gate: DataTypes.STRING,
    barcode: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    cp_fullname: DataTypes.STRING,
    cp_email: DataTypes.STRING,
    cp_phone: DataTypes.STRING,
    passenger_name: DataTypes.STRING,
    passenger_nastionality: DataTypes.STRING,
    passenger_desc: DataTypes.STRING,
    total_passenger: DataTypes.INTEGER,
    is_insurance: DataTypes.BOOLEAN,
    total_payment: DataTypes.INTEGER,
    status_payment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};