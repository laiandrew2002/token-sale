import { BigNumber } from "bignumber.js";
const readline = require("readline");

export interface CryptoPrice {
  [currency: string]: BigNumber.Instance
}

export const processData = (currencyRate: CryptoPrice) => {
  let currencyList: string[] = [];
  // set round up to Round-down the result
  BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

  return (line: string) => {
    if (Object.keys(currencyRate).length === 0) {
      currencyList = line.split(" ");
      currencyRate = {
        BTC: new BigNumber(currencyList[0]),
        ETH: new BigNumber(currencyList[1]),
        DOGE: new BigNumber(currencyList[2]),
      };
      return;
    }

    const lineValues = line.split(' ');
    const saleRate = new BigNumber(lineValues[0]);
    const purchaseAmount = new BigNumber(lineValues[3]);
    const decimalPlaces = parseInt(lineValues[1]);
    const purchaseCurrency = lineValues[2];

    const result = saleRate
      .multipliedBy(purchaseAmount)
      .multipliedBy(currencyRate[purchaseCurrency])
      .dividedBy(currencyRate.ETH)
      .toFixed(decimalPlaces);
    console.log(result);
    
    return result;
  };
}; 

const currencyRateList: CryptoPrice = {};
const readAndOutputDetails = processData(currencyRateList);

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', readAndOutputDetails);

