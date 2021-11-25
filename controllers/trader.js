const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.buysell = async (req, res, next) => {
    console.log(
        "----------------------------------- This is buysell find client part ---------------------------------"
    );
    try {
        const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
        );
        console.log(decoded);
        console.log(req.body.userID);


        // fetch user with the given mail_id
        db.query(
            "SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?",
            [req.body.userID],
            (error, result) => {
                var client_user = result[0];
                res.status(200).render("trader_payment", {
                    user: client_user
                })
            }
        );
        //   res.status(200).render("trader",{

        // });
        // get the trader details
        //   db.query(
        //       "SELECT * FROM (user INNER JOIN trader ON user.User_ID = trader.User_ID) WHERE user.User_ID = ?",
        //       [decoded.id],
        //       (error, result) => {
        //         console.log(result);

        //         if (!result) {
        //           return next();
        //         }

        //         req.user = result[0];
        //         console.log("Trader is");
        //         console.log(req.user);
        //         res.status(200).render("trader",{
        //             user:result[0]
        //         });
        //       }
        //     );
    } catch (error) {
        console.log(error);
    }
};

exports.findclient = async (req, res, next) => {
    console.log(
        "----------------------------------- This is trader find client part ---------------------------------"
    );
    try {
        const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
        );
        console.log(decoded);
        console.log(req.body.clientemail);

        // fetch user with the given mail_id
        db.query(
            "SELECT * FROM (user INNER JOIN trader ON user.User_ID = trader.User_ID) WHERE user.User_ID = ?",
            [decoded.id],
            (error, result) => {
                var trader_user = result[0];
                db.query(
                    "SELECT * FROM client inner join trader inner join user inner join wallet on trader.Trader_ID = client.Trader_ID and wallet.Client_ID = client.Client_ID and user.User_ID = client.User_ID where email=? and trader.Trader_ID=?;",
                    [req.body.clientemail, "T_" + decoded.id],

                    (error, result) => {
                        console.log(result);
                        res.status(200).render("trader", {
                            user: trader_user,
                            searched_client: result[0],
                        });
                    }
                );
            }
        );
        //   res.status(200).render("trader",{

        // });
        // get the trader details
        //   db.query(
        //       "SELECT * FROM (user INNER JOIN trader ON user.User_ID = trader.User_ID) WHERE user.User_ID = ?",
        //       [decoded.id],
        //       (error, result) => {
        //         console.log(result);

        //         if (!result) {
        //           return next();
        //         }

        //         req.user = result[0];
        //         console.log("Trader is");
        //         console.log(req.user);
        //         res.status(200).render("trader",{
        //             user:result[0]
        //         });
        //       }
        //     );
    } catch (error) {
        console.log(error);
    }
};

exports.traderprofile = async (req, res, next) => {
    console.log(
        "----------------------------------- This is trader profile part ---------------------------------"
    );
    try {
        const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
        );
        console.log(decoded);

        // get the trader details
        db.query(
            "SELECT * FROM (user INNER JOIN trader ON user.User_ID = trader.User_ID) WHERE user.User_ID = ?",
            [decoded.id],
            (error, result) => {
                console.log(result);

                if (!result) {
                    return next();
                }

                req.user = result[0];
                console.log("Trader is");
                console.log(req.user);
                res.status(200).render("trader", {
                    user: result[0],
                });
            }
        );
    } catch (error) {
        console.log(error);
    }
};


