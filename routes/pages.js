const express = require('express');
//const { cond } = require('lodash');
const authController = require('../controllers/auth');
const managerController = require('../controllers/managerController');
const transactionController = require('../controllers/transaction');
const live_dataController = require('../controllers/live_price');

const router = express.Router();
const traderController = require('../controllers/trader')

router.get('/', authController.isLoggedIn, (req, res) => { 
  res.render('index', {
    user: req.user
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/logout', (req, res) => {
  res.render('logout');
});

router.get('/wallet', authController.isLoggedIn, (req, res) => {
  
  console.log(req.user);
  if( req.user ) {
    res.render('wallet', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
  
});


router.get('/payment', authController.isLoggedIn, (req, res) => {
  
  console.log(req.user);
  if( req.user ) {
    res.render('payment', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
  
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
  
})

router.get('/manager', (req,res) => {        
  console.log(req);
  res.render('manager');
})

router.post('/payment/transactions_B' , transactionController.transaction_B);

router.post('/payment/transactions_S' , transactionController.transaction_S );

router.get('/index/live_price' , live_dataController.livedata_print);

router.get("/trader", traderController.traderprofile);
router.post("/trader/client", traderController.findclient);

router.post("/trader/client/trade", traderController.buysell);

router.post("/trader/client/transactions", traderController.transactions);
router.post('/trader/client/trade/Buy' , traderController.transaction_B);
router.post('/trader/client/trade/Sell' , traderController.transaction_S);

router.post('/trader/client/CancelTransaction' , traderController.cancelTransaction);

module.exports = router;