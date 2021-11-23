const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.transaction_B = async  (req,res,next) => {


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

      console.log(decoded);

      console.log("amount to be bought" );
      console.log(req.body.Buy);
      if(  req.body.Buy <= 0 || req.body.Buy == "") {
        
        return res.status(400).render('payment', {
          message: 'Invalid Amount to be removed'
        });
      }
      else {
        db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [decoded.id], (error, result) => {
          console.log("------------------------------------------This is working -------------------------------------------------------------");
          if (error){
            throw error;
          }
          console.log(result);
    
        
          var client_id = "C_" + result[0].User_ID;
          var d_amount = result[0].D_amount;
          var b_amount = result[0].B_amount;
         
          
          var bitcoin_rate = 100;
          var commission_rate =0 ;
          db.query('SELECT Tier FROM client where Client_ID=? ' , [client_id] , (error,result) => {
            //console.log(result[0] );
            //console.log(result);
            if (result[0].Tier == "Silver")
            {
                 commission_rate = 0.1;
            }
            else{
                if (result[0].Tier == "Gold")
                {
                     commission_rate = 0.08;
                }
            }

            var bitcoin_bought_amt = req.body.Buy * bitcoin_rate;
            var commission_amt = bitcoin_bought_amt * commission_rate;
            var total_bought_amt = bitcoin_bought_amt + commission_amt;
            console.log(commission_amt +"-"+ bitcoin_bought_amt + "" + total_bought_amt);
            console.log(typeof(commission_amt));
            if (total_bought_amt >= d_amount){
                return res.status(400).render('payment', {
                    message: ' Insufficient amount'
                  }); 
            }
            else{
                var new_Damount = parseInt(d_amount) - parseInt(total_bought_amt);
                db.query('update wallet set D_amount = ?,B_amount = ? where Client_ID = ?' , [new_Damount,parseInt(req.body.Buy)+parseInt(b_amount),client_id], (error,result) => {
                    datetime = new Date().toISOString().slice(0, 19).replace('T', '_');
                    tc_ID = "TT_" + datetime; 
                    db.query('INSERT INTO transaction SET ?', {Transaction_ID:tc_ID,Client_ID:client_id,Transaction_type:'Buy',Date_Time:datetime,status:'success',Commision_type:'dollar',Commision_Paid:commission_amt,Transaction_Amount:total_bought_amt}, (error,result) =>{
                        res.status(200).redirect('/payment');
                    });      
                   
                });
            }
          
          
          
          
    
          console.log("update for user_is " + client_id + " with value " + d_amount + " $");
          
          
           
            console.log(req + "---------- " + res);
            
            console.log("completed")
          }); 
         
        });
        
        //res.status(200).redirect('/profile');
      }  
    
  }
  catch (error)
  {
    console.log(error);
    next();
  }
  
  }
  
  exports.transaction_S =  async (req,res,next) => {
  
  
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
  
        console.log(decoded);
  
        console.log("amount to be bought" );
        console.log(req.body.Sell);
        if(  req.body.Sell <= 0 || req.body.Sell == "") {
          
          return res.status(400).render('payment', {
            message: 'Invalid Amount to be removed'
          });
        }
        else {
            db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [decoded.id], (error, result) => {
            console.log("------------------------------------------This is working -------------------------------------------------------------");
            if (error){
              throw error;
            }
            console.log(result);
      
          
            var client_id = "C_" + result[0].User_ID;
            var d_amount = result[0].D_amount;
            var b_amount = result[0].B_amount;
           
            if ( req.body.Sell > b_amount ){
                return res.status(400).render('payment', {
                    message: "you don't have enough Bitcoins",
                    user:result[0]
            
                });
            }
            
            
            var bitcoin_rate = 100;
            //get live bitcoin rate above
            var commission_rate =0 ;
            db.query('SELECT Tier FROM client where Client_ID=? ' , [client_id] , (error,result) => {
              //console.log(result[0] );
              //console.log(result);
              if (result[0].Tier == "Silver")
              {
                   commission_rate = 0.05;
              }
              else{
                  if (result[0].Tier == "Gold")
                  {
                       commission_rate = 0.04;
                  }
              }
  





              var bitcoin_sold_amt = req.body.Sell * bitcoin_rate;
              var commission_amt = bitcoin_sold_amt * commission_rate;
              var total_sold_amt = bitcoin_sold_amt - commission_amt;
              
              console.log(commission_amt +"-"+ bitcoin_sold_amt + "" + total_sold_amt);
              console.log(typeof(commission_amt));
              
              
        
            var new_Damount = parseInt(d_amount) + parseInt(total_sold_amt);
            db.query('update wallet set D_amount = ?,B_amount = ? where Client_ID = ?' , [new_Damount,-parseInt(req.body.Sell)+parseInt(b_amount),client_id], (error,result) => {
                datetime = new Date().toISOString().slice(0, 19).replace('T', '_');
                tc_ID = "TT_" + datetime; 
                db.query('INSERT INTO transaction SET ?', {Transaction_ID:tc_ID,Client_ID:client_id,Transaction_type:'Sell',Date_Time:datetime,status:'success',Commision_type:'dollar',Commision_Paid:commission_amt,Transaction_Amount:total_sold_amt}, (error,result) =>{
                    res.status(200).redirect('/payment');
                });      
                
            });
        
            
            
            
            
      
            console.log("update for user_is " + client_id + " with value " + d_amount + " $");
            
            
             
              console.log(req + "---------- " + res);
              
              console.log("completed")
            }); 
           
          });
          
          //res.status(200).redirect('/profile');
        }  
      
    }
    catch (error)
    {
      console.log(error);
      next();
    }

  }
  