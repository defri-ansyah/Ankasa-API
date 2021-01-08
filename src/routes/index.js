const express = require('express')
const router = express.Router()

const airLines = require('./airlines')
const flightroute = require('./flightroutes'); 

router.use('/airlines', airLines)
router.use('/flightroute', flightroute)

module.exports = router