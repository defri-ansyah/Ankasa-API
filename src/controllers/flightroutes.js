const FlightRoute = require('../models').FlightRoute;
const AirLines = require('../models').AirLines;
const Facilities = require('../models').Facilities;
const createError = require('http-errors')
const response = require('../helpers/response');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const pagination = require('../helpers/pagination');
const { v4: uuidv4 } = require('uuid')

const controllers = {
  insertFlightRoute: async (req, res, next) => {
    const id = uuidv4()

    const {
      flightClass, routeFrom, routeTo, flightDuration, departureTime, timeArrived,
      transit, direct, price, airLinesId, facility
    } = req.body

    const payload = {
      id: id, flightClass: flightClass, routeFrom: routeFrom, routeTo: routeTo, flightDuration:flightDuration,
      departureTime: departureTime, timeArrived: timeArrived, transit: transit,
      direct: direct, airLinesId: airLinesId?parseInt(airLinesId): '', price: price
    }
    // check if payload key contain null/ ""/
    for (let key in payload) {
      if (payload[key] === null || payload[key]=== "") {
        return next(new createError(400, `all flight route information must be filled in`))
      }
    }
    // mapping facility ['meal', 'luggage', 'etc] to array of object [{}]
    const facilityCopy = facility.map(el=> {
      return { flightRouteId: id, facility: el }
    })

    // check if airlinesid is match with data
    const checkAirLines = await AirLines.findAll({ where: { id: airLinesId } })
    if (checkAirLines.length === 0) {
      return next(new createError(404, `Airlines id does not match with airlines data`))
    }

    FlightRoute.create({
      ...payload
    })
    .then(() => {
      // send multiple data
      Facilities.bulkCreate([
        ...facilityCopy
      ])
      .then(() => {
        response(res, 'flightroute & facilities has been added', { status: 'success', statusCode:200 }, null )
      }).catch(() => {
        return next(new createError(500, `Looks like server having trouble`))
      });
    }).catch(() => {
      return next(new createError(500, `Looks like server having trouble`))
    });
  },
  deleteFlightRoute: async (req, res, next) => {
    const id = req.params.id   
    if (!id) {
      return next(new createError(400, 'Id cannot be empty'))
    }
    // check if flightrouteid is match with data
    const checkFlightRouteId = await FlightRoute.findAll({ where: { id: id} })
    if(checkFlightRouteId.length === 0) {
      return next(new createError(404, `flightRouteId id does not match with flightroute data`))
    }

    FlightRoute.destroy({ where: {id: id} })
    .then(() => {
      response(res, 'flightroute has been deleted', { status: 'success', statusCode:200 }, null ) 
    }).catch(() => {
      return next(new createError(500, `Looks like server having trouble`))
    });
  },
  getAllDataFlightRoute: async (req, res, next) => {
    const { limit = 4, page = 1, orderby="price",order = "ASC" } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)
    // check total data
    const countData = await FlightRoute.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'totalData']]
    });
    // pagination
    const setPagination = await pagination(limit, page,orderby,order, "flightroute", countData[0].dataValues.totalData)
    FlightRoute.findAll({
      offset: parseInt(offset), limit: parseInt(limit),
      order: [
        [orderby, order]
      ]
    })
    .then((result) => {
      const payload = {
        flightroute: result,
        pagination: setPagination
      }
      response(res, payload, { status: 'success', statusCode:200 }, null)
    }).catch(() => {
      return next(new createError(500, `Looks like server having trouble`))
    });
  },
  updateFlightRoutes: async(req, res, next) => {
    const {
      flightClass, routeFrom, routeTo, flightDuration, departureTime, timeArrived,
      transit, direct, price, airLinesId, facility
    } = req.body

    const payload = {
      id: id, flightClass: flightClass, routeFrom: routeFrom, routeTo: routeTo, flightDuration:flightDuration,
      departureTime: departureTime, timeArrived: timeArrived, transit: transit,
      direct: direct, airLinesId: airLinesId?parseInt(airLinesId): '', price: price
    }
  },
  search: async(req, res, next) => {
    const { searchby, searchValue } = req.query
    FlightRoute.findAll(
      {
        where: {
          [searchby]: {
            [Op.like]: `${searchValue}%`
          }
        }
      } 
    )
      .then((result) => {
        response(res, result, { status: 'success', statusCode:200 }, null) 
      }).catch((err) => {
        console.log('err :>> ', err);
        return next(new createError(500, `Looks like server having trouble`))
      })
  }
}

module.exports = controllers