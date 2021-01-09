const express = require('express');
const router = express.Router();
const {verifyAccess} = require('../middlewares/auth');
const {uploadMulter} = require('../middlewares/upload');
const ticketingController = require('../controllers/ticketingControllers');

router.get('/find', ticketingController.findTicket);
router.post('/select-ticket', verifyAccess, ticketingController.selectTicket);
// router.post('/login', authController.login);
// router.post('/forgot-password/request', authController.reqForgotPassword);
// router.post('/forgot-password/new-password/:token', authController.forgotPassword);


module.exports = router;