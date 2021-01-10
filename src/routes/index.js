const express = require('express')
const router = express.Router()
const auth = require('./auth')
const users = require('./users')
const airLines = require('./airlines')
const flightroute = require('./flightroutes')
const ticketing = require('./ticketing')
const dataLookUp = require('./dataLookUp')

router.use('/auth', auth)
router.use('/user', users)
router.use('/airlines', airLines)
router.use('/flightroute', flightroute)
router.use('/ticketing', ticketing)
router.use('/data-lookup', dataLookUp)

module.exports = router