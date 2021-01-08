const AirLines = require('../models').AirLines;
const createError = require('http-errors')
const response = require('../helpers/response');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const pagination = require('../helpers/pagination');

const controllers = {
  insertAirLines: (req, res, next) => {
    const { name } = req.body
    if (!name || !req.file) {
      return next(new createError(400, 'Name or Logo cannot be empty'))
    }
    AirLines.create({
      name: name,
      logo: `http://localhost:${process.env.DB_PORT}/images/${req.file.filename}`
    })
    .then(() => {
      response(res, 'airlines has been added', { status: 'success', statusCode:200 }, null )
    }).catch(() => {
      return next(new createError(500, 'Looks like server having trouble'))
    });
  },
  getAllAirLines: async (req, res, next) => {
    const { limit = 4, page = 1, order = "DESC" } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)

    const countData = await AirLines.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'totalData']]
    });
    // pagination
    const setPagination = await pagination(limit, page, "airlines", countData[0].dataValues.totalData)

    AirLines.findAll({
      offset: parseInt(offset), limit: parseInt(limit)
    }, {
      order: [
        ['name', 'DESC']
      ]
    })
    .then((result) => {
      const payload = {
        airlines: result,
        pagination: setPagination
      }
      response(res, payload, { status:'success', statusCode:200 }, null)
    }).catch((err) => {
      console.log('err :>> ', err);
      return next(new createError(500, 'Looks like server having trouble'))
    });
  },
  search: async (req, res, next) => {
    const { name, id } = req.body
     if (name && !id) {
      const result = await AirLines.findAll({
        where: {
          name: {
            [Op.like]: `${name}%`
          },
        }
      })
      if (result) {
        if (result.length > 0) {
          response(res, result, { status:'success', statusCode:200 }, null)
        } else {
          return next(new createError(404, 'Data not found'))
        }
      } else {
        return next(new createError(500, 'Looks like server having trouble'))
      }
    } else if (!name && id) {
      const result = await AirLines.findAll({
        where: {
          id: id,
        }
      })
      if (result) {
        if (result.length > 0) {
          response(res, result, { status:'success', statusCode:200 }, null)
        } else {
          return next(new createError(404, 'Data not found'))
        }
      } else {
        return next(new createError(500, 'Looks like server having trouble'))
      }
    }
  },
  updateAirLines: async (req, res, next) => {
    const { name } = req.body
    const id = req.params.id
    if(!id) {
      return next(new createError(500, 'Id cannot be empty'))
    }
    const checkData = await AirLines.findAll({
      where: {
        id: id
      }
    })
    if (checkData.length === 0) {
      return next(new createError(404, 'Wrong id')) 
    }
    AirLines.update({
      name: name,
    }, {
      where: {
        id: id
      }
    })
    .then(() => {
      response(res, 'airlines has been updated', { status: 'success', statusCode:200 }, null )
    }).catch(() => {
      return next(new createError(500, 'Looks like server having trouble'))
    });
  },
  updateLogo: async (req, res, next) => {
    const id = req.params.id   
    if (!id) {
      return next(new createError(500, 'Id cannot be empty'))
    }
    if (!req.file) {
      return next(new createError(400, 'Sorry logo cannot be empty'))
    }
    const checkData = await AirLines.findAll({
      where: {
        id: id
      }
    })
    if (checkData.length === 0) {
      return next(new createError(404, 'Wrong id')) 
    }

    AirLines.update({
      logo: `http://localhost:${process.env.DB_PORT}/images/${req.file.filename}`,
    }, {
      where: {
        id: id
      }
    })
    .then(() => {
      response(res, 'airlines logo has been updated', { status: 'success', statusCode:200 }, null )
    }).catch(() => {
      return next(new createError(500, 'Looks like server having trouble'))
    });
  },
  deleteAirLines: (req, res, next) => {
    const id = req.params.id   
    if (!id) {
      return next(new createError(400, 'Id cannot be empty'))
    }
    AirLines.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      response(res, 'airlines has been deleted', { status: 'success', statusCode:200 }, null )
    }).catch(() => {
      return next(new createError(500, 'Looks like server having trouble'))
    });
  }
}

module.exports = controllers