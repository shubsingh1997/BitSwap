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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if( !email || !password ) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      })
    }
    
    
    db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if( !results || !(await bcrypt.compare(password, results[0].password)) ) {
        res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        })
      } else {
        const id = results[0].User_ID;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions );
        res.status(200).redirect("/");
      }

    })

  } catch (error) {
    console.log(error);
  }
}

exports.register = (req, res) => {
  console.log(req.body);

  const { firstname,lastname,ssn,street,city, zip,state, phone,cellphone,email, password, passwordConfirm } = req.body;
  let user_id
  db.query('SELECT max(User_ID)as max FROM user', (error, result) => {
    console.log(result);

    if(result!=null) {
       user_id=parseInt(result[0].max)+1;
    }

  });
  db.query('SELECT email FROM user WHERE email = ?', [email], async (error, results) => {
    if(error) {
      console.log(error);
    }

    if( results.length > 0 ) {
      return res.render('register', {
        message: 'That email is already in use'
      })
    } else if( password !== passwordConfirm ) {
      return res.render('register', {
        message: 'Passwords do not match'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);


    db.query('INSERT INTO user SET ?', {User_ID:user_id,SSN:ssn,First_Name:firstname,Last_Name:lastname,Phone_number:phone,Cellphone_Number:cellphone, email: email, password: hashedPassword }, (error, results) => {
      if(error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render('register', {
          message: 'User registered'
        });
      }
    })
    if(zip!=null){
    db.query('INSERT INTO address SET ?', {User_ID:user_id,Street_Address:street,city:city,zip:zip,state:state}, (error, results) => {
      if(error) {
        console.log(error);
      } else {
        console.log(results);

      }
    })
    let client_id="C_".concat("", user_id);
    db.query('INSERT INTO client SET ?', {User_ID:user_id,Client_ID:client_id,tier:"Silver"}, (error, results) => {
      if(error) {
        console.log(error);
      } else {
        console.log(results);

      }
    })
    db.query('INSERT INTO wallet SET ?', {Client_ID:client_id,D_amount:0,B_amount:0}, (error, results) => {
      if(error) {
        console.log(error);
      } else {
        console.log(results);

      }
    })
  }
  else{
    let trader_id="T_".concat(" ", user_id);
    db.query('INSERT INTO trader SET ?', {User_ID:user_id,Tradert_ID:trader_id}, (error, results) => {
      if(error) {
        console.log(error);
      } else {
        console.log(results);
      }
    })
  }

  });

}

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if( req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
      process.env.JWT_SECRET
      );

      console.log(decoded);

      //2) Check if the user still exists
      db.query('SELECT * FROM ((user INNER JOIN client ON user.User_ID = client.User_ID) INNER JOIN wallet ON wallet.Client_ID = client.Client_ID) WHERE user.User_ID = ?', [decoded.id], (error, result) => {
        console.log(result);

        if(!result) {
          return next();
        }

        req.user = result[0];
        console.log("user is")
        console.log(req.user);
        return next();

      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
}

exports.logout = async (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2*1000),
    httpOnly: true
  });

  res.status(200).redirect('/logout');
}