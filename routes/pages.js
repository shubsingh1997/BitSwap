const express = require('express');
const authController = require('../controllers/auth');
const transactionController = require('../controllers/transaction');
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


router.post('/payment/transactions_B' , transactionController.transaction_B);

router.post('/payment/transactions_S' , transactionController.transaction_S);

router.get("/trader", traderController.traderprofile);
router.post("/trader/client", traderController.findclient);
module.exports = router;