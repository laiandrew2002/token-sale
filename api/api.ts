import * as CoinGecko from "coingecko-api";

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

export const getPriceFromGecko = async () => {
  try {
    const bitcoinData = await CoinGeckoClient.coins.fetch('bitcoin');
    const ethData = await CoinGeckoClient.coins.fetch('ethereum');
    const dogeData = await CoinGeckoClient.coins.fetch('dogecoin');
  
    const btcPrice = bitcoinData.data.market_data.current_price.usd;
    const ethPrice = ethData.data.market_data.current_price.usd;
    const dogPrice  = dogeData.data.market_data.current_price.usd;
  
    return {
      BTC: btcPrice,
      ETH: ethPrice,
      DOGE: dogPrice,
    };
  } catch(error) {
    console.log("Error on CoinGecko API: ", error);
  };
};

export const getCurrentPrice = {
  getPriceFromGecko,
};
