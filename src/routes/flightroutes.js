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


router.get('/', getAllDataFlightRoute)
router.get('/search', search)
router.get('/get-by-id/:id', getById)
router.patch('/update/:id', updateFlightRoutes)
router.post('/insert-route', insertFlightRoute)
router.delete('/delete/:id', deleteFlightRoute)
module.exports = router