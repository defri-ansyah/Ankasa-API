const express = require('express');
const models = require('../models');
const response = require('../helpers/response');
const { Sequelize } = require('../models');
const Op = Sequelize.Op

const getCity = (req, res, next) => {
  const { city } = req.query
  const filter = {
    include: [{
      model: models.countries,
      as: 'country'
    }]
  }
  if (city !== undefined) {
    filter.where = {
      city_name: {
        [Op.like]: `%${city}%`
      }
    }
  }
  models.cities.findAll({
    filter
  })
  .then((city) => {
    response(res, city, { status: 'success', statusCode: 200 }, null)
  }).catch((err) => {
    console.log(err)
    return next(new createError(500, `Looks like server having trouble`))
  })
}

module.exports = { getCity }