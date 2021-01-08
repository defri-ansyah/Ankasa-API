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
      FlightRoute.hasMany(models.Facilities, {
        foreignKey: 'flightRouteId',
        as: 'selected_facility'
      })
    }
  };
  FlightRoute.init({
    flightClass: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    routeFrom: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    routeTo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    transit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    direct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: false
    },
    flightDuration: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: false
    },
    departureTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: false
    },
    timeArrived: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'FlightRoute',
  });
  return FlightRoute;
};