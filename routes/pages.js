const express = require('express');
//const { cond } = require('lodash');
const authController = require('../controllers/auth');
const managerController = require('../controllers/managerController');

const router = express.Router();

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

router.get('/summary', (req,res) => {        
  console.log(req);
  //return res.send("Hii Manager");
  res.render('manager');
})

module.exports = router;