exports.transaction_B = async (req, res, next) => {


    //wallet amt > buy bitcoin amt 
    //buy bit coin amt = comission amt + (live bitcoin price * number of bitcpin )
    //wallet update 
    //transaction update 
    //transaction execution update 
    //only buy
    console.log("----------------------------------- This is transacton buy part ---------------------------------")
    try {

        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
            process.env.JWT_SECRET
        );
        // Decoded will be for the traderid
        //we need to pass the hidden value of client id
        console.log(decoded);
        console.log(req.body.userID)

        console.log("amount to be bought");
        console.log(req.body.Buy);
        console.log(req.body.checkbox1);
        //if the above value is on than it is dollars otherwise (undefined) it is bitcoins 
        if (req.body.Buy <= 0 || req.body.Buy == "") {
            db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [req.body.userID], (error, result) => {
                // console
                return res.status(400).render('trader_payment', {
                    message: 'Invalid Amount to be removed',
                    user: result[0]
                });
            });
        }
        else {
            db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [req.body.userID], (error, result) => {
                console.log("------------------------------------------This is working -------------------------------------------------------------");
                if (error) {
                    throw error;
                }
                console.log(result);

                var client = result[0];
                var uid = result[0].User_ID;
                var client_id = "C_" + result[0].User_ID;
                var d_amount = result[0].D_amount;
                var b_amount = result[0].B_amount;


                var bitcoin_rate = 100;
                var commission_rate = 0;
                db.query('SELECT Tier FROM client where Client_ID=? ', [client_id], (error, result) => {
                    //console.log(result[0] );
                    //console.log(result);
                    if (result[0].Tier == "Silver") {
                        commission_rate = 0.1;
                    }
                    else {
                        if (result[0].Tier == "Gold") {
                            commission_rate = 0.08;
                        }
                    }



                    if (req.body.checkbox1 == 'on') {

                        var bitcoin_bought_amt = req.body.Buy * bitcoin_rate;
                        var commission_amt = bitcoin_bought_amt * commission_rate;
                        var total_bought_amt_dollar = bitcoin_bought_amt + commission_amt;
                        console.log(commission_amt + "-" + bitcoin_bought_amt + "" + total_bought_amt_dollar);
                        console.log(typeof (commission_amt));
                        if (total_bought_amt_dollar >= d_amount) {
                            db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [uid], (error, result) => {
                                return res.status(400).render('trader_payment', {
                                    message: 'Insufficient amount',
                                    user: result[0]
                                });
                            });
                        }
                        else {
                            var new_Damount = parseFloat(d_amount) - parseFloat(total_bought_amt_dollar);
                            db.query('update wallet set D_amount = ?,B_amount = ? where Client_ID = ?', [new_Damount, parseFloat(req.body.Buy) + parseFloat(b_amount), client_id], (error, result) => {
                                datetime = new Date().toISOString().slice(0, 19).replace('T', '_');
                                tc_ID = "TT_" + datetime;
                                db.query('INSERT INTO transaction SET ?', { Transaction_ID: tc_ID, Trader_ID: "T_"+decoded.id, Client_ID: client_id, Transaction_type: 'Buy', Date_Time: datetime, status: 'success', Commision_type: 'Dollar', Commision_Paid: commission_amt, Transaction_Amount: total_bought_amt_dollar }, (error, result) => {
                                    db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [uid], (error, result) => {
                                        res.status(200).render('trader_payment', {
                                            user: result[0]
                                        });
                                    });
                                    
                                });

                            });
                        }

                        console.log("completed buy for dollar commision")

                    }
                    else {
                        var commission_amt_bitcoin = req.body.Buy * commission_rate; // commision in bitcoin
                        var bitcoin_bought_amt_bitcoin = req.body.Buy * bitcoin_rate; //total dollar paid by client for the purchse of butcoin 
                        var total_bought_amt_bitcoin = req.body.Buy - commission_amt_bitcoin; // the number of bitcoin the buyer gain after subtracting the commission
                        if (bitcoin_bought_amt_bitcoin >= d_amount) {
                            db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [uid], (error, result) => {
                                return res.status(400).render('trader_payment', {
                                    message: 'Insufficient amount',
                                    user: result[0]
                                });
                            });
                            
                        }
                        else {
                            var new_Damount = parseFloat(d_amount) - parseFloat(bitcoin_bought_amt_bitcoin);
                            console.log(" -/-/-/-/-/--/-/-/--/-/--/-/-/-/-/-/-/ " + parseFloat(total_bought_amt_bitcoin) + parseFloat(b_amount) + "--------------------------------------------------------------------------------")
                            db.query('update wallet set D_amount = ?,B_amount = ? where Client_ID = ?', [new_Damount, parseFloat(total_bought_amt_bitcoin) + parseFloat(b_amount), client_id], (error, result) => {
                                datetime = new Date().toISOString().slice(0, 19).replace('T', '_');
                                tc_ID = "TT_" + datetime;
                                db.query('INSERT INTO transaction SET ?', { Transaction_ID: tc_ID, Trader_ID: "T_"+decoded.id, Client_ID: client_id, Transaction_type: 'Buy', Date_Time: datetime, status: 'success', Commision_type: 'Bitcoin', Commision_Paid: commission_amt_bitcoin, Transaction_Amount: bitcoin_bought_amt_bitcoin }, (error, result) => {
                                    db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [uid], (error, result) => {
                                        res.status(200).render('trader_payment', {
                                            user: result[0]
                                        });
                                    });
                                });

                            });
                            console.log("completed buy for bitcoin commision")
                        }

                    }

                });

            });  //res.status(200).redirect('/profile');
        }


    }
    catch (error) {
        console.log(error);
        next();
    }

}

