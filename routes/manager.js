let express = require('express');
let managerController = require('../controllers/managerController');
let mysql = require('mysql');
const { result } = require('lodash');
let router = express.Router();

let db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

//router.get('/logs', managerController.logs);

router.get('/logs', function (req, res, next) {
  var sql = 'SELECT * FROM transaction';
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('manager', { title: 'Transactions Logs', data: results });
  });
});

router.get('/buy-logs', function (req, res, next) {
  var sql = 'SELECT * FROM transaction where Transaction_type = "Buy" ';
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('manager', { title: 'Buy logs of Transaction', data: results });
  });
});


router.get('/sell-logs', function (req, res, next) {
  var sql = 'SELECT * FROM transaction where Transaction_type = "Sell" ';
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('manager', { title: 'Sell logs of Transaction', data: results });
  });
});




router.get('/dollars-commision-logs', function (req, res) {
  var sql = 'SELECT * FROM transaction where Commision_type = "Dollars" ';
  db.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);

    res.render('manager', { title: 'Commision in Dollars Logs', data: results });
  });
});

router.get('/bitcoin-commision-logs', function (req, res) {
  var sql = 'SELECT * FROM transaction where Commision_type = "Bitcoins" ';
  db.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);

    res.render('manager', { title: 'Commision in Bitcoin Logs', data: results });
  });
});

router.get('/user-logs', function (req, res) {
  var sql = 'select distinct T.Transaction_ID, TE.Client_ID, C.User_ID, U.First_Name, U.Phone_number from Transaction T, Transaction_Execution TE, Client C, User U where T.Transaction_ID = TE.Transaction_ID and TE.Client_ID = C.Client_ID and C.User_ID = U.User_ID;';
  db.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);

    res.render('statistics', { title: 'User Logs', data: results });
  });
});
//Testing commit


module.exports = router;

