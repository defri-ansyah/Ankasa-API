const express = require('express');
const models = require('../models');
const createError = require('http-errors');
const { Sequelize } = require('../models');
const response = require('../helpers/response');
const Op = Sequelize.Op
const moment = require('moment')

const findTicket = (req, res, next) => {
  const { routeFrom, routeTo, flightClass, tripType, tripDate, transit, facilities, departureTime, timeArrived, airline, price, sort } = req.query
  console.log(routeFrom, routeTo, flightClass, tripType, new Date(tripDate))
  const allFilter = {
    routeFrom,
    routeTo,
    flightClass,
    tripType,
    tripDate: new Date(tripDate)
  }

  filterTransit(transit, allFilter);

  const selectedFacility = filterFacility(facilities);

  filterDepartureTime(departureTime, allFilter);

  filterTimeArrived(timeArrived, allFilter);

  const selectedAirlines = filterAirlines(airline);

  filterPrice(price, allFilter);

  //sort by
  const order = sort !== null && sort !== undefined && sort !== '' ? ['price', sort] : ['createdAt', 'DESC']

  //find all
  models.FlightRoute.findAll({
    where: allFilter,
    include: [
      {
        model: models.Facilities,
        as: 'Facilities'
      },
      selectedFacility,
      selectedAirlines
    ],
    order: [order]
  })
    .then((flightroute) => {
      response(res, flightroute, { status: 'success', statusCode: 200 }, null)
    }).catch((err) => {
      console.log(err)
      return next(new createError(500, `Looks like server having trouble`))
    })
}

function filterPrice(price, allFilter) {
  if (price !== null && price !== undefined && price !== '') {
    const priceBetween = price.split(",");
    allFilter.price = {
      [Op.between]: priceBetween
    };
  }
}

function filterAirlines(airline) {
  const selectedAirlines = {
    model: models.AirLines
  };
  if (airline !== null && airline !== undefined && airline !== '') {
    const airlines = airline.split(",");
    let filterAirline = [];
    airlines.forEach((airline) => {
      filterAirline.push(airline);
    });
    selectedAirlines.where = {
      name: {
        [Op.or]: filterAirline
      }
    };
  }
  return selectedAirlines;
}

function filterDepartureTime(departureTime, allFilter) {
  if (departureTime !== null && departureTime !== undefined && departureTime !== '') {
    const departureTimes = departureTime.split(",");
    let filterDepartureTime = [];
    departureTimes.forEach((item) => {
      const times = item.split("-");
      filterDepartureTime.push({ [Op.between]: times });
    });
    allFilter.departureTime = {
      [Op.or]: filterDepartureTime
    };
  }
}

function filterTransit(transit, allFilter) {
  switch (transit) {
    case 'direct':
      allFilter.direct = 1;
      break;
    case 'transit':
      allFilter.transit = 1;
      break;
    case 'transit 2':
      allFilter.transit = { [Op.gte]: 2 };
      break;
    case 'direct 2':
      allFilter.direct = { [Op.gte]: 2 };
      break;
  }
}

function filterTimeArrived(timeArrived, allFilter) {
  if (timeArrived !== null && timeArrived !== undefined && timeArrived !== '') {
    const timeArriveds = timeArrived.split(",");
    let filtertimeArrived = [];
    timeArriveds.forEach((item) => {
      const times = item.split("-");
      filtertimeArrived.push({ [Op.between]: times });
    });
    allFilter.timeArrived = {
      [Op.or]: filtertimeArrived
    };
  }
}

function filterFacility(facilities) {
  const selectedFacility = {
    model: models.Facilities,
    as: 'selected_facility'
  };
  if (facilities !== null && facilities !== undefined && facilities !== '') {
    const facility = facilities.split(",");
    selectedFacility.where = {
      facility
    };
  }
  return selectedFacility;
}

