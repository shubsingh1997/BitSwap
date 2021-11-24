const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();



exports.livedata_print = async  (req,res,next) =>
{
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
console.log(_coinList);
    return res.status(200).render('index', {
        price: _coinList

});

}