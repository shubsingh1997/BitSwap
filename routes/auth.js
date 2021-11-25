const express = require('express');
const authController = require('../controllers/auth');
const transactionController = require('../controllers/transaction');

const router = express.Router();
          
router.post('/register', authController.register );

router.post('/login', authController.login );

router.get('/logout', authController.logout );

router.post('/wallet/positive', authController.walletTransaction_positive);

router.post('/wallet/negative', authController.walletTransaction_negative);

//router.get('/wallet/show_transaction' , authController.walletTransaction_show);



module.exports = router;