const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();


const getCurrentPrice = async() => {
  const bitcoinData = await CoinGeckoClient.coins.fetch('bitcoin', {});
  const ethData = await CoinGeckoClient.coins.fetch('ethereum', {});
  const dogeData = await CoinGeckoClient.coins.fetch('dogecoin', {});

  const btcPrice = bitcoinData.data.market_data.current_price.usd;
  const ethPrice = ethData.data.market_data.current_price.usd;
  const dogPrice = dogeData.data.market_data.current_price.usd;

  console.log(btcPrice, ethPrice, dogPrice);
  return {
    BTC: btcPrice,
    ETH: ethPrice,
    DOGE: dogPrice,
  }

};
exports.getCurrentPrice = getCurrentPrice;
