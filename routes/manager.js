let express = require('express');
let managerController = require('../controllers/managerController');
let mysql = require('mysql');
const { result, functionsIn } = require('lodash');
const { urlencoded } = require('express');
let router = express.Router();

let db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});



router.get('/logs', function (req, res) {

  var sql = "Select sum(Commision_Paid) as commision from TransacView group by Commision_Type;";
  db.query(sql, function (err, results) {
    if (err) throw err;

    var sql2 = "SELECT T.Client_ID FROM TransacView T,DbProject.Client C where T.Client_ID = C.Client_ID group by(T.Client_ID);";
    db.query(sql2, function (err, results2) {
      if (err) throw err;

      var sql3 = "SELECT T.Trader_ID FROM TransacView T,DbProject.Trader Tr where T.Trader_ID = Tr.Trader_ID group by(T.Trader_ID); ";
      db.query(sql3, function (err, results3) {
        if (err) throw err;

        res.render('statistics', { dollarCommision: results[0]['commision'], bitcoinCommision: results[1]['commision'], Clients: results2 , Traders: results3 } );

      })
    })
  });

});


router.get('/daily-clogs', function (req, res) {
  var date = new Date();
  date = date.getDate();

  var sql = `SELECT * FROM TransacView T where T.Trader_ID IS NULL and EXTRACT(day from T.Date_Time) = ${date}  ;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('clientLogs', { title: 'Daily Transaction logs by Clients', data: results });
  });
});

router.get('/daily-tlogs', function (req, res) {
  var date = new Date();
  date = date.getDate();

  var sql = `SELECT * FROM TransacView T where T.Trader_ID != '' and EXTRACT(day from T.Date_Time) = ${date}  ; `;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('traderLogs', { title: 'Daily Transaction logs by Traders', data: results });
  });
});


router.get('/weekly-clogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM TransacView T where T.Trader_ID IS NULL and datediff(DATE('${date}'), DATE(T.Date_Time)) <= 7;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('clientLogs', { title: 'Weekly Transaction logs by Clients', data: results });
  });
});

router.get('/weekly-tlogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM TransacView T where T.Trader_ID != '' and datediff(DATE('${date}'), DATE(T.Date_Time)) <= 7; `;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('traderLogs', { title: 'Weekly Transaction logs by Traders', data: results });
  });
});


router.get('/monthly-clogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM TransacView T where T.Trader_ID IS NULL and datediff(DATE('${date}'), DATE(T.Date_Time)) <= 30;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('clientLogs', { title: 'Monthly Transaction logs by Clients', data: results });
  });
});

router.get('/monthly-tlogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM TransacView T where T.Trader_ID != '' and datediff(DATE('${date}'), DATE(T.Date_Time)) <= 30 ;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('traderLogs', { title: 'Monthly Transaction logs by Traders', data: results });
  });
});


router.post('/datewise-Commision', function (req, res) {

  if (req.body.radio2 == "dollars") {
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;

    var sql = `Select sum(Commision_Paid) as commision from TransacView T where Commision_Type = 'Dollar' and T.Date_Time >= DATE('${start_date}') and T.Date_Time <= DATE('${end_date}') ;`;

    db.query(sql, function (err, results) {
      if (err) throw err;

      var message = 'Commision recieved in Dollars between date range ' + start_date + "  to  " + end_date + " : ";
      if (results[0] == null) {
        let sum = {
          commision: 0
        }
        res.render('statistics', { d_title: message, dollar_Commision: sum });

      }
      res.render('statistics', { d_title: message, dollar_Commision: results[0] });
    });

  }
  else if (req.body.radio2 == "bitcoins") {
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;

    var sql = `Select sum(Commision_Paid) as commision from TransacView T where Commision_Type = 'Bitcoin' and T.Date_Time >= DATE('${start_date}') and T.Date_Time <= DATE('${end_date}') ;`;
    db.query(sql, function (err, results) {

      if (err) throw err;

      var message = 'Commision recieved in Bitcoins between date range ' + start_date + "  to  " + end_date + " : ";

      res.render('statistics', { b_title: message, bitcoin_Commision: results[0] });

    });

  }

});



router.post('/datewise-logs', function (req, res) {

  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  //console.log(start_date + "    " + end_date);

  db.query(`SELECT * FROM TransacView T where T.Date_Time >= DATE('${start_date}') and T.Date_Time <= DATE('${end_date}') `, function (err, results) {
    if (err) throw err;

    //console.log("Results with data range: " + results);

    var message = 'Transaction Logs with date range ' + start_date + "  to  " + end_date;
    res.render('manager', { title: message, data: results });
  });
});

router.get('/audit-logs', function (req, res) {

  
  //var sql = `select distinct T.Transaction_ID,T.Transaction_Amount, T.Transaction_type, TE.Client_ID, C.User_ID, U.First_Name, U.Phone_number from Transaction T, Transaction_Execution TE, Client C, User U where T.Transaction_ID = TE.Transaction_ID and TE.Client_ID = C.Client_ID and C.User_ID = U.User_ID;`;
  db.query(`SELECT * FROM CancelledTransactions `, function (err, results) {
    if (err) throw err;

    //console.log("Results with data range: " + results);

    var message = 'Cancelled Transaction Logs';
    res.render('manager', { title: message, data: results });
  });
});


module.exports = router;

