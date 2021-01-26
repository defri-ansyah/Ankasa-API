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
      transit, direct, price, airLinesId, facility, tripType, tripDate
    } = req.body

    const payload = {
      id: id, flightClass: flightClass, routeFrom: routeFrom, routeTo: routeTo, flightDuration:flightDuration,
      departureTime: departureTime, timeArrived: timeArrived, transit: transit,
      direct: direct, airLinesId: airLinesId?parseInt(airLinesId): '', price: price, tripType: tripType,
      tripDate: tripDate
    }
    // check if payload key contain null/ ""/
    for (let key in payload) {
      if (payload[key] === null || payload[key]=== "") {
        return next(new createError(400, `all flight route information must be filled in`))
      }
    }
    if (payload.tripType!=='one way' && payload.tripType !== 'round trip') {
      return next(new createError(404, `Invalid trip type`))  
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
      ],
      include: [{
        model: Facilities,
        required: true,
        as: 'Facilities'
      },
    {
      model: AirLines,
    }]
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
    const id = req.params.id   
    if (!id) {
      return next(new createError(400, 'Id cannot be empty'))
    }

    const {
      flightClass, routeFrom, routeTo, flightDuration, departureTime, timeArrived,
      transit, direct, price, airLinesId, facility = [], tripType, tripDate
    } = req.body

    const payload = {
      flightClass: flightClass, routeFrom: routeFrom, routeTo: routeTo, flightDuration:flightDuration,
      departureTime: departureTime, timeArrived: timeArrived, transit: transit,
      direct: direct, airLinesId: airLinesId?parseInt(airLinesId): '', price: price, tripType: tripType,
      tripDate: tripDate
    }
    // check if payload key contain null/ ""/
    for (let key in payload) {
      if (payload[key] === null || payload[key]=== "") {
        delete payload[key]
      }
    }
    FlightRoute.update(
      {
        ...payload
      },
      {
        where: {
          id: id
        }
      }
    )
    .then(async () => {
      const result = await Facilities.findAll({ where: { flightRouteId: id}, raw: true })
        console.log('result :>> ', result);
        const dataDelete = result.filter(value=> !facility.includes(value.facility))
        if (dataDelete.length > 0) {
          dataDelete.forEach(async(el)=> {
            await Facilities.destroy({ where: { id: el.id } })
          })
        }
      const dataUpdate = facility.forEach(async(el) => {
        const facilityCheck = await Facilities.findOne({where: { facility: {[Op.eq]: el}, flightRouteId: id}, raw: true })
          if (!facilityCheck) {
              // Item not found, create a new one
             await Facilities.create({flightRouteId:id, facility:el})
          }
          return el
      })

      response(res, 'flight route has been updated', { status: 'success', statusCode: 200 }, null)
    }).catch((err) => {
      console.log(' err :>> ', err);
      return next(new createError(500, 'Looks like server having trouble'))
    });
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
      }).catch(() => {
        return next(new createError(500, `Looks like server having trouble`))
      })
  },
  getById: async(req, res, next) => {
    const id = req.params.id   
    if (!id) {
      return next(new createError(400, 'Id cannot be empty'))
    }
    FlightRoute.findOne(
      {
        include: [{
          model: Facilities,
          required: true,
          where: {
            flightRouteId: id
          },
          as: 'Facilities'
        }],
        where: {
          id: id
        }
      }
    ).then((result) => {
      response(res, result, { status: 'success', statusCode:200 }, null)   
    }).catch((err) => {
      console.log('err :>> ', err);
      return next(new createError(500, 'Looks like server having trouble'))
    });
  },
  amountFlightRoute: async (req, res, next) => {
    FlightRoute.count()
    .then((result) => {
      console.log('result', result)
      res.json(result)
    }).catch((err) => {
      res.json(err)
    });
  }
}

module.exports = controllers