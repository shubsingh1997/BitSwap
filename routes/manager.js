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

  var sql = "Select sum(Commision_Paid) as commision from Transaction group by Commision_Type;";
  db.query(sql, function (err, results) {
    if (err) throw err;

    var sql2 = "SELECT TE.Client_ID FROM mydb.Transaction T,mydb.Transaction_Execution TE where T.Transaction_ID = TE.Transaction_ID group by(TE.Client_ID);";
    db.query(sql2, function (err, results2) {
      if (err) throw err;

      var sql3 = "SELECT TE.Trader_ID FROM mydb.Transaction T,mydb.Transaction_Execution TE where T.Transaction_ID = TE.Transaction_ID group by(TE.Trader_ID); ";
      db.query(sql3, function (err, results3) {
        if (err) throw err;

        res.render('statistics', { dollarCommision: results[0]['commision'], bitcoinCommision: results[1]['commision'], Clients: results2 , Traders: results3 } );

      })
    })
  });

});


router.get('/daily-clogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM mydb.Transaction T, mydb.Transaction_Execution E where T.Transaction_ID = E.Transaction_ID and E.Trader_ID IS NULL and T.Date_Time = DATE('${date}') ;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('clientLogs', { title: 'Daily Transaction logs by Clients', data: results });
  });
});

router.get('/daily-tlogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM mydb.Transaction T, mydb.Transaction_Execution E where T.Transaction_ID = E.Transaction_ID and E.Trader_ID != '' and T.Date_Time = DATE('${date}') ;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('traderLogs', { title: 'Daily Transaction logs by Traders', data: results });
  });
});


router.get('/weekly-clogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM mydb.Transaction T, mydb.Transaction_Execution E where T.Transaction_ID = E.Transaction_ID and E.Trader_ID IS NULL and datediff(DATE('${date}'), DATE(T.Date_Time)) <= 7;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('clientLogs', { title: 'Weekly Transaction logs by Clients', data: results });
  });
});

router.get('/weekly-tlogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM mydb.Transaction T, mydb.Transaction_Execution E where T.Transaction_ID = E.Transaction_ID and E.Trader_ID != '' and datediff(DATE('${date}'), DATE(T.Date_Time)) <= 7;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('traderLogs', { title: 'Weekly Transaction logs by Traders', data: results });
  });
});


router.get('/monthly-clogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM mydb.Transaction T, mydb.Transaction_Execution E where T.Transaction_ID = E.Transaction_ID and E.Trader_ID IS NULL and datediff(DATE('${date}'), DATE(T.Date_Time)) <= 30;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('clientLogs', { title: 'Monthly Transaction logs by Clients', data: results });
  });
});

router.get('/monthly-tlogs', function (req, res) {
  var date = new Date();
  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var sql = `SELECT * FROM mydb.Transaction T, mydb.Transaction_Execution E where T.Transaction_ID = E.Transaction_ID and E.Trader_ID != '' and datediff(DATE('${date}'), DATE(T.Date_Time)) <= 30;`;
  db.query(sql, function (err, results) {
    if (err) throw err;

    res.render('traderLogs', { title: 'Monthly Transaction logs by Traders', data: results });
  });
});


router.post('/datewise-Commision', function (req, res) {

  if (req.body.radio2 == "dollars") {
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;

    var sql = `select sum(Commision_Paid) as commision from Transaction T where Commision_type = 'Dollars' and T.Date_Time >= DATE('${start_date}') and T.Date_Time <= DATE('${end_date}') ;`;

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

    var sql = `select sum(Commision_Paid) as commision from Transaction T where Commision_type = 'Bitcoins' and T.Date_Time >= DATE('${start_date}') and T.Date_Time <= DATE('${end_date}') ;`;
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

  //var sql = `select distinct T.Transaction_ID,T.Transaction_Amount, T.Transaction_type, TE.Client_ID, C.User_ID, U.First_Name, U.Phone_number from Transaction T, Transaction_Execution TE, Client C, User U where T.Transaction_ID = TE.Transaction_ID and TE.Client_ID = C.Client_ID and C.User_ID = U.User_ID;`;
  db.query(`SELECT * FROM TRANSACTION T where T.Date_Time >= DATE('${start_date}') and T.Date_Time <= DATE('${end_date}') `, function (err, results) {
    if (err) throw err;

    //console.log("Results with data range: " + results);

    var message = 'Transaction Logs with date range ' + start_date + "  to  " + end_date;
    res.render('manager', { title: message, data: results });
  });
});


module.exports = router;

