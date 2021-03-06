'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Facilities.belongsTo(models.FlightRoute, {
        foreignKey: 'flightRouteId',
        onDelete: 'CASCADE'
      })
    }
  };
  Facilities.init({
    flightRouteId: DataTypes.INTEGER,
    facility: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Facilities',
  });
  return Facilities;
};