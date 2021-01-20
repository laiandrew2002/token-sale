import * as readline from "readline";
import { BigNumber } from "bignumber.js";
import { getCurrentPrice } from "./api/api";

export interface CryptoPrice {
  [currency: string]: BigNumber.Instance,
};

const CURRENT_PRICE = "CURRENT";

export const processData = (currencyRate: CryptoPrice) => {
  let currencyList: string[] = [];

  // set round up to Round-down the result
  BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

  return async (line: string) => {
    // check first line for "CURRENT"
    if(line == CURRENT_PRICE) {
      currencyRate = await getCurrentPrice.getPriceFromGecko();
      return currencyRate;
    };

    if (Object.keys(currencyRate).length === 0) {
      currencyList = line.split(" ");
      currencyRate = {
        BTC: new BigNumber(currencyList[0]),
        ETH: new BigNumber(currencyList[1]),
        DOGE: new BigNumber(currencyList[2]),
      };
      return currencyRate;
    }

    const lineValues = line.split(' ');
    const saleRate = new BigNumber(lineValues[0]);
    const purchaseAmount = new BigNumber(lineValues[3]);
    const decimalPlaces = parseInt(lineValues[1]);
    const purchaseCurrency = lineValues[2];

    const result: string = saleRate
      .multipliedBy(purchaseAmount)
      .multipliedBy(currencyRate[purchaseCurrency])
      .dividedBy(currencyRate.ETH)
      .toFixed(decimalPlaces);
    
    return result;
  };
}; 

const currencyRateList: CryptoPrice = {};

async function processLineInTxt() {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  const readAndOutputDetails = processData(currencyRateList);

  for await (const line of rl){
    console.log(await readAndOutputDetails(line));
  }
};

processLineInTxt();