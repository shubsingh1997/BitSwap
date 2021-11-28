const express = require('express');
//const { cond } = require('lodash');
const authController = require('../controllers/auth');
const managerController = require('../controllers/managerController');
const transactionController = require('../controllers/transaction');

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const router = express.Router();
const traderController = require('../controllers/trader')
const env = require('process')

router.get('/', authController.isLoggedIn, (req, res) => { 
  res.render('index', {
    user: req.user,
    BIT : env.BITCOIN
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

router.get('/live_bitcoin_chart', (req, res) => {
  res.render('live_bitcoin_chart');

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
      user: req.user,
      BIT : env.BITCOIN
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

router.get('/manager', (req,res) => {        
  console.log(req);
  res.render('manager');
})

router.post('/payment/transactions_B' , transactionController.transaction_B);

router.post('/payment/transactions_S' , transactionController.transaction_S );

//router.post('/live_price' , live_dataController.livedata_print);

//router.get('/graph', graphController.graph);

router.get('/wallet/show_transaction' , authController.walletTransaction_show);

var out_key = [];
var out_value = [];
var temparoryy = 0;
router.get('/live_price_1' , async function (req,res) {
  console.log("------------------------------------------------------------------in live price");
let data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
        coin_ids: ['bitcoin' ,'ethereum']
    });
    var _coinList = {};
    var _datacc = data.data.tickers.filter(t => t.target == 'USD');
    [
        'BTC',
        'ETH'
    ].forEach((i) => {
        var _temp = _datacc.filter(t => t.base == i);
        var _res = _temp.length == 0 ? [] : _temp[0];
        _coinList[i] = _res.last;
    })

    //global.BITCOIN_PRICE = _coinList;
    
    BITCOIN_temp = _coinList.BTC
    env.BITCOIN = BITCOIN_temp
    
    var output = {};
    
    const d = new Date()
    
    if (out_key.length == 0 && out_value.length == 0)
    { 
      var x = d.getSeconds();    
      for (let i =0 ;i < 10; i++)
        {
          
          out_key.push(d.getHours() + ":" + d.getMinutes()+ ":"+ x);
          out_value.push(BITCOIN_temp);
          x =x +1;
        }
    }
    else
    { 
      console.log(BITCOIN_temp,temparoryy);

      if (BITCOIN_temp != temparoryy)
      {
        out_key.shift();
        out_value.shift();
        out_key.push(d.getHours() + ":" + d.getMinutes()+ ":"+ d.getSeconds());
        out_value.push(BITCOIN_temp);
      }
    }

    for(let i =0; i <10 ; i++)
    {
      output [out_key[i]] = out_value[i];
    }
    //console.log(out_key,out_value)
    //console.log(output);
    temparoryy = BITCOIN_temp;
    console.log(BITCOIN_temp);
    return res.status(200).json(output);
    
});

router.get("/trader", traderController.traderprofile);
router.post("/trader/client", traderController.findclient);

router.post("/trader/client/trade", traderController.buysell);

router.post("/trader/client/transactions", traderController.transactions);
router.post('/trader/client/trade/Buy' , traderController.transaction_B);
router.post('/trader/client/trade/Sell' , traderController.transaction_S);
router.post('/trader/client/CancelTransaction' , traderController.cancelTransaction);

module.exports = router;