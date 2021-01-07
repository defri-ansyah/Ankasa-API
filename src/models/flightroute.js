'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FlightRoute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FlightRoute.belongsTo(models.AirLines, {
        foreignKey: 'airLinesId',
        onDelete: 'CASCADE'
      })
      FlightRoute.hasMany(models.Facilities, {
        foreignKey: 'flightRouteId',
        as: 'Facilities'
      })
    }
  };
  FlightRoute.init({
    transit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FlightRoute',
  });
  return FlightRoute;
};