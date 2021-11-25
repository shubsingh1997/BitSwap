const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const fs = require('fs')
var localStorage = require('node-localstorage').LocalStorage
const env = require('process')


function livedata() {
    console.log("------------------------------------------------------------------in live price");
let data =  CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
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
    console.log(BITCOIN_temp);

    return BITCOIN_temp;
    
}

exports.livedata_print = async  (req,res,next) =>
{
//console.log("------------------------------------------------------------------in live price");
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
    
    env.BITCOIN = _coinList.BTC
    console.log(env.BITCOIN);

    return ;
  

    

}
