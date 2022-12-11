const express = require('express');

const purchaseController = require('../Controller/purchase');

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/premiummembership' , authenticatemiddleware.authentication , purchaseController.purchasepremium )

router.post('/updatestatus' , authenticatemiddleware.authentication , purchaseController.updateTransactionStatus)

module.exports = router;