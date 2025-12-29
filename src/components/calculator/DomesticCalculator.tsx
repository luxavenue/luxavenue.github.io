import React, { useState } from "react";
import { domesticMarkets } from "./mallFeeList";

const DomesticCalculator = () => {
  const [profit, setProfit] = useState("0");
  const [profitRate, setProfitRate] = useState("0");
  const [copiedMarket, setCopiedMarket] = useState<string | null>(null);

  const parsedProfit = parseFloat(profit) || 0;
  const parsedRate = parseFloat(profitRate) / 100 || 0;

  const handleCopy = (price: number, marketName: string) => {
    navigator.clipboard.writeText(`${Math.round(price)}`);
    setCopiedMarket(marketName);
    setTimeout(() => setCopiedMarket(null), 2000);
  };

  return (
    <div className="calc-domestic">
      <h2>국내 판매가 계산기</h2>

      <div className="calc-input-wrap">
        <div className="calc-input-group">
          <label htmlFor="profit">원가 (₩)</label>
          <input
            id="profit"
            type="number"
            placeholder="희망 순이익 입력 (원)"
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
          />
        </div>
        <div className="calc-input-group">
          <label htmlFor="profitRate">희망 순이익률 (%)</label>
          <input
            id="profitRate"
            type="number"
            placeholder="희망 순이익률 입력 (%)"
            value={profitRate}
            onChange={(e) => setProfitRate(e.target.value)}
          />
        </div>
      </div>

      <table className="calc-table">
        <thead>
          <tr>
            <th>쇼핑몰</th>
            <th>수수료율</th>
            <th>희망 순이익률</th>
            <th>계산된 판매가</th>
          </tr>
        </thead>
        <tbody>
          {domesticMarkets.map((market) => {
            const denominator = 1 - market.feeRate - parsedRate;
            const salePrice =
              denominator > 0 ? parsedProfit / denominator : null;

            return (
              <tr key={market.name}>
                <td>{market.name}</td>
                <td>{(market.feeRate * 100).toFixed(1)}%</td>
                <td>{(parsedRate * 100).toFixed(1)}%</td>
                <td>
                  {salePrice
                    ? <>
                        {`${Math.round(salePrice).toLocaleString()}원`}
                        <button
                          className="copy-button"
                          onClick={() => handleCopy(salePrice, market.name)}
                        >
                          {copiedMarket === market.name ? "붙여넣기" : "복사"}
                        </button>
                      </>
                    : "불가능"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DomesticCalculator;