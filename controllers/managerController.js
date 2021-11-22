const mysql = require('mysql');
const express = require('express');
const { rearg } = require('lodash');
//const router = require('../routes/pages');
const router = express.Router();


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});



// router.get('/user-list', function(req, res, next) {
//     var sql='SELECT * FROM users';
//     db.query(sql, function (err, data, fields) {
//     if (err) throw err;
//     res.render('manager', { title: 'User List', userLogs: data});
//   });
// });




// router.get('/', function (req, res) {
//     res.send("Welcome Mr. Manager...");

    // db.query
    // ('SELECT * FROM transaction', (error,results) => {
    //     console.log(results);
    //     if(error){
    //         console.log(error);
    //     }

    //     console.log(results); //res.send(results);
    //     res.send('manager');
    //     // return res.render('/summary', {
           
    //     //     message: 'Transactions History'
    //     // })
        
    // })
// });
// module.exports = router;

