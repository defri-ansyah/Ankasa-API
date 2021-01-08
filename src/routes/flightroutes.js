const express = require('express');
const router = express.Router()
const {uploadMulter} = require('../middlewares/upload');
const {
    insertFlightRoute,
    deleteFlightRoute,
    getAllDataFlightRoute,
    search
} = require('../controllers/flightroutes');

router
  .get('/', getAllDataFlightRoute)
  .get('/search', search)
  .post('/insert-route', insertFlightRoute)
  .delete('/delete/:id', deleteFlightRoute)
module.exports = router