exports.transaction_S = async (req, res, next) => {


    //bitcoin > num of bitcoin in wallet 
    //amt recieved in wallet =  (live bitcoin price * number of bitcpin) - comission amt
    //wallet update 
    //transaction update 
    //transaction execution update 

    console.log("----------------------------------- This is transacton Sell part ---------------------------------")
    try {

        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
            process.env.JWT_SECRET
        );

        // Decoded will be for the traderid
        //we need to pass the hidden value of client id
        console.log(decoded);
        console.log(req.body.userID)

        console.log("amount to be bought");
        console.log(req.body.Sell);
        console.log(req.body.checkbox2);
        //if the above value is on than it is dollars otherwise (undefined) it is bitcoins 
        if (req.body.Sell <= 0 || req.body.Sell == "") {

            db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [req.body.userID], (error, result) => {
                // console
                return res.status(400).render('trader_payment', {
                    message: 'Invalid Amount to be removed',
                    user: result[0]
                });
            });
        }
        else {
            db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [req.body.userID], (error, result) => {
                console.log("------------------------------------------This is working -------------------------------------------------------------");
                if (error) {
                    throw error;
                }
                console.log(result);

                var uid = result[0].User_ID;
                var client_id = "C_" + result[0].User_ID;
                var d_amount = result[0].D_amount;
                var b_amount = result[0].B_amount;



                if (req.body.Sell > b_amount) {
                    return res.status(400).render('trader_payment', {
                        message: "you don't have enough Bitcoins",
                        user: result[0]

                    });
                }


                var bitcoin_rate = 100;
                //get live bitcoin rate above
                var commission_rate = 0;
                db.query('SELECT Tier FROM client where Client_ID=? ', [client_id], (error, result) => {
                    //console.log(result[0] );
                    //console.log(result);
                    if (result[0].Tier == "Silver") {
                        commission_rate = 0.05;
                    }
                    else {
                        if (result[0].Tier == "Gold") {
                            commission_rate = 0.04;
                        }
                    }




                    if (req.body.checkbox2) {

                        var bitcoin_sold_amt = req.body.Sell * bitcoin_rate;
                        var commission_amt = bitcoin_sold_amt * commission_rate;
                        var total_sold_amt = bitcoin_sold_amt - commission_amt;

                        console.log(commission_amt + "-" + bitcoin_sold_amt + "" + total_sold_amt);
                        console.log(typeof (commission_amt));



                        var new_Damount = parseFloat(d_amount) + parseFloat(total_sold_amt);
                        db.query('update wallet set D_amount = ?,B_amount = ? where Client_ID = ?', [new_Damount, -parseFloat(req.body.Sell) + parseFloat(b_amount), client_id], (error, result) => {
                            datetime = new Date().toISOString().slice(0, 19).replace('T', '_');
                            tc_ID = "TT_" + datetime;
                            db.query('INSERT INTO transaction SET ?', { Transaction_ID: tc_ID, Trader_ID: "T_"+decoded.id, Client_ID: client_id, Transaction_type: 'Sell', Date_Time: datetime, status: 'success', Commision_type: 'Dollar', Commision_Paid: commission_amt, Transaction_Amount: total_sold_amt }, (error, result) => {
                                db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [uid], (error, result) => {
                                    res.status(200).render('trader_payment', {
                                        user: result[0]
                                    });
                                });
                            });

                        });

                        console.log("completed for sell with dollar commsion")
                    }
                    else {


                        var commission_amt_bitcoin = req.body.Sell * commission_rate; // getting commsion for bitcoin 10*.1 = 0.1
                        var bitcoin_sold_amt = parseFloat(req.body.Sell) + parseFloat(commission_amt_bitcoin); // getting the value of bitcoin that are going to be sold 10 + 0.1 = 1.1
                        var total_bitcoin_sold_amt_dollars = req.body.Sell * bitcoin_rate; // getting the value of amt that is to added to wallet 10 * 100 = 1000

                        console.log("--------------------------------->>>>>>>>>>>>>>>>>>" + bitcoin_sold_amt + '(' + req.body.Sell + "+" + commission_amt_bitcoin + ')' + '>' + b_amount);

                        if (bitcoin_sold_amt > b_amount) {
                            console.log(bitcoin_sold_amt + '(' + req.body.Sell + "+" + commission_amt_bitcoin + ')' + '>' + b_amount);
                            return res.status(400).render('trader_payment', {

                                message: "you don't have enough Bitcoins",
                                user: result[0]

                            });
                        }

                        var new_Damount = parseFloat(d_amount) + parseFloat(total_bitcoin_sold_amt_dollars);

                        db.query('update wallet set D_amount = ?,B_amount = ? where Client_ID = ?', [new_Damount, -parseFloat(bitcoin_sold_amt) + parseFloat(b_amount), client_id], (error, result) => {
                            datetime = new Date().toISOString().slice(0, 19).replace('T', '_');
                            tc_ID = "TT_" + datetime;
                            db.query('INSERT INTO transaction SET ?', { Transaction_ID: tc_ID, Trader_ID: "T_"+decoded.id, Client_ID: client_id, Transaction_type: 'Sell', Date_Time: datetime, status: 'success', Commision_type: 'Bitcoin', Commision_Paid: commission_amt_bitcoin, Transaction_Amount: total_bitcoin_sold_amt_dollars }, (error, result) => {
                                console.log(error)
                                db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [uid], (error, result) => {
                                    res.status(200).render('trader_payment', {
                                        user: result[0]
                                    });
                                });
                            });

                        });



                    }
                });

            });

            //res.status(200).redirect('/profile');
        }

    }
    catch (error) {
        console.log(error);
        next();
    }

}

