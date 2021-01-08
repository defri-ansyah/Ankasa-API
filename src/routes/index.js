const express = require('express')
const router = express.Router()
const auth = require('./auth')
const users = require('./users')
const airLines = require('./airlines')
const flightroute = require('./flightroutes'); 

router.use('/auth', auth)
router.use('/user', users)
router.use('/airlines', airLines)
router.use('/flightroute', flightroute)

module.exports = router