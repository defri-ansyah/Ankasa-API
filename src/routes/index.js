const express = require('express')
const router = express.Router()
const auth = require('./auth')
const airLines = require('./airlines')

router.use('/auth', auth)
router.use('/airlines', airLines)

module.exports = router