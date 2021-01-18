const { it, expect } = require("@jest/globals")
const processData = require("./index");
const BigNumber = require("bignumber.js");

describe("Multi Currency Token Sale", ()=> {
  it("should return the correct sale result", () => {
    const mockData = "1.5 3 BTC 3.5";
    const mockData2 = "6540825.876543210987654325 18 ETH 992465.123456789012345678"
    const mockCurrencyRate = {
      BTC: new BigNumber(3825.281112),
      ETH: new BigNumber(138.8911),
    };
    const test = processData.processData(mockCurrencyRate);
    expect(test(mockData)).toBe("144.593");
    expect(test(mockData2)).toBe("6491541561072.818099748528072316");

  })
})