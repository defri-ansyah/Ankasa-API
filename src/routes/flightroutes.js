const express = require('express');
const router = express.Router()
const {uploadMulter} = require('../middlewares/upload');
const {
    insertFlightRoute,
    deleteFlightRoute,
    getAllDataFlightRoute,
    search,
    updateFlightRoutes,
    getById
} = require('../controllers/flightroutes');

router
  .get('/', getAllDataFlightRoute)
  .get('/search', search)
  .get('/get-by-id/:id', getById)
  .patch('/update/:id', updateFlightRoutes)
  .post('/insert-route', insertFlightRoute)
  .delete('/delete/:id', deleteFlightRoute)
module.exports = router