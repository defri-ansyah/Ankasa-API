const FlightRouter = require('../models').FlightRouter;
const Facilities = require('../models').Facilities;
const createError = require('http-errors')
const response = require('../helpers/response');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const pagination = require('../helpers/pagination');
const { v4: uuidv4 } = require('uuid')

const controllers = {
  insertFlightRoute: (req, res, next) => {
    const {
      flightClass, routeFrom, routeTo, flightDuration, departureTime, timeArrived,
      transit, direct, price, falicity
    } = req.body
    const id = uuidv4()
    FlightRouter.create({
      id, flightClass, routeFrom, routeTo, flightDuration, departureTime, timeArrived, transit,
      direct, airLinesId, price
    })
    .then(() => {
      Facilities.create({

      })
      response(res, 'flightroute has been added', { status: 'success', statusCode:200 }, null )
    }).catch(() => {
      return next(new createError(500, 'Looks like server having trouble'))
    });
  }
}

module.exports = controllers