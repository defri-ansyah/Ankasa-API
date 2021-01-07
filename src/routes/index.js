const express = require('express')
const router = express.Router()

const airLines = require('./airlines')

router.use('/airlines', airLines)

module.exports = router