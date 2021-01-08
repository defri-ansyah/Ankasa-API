const express = require('express');
const router = express.Router()
const {uploadMulter} = require('../middlewares/upload');
const {
    insertFlightRoute,
    deleteFlightRoute
} = require('../controllers/flightroutes');

router
  .post('/insert-route', insertFlightRoute)
  .delete('/delete/:id', deleteFlightRoute)
module.exports = router