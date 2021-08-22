import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Stock = () => {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = () => {
    let StockSymbol = "FB";
    let API_call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${process.env.REACT_APP_STOCK_KEY}`;

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_call)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        for (let key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);
      });
  };

  return (
    <div>
      <h1>Stock Market</h1>
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 720, height: 440, title: "A Fancy Plot" }}
      />
    </div>
  );
};

export default Stock;
