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
