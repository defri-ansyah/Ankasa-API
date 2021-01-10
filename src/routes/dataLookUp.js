const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const cityControllers = require('../controllers/cityControllers');

router.get('/city', cityControllers.getCity);

module.exports = router;