const selectTicket = (req, res, next) => {
  const { flight_route_id, passenger_desc } = req.body

  models.FlightRoute.findOne({
    where: {
      id: flight_route_id
    }
  })
    .then((flightroute) => {
      if (flightroute) {
        let totalPassengers = 0
        passenger_desc.split(new RegExp('child|adult')).forEach((item, i) => {
          if (i < 2) {
            totalPassengers += parseInt(item)
          }
        })
        models.orders.create({
          flight_route_id,
          user_id: req.userId,
          total_payment: totalPassengers * flightroute.dataValues.price,
          status_payment: 'new order',
          total_passenger: totalPassengers
        })
          .then((order) => {
            response(res, { order_id: order.dataValues.id }, { status: 'success', statusCode: 200 }, null)
          }).catch((err) => {
            console.log(err)
            return next(new createError(500, `Looks like server having trouble`))
          })
      } else {
        response(res, null, { status: 'flight Route Id not found', statusCode: 404 }, null)
      }
    }).catch((err) => {
      console.log(err)
      return next(new createError(500, `Looks like server having trouble`))
    })
}

const orderDetail = (req, res, next) => {
  const { order_id } = req.params
  models.orders.findOne({
    where: {
      id: order_id,
      user_id: req.userId
    },
    include: [{
      model: models.FlightRoute,
      as: 'flight_route'
    }]
  })
    .then((order) => {
      if (order !== null) {
        response(res, order, { status: 'success', statusCode: 200 }, null)
      } else {
        response(res, null, { status: 'order not found', statusCode: 404 }, null)
      }
    }).catch((err) => {
      console.log(err)
      return next(new createError(500, `Looks like server having trouble`))
    })
}

const inputFlightDetail = (req, res, next) => {
  const { order_id, cp_fullname, cp_email, cp_phone, passenger_name, passenger_nationality, is_insurance } = req.body
  models.orders.findOne({
    where: {
      id: order_id
    }
  })
    .then((orderInfo) => {
      let totalPayment = orderInfo.dataValues.total_payment
      if (is_insurance == 1) {
        const insurance = 75000 * orderInfo.dataValues.total_passenger
        totalPayment += insurance
      }
      models.orders.update(
        {
          cp_fullname,
          cp_email,
          cp_phone,
          passenger_name,
          passenger_nationality,
          is_insurance,
          status_payment: 'Waiting for payment',
          total_payment: totalPayment
        }, {
        where: {
          id: order_id,
          user_id: req.userId
        }
      })
        .then((order) => {
          console.log(order)
          if (order[0] === 1) {
            response(res, null, { status: 'success', statusCode: 200 }, null)
          } else {
            response(res, null, { status: 'update order failed', statusCode: 404 }, null)
          }
        }).catch((err) => {
          console.log(err)
          return next(new createError(500, `Looks like server having trouble`))
        })
    }).catch((err) => {
      console.log(err)
      return next(new createError(500, `Looks like server having trouble`))
    })

}

const confrimPayment = () => {
  const terminals = ['A', 'B', 'C', 'D', 'E']
  console.log('Start confrim payment background process')
  models.orders.findAll({
    where: {
      status_payment: 'Waiting for payment'
    }
  })
    .then((orders) => {
      orders.forEach((order) => {
        // midtrans cek if midtran success ?
        const isMidtransSuccess = true
        if (isMidtransSuccess) {
        const terminal = terminals[Math.floor(Math.random() * terminals.length)];
        const gate = Math.floor((Math.random() * 200) + 100).toString()
        const bookingCode = `${terminal}-${gate}`
        models.orders.update(
          {
            booking_code: bookingCode,
            terminal,
            gate,
            status_payment: 'Eticket issued'
          }, {
          where: {
            id: order.dataValues.id,
          }
        })
          .then((isSuccess) => {
            console.log(isSuccess)
            if (isSuccess[0] === 1) {
              console.log(`order : ${order.dataValues.id} payment succes`)
            } else {
              console.log(`order : ${order.dataValues.id} payment failed`)
            }
            console.log('Finish confrim payment background process')
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    }).catch((err) => {
      console.log(err)
    })
}

module.exports = { findTicket, selectTicket, orderDetail, inputFlightDetail, confrimPayment }
