import { BigNumber } from "bignumber.js";
import { processData } from "./index";
import { getCurrentPrice } from "./api/api";

describe("Multi Currency Token Sale", () => {
  it("should return the correct sale result", async () => {
    const mockData = "1.5 3 BTC 3.5";
    const mockData2 = "6540825.876543210987654325 18 ETH 992465.123456789012345678";

    let mockCurrencyRate = {
      BTC: new BigNumber(3825.281112),
      ETH: new BigNumber(138.8911),
    };

    const test = processData(mockCurrencyRate);
    const data1 = await test(mockData);
    const data2 = await test(mockData2);

    expect(data1).toBe("144.593");
    expect(data2).toBe("6491541561072.818099748528072316");
  });

  it("should call Gecko api when first line is CURRENT", async () => {
    const mockData = "CURRENT";
    const test = processData({});
    jest.spyOn(getCurrentPrice, "getPriceFromGecko");
    await test(mockData);
    expect(getCurrentPrice.getPriceFromGecko).toBeCalled();

  });
});
