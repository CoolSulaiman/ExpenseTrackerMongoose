const express = require('express');
const router = express.Router();

const resetpasswordController = require('../Controller/resetpassword');

router.use('/forgotpassword' , resetpasswordController.forgotpassword)

router.get('/resetpassword/:id' , resetpasswordController.resetpassword)

router.get('/updatepassword/:resetpasswordid' , resetpasswordController.updatepassword )

module.exports = router
