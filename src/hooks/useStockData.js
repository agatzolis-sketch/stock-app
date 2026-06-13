import { useState, useEffect, useCallback, useRef } from "react";
import { useApiKeys } from "../context/ApiKeysContext";
import { getMockData } from "../data/mockData";

const useStockData = (ticker) => {
  const { apiKeys } = useApiKeys();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingMock, setUsingMock] = useState(true);

  // Keep a ref to track the latest apiKeys for comparison
  const prevApiKeysRef = useRef(apiKeys);

  const fetchData = useCallback(async () => {
    if (!ticker) return;

    setLoading(true);
    setError(null);

    const upperTicker = ticker.toUpperCase();
    const alphaVantageKey = apiKeys?.alphaVantage;
    const finnhubKey = apiKeys?.finnhub;

    // If no API key, use mock data immediately
    if (!alphaVantageKey) {
      console.log("No Alpha Vantage key, using mock data for", upperTicker);
      setData(getMockData(upperTicker));
      setUsingMock(true);
      setLoading(false);
      return;
    }

    console.log("Fetching live data for", upperTicker, "with Alpha Vantage key");

    try {
      // Fetch from Alpha Vantage
      const [priceRes, overviewRes] = await Promise.all([
        fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${upperTicker}&apikey=${alphaVantageKey}`
        ),
        fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${upperTicker}&apikey=${alphaVantageKey}`
        ),
      ]);

      const priceData = await priceRes.json();
      const overviewData = await overviewRes.json();

      // Check for API errors or rate limiting
      if (
        priceData["Error Message"] ||
        priceData["Note"] ||
        overviewData["Error Message"] ||
        overviewData["Note"]
      ) {
        console.error("API error or rate limit:", priceData["Note"] || overviewData["Note"]);
        throw new Error("API error or rate limit");
      }

      const timeSeries = priceData["Time Series (Daily)"];
      if (!timeSeries || Object.keys(timeSeries).length === 0) {
        console.error("No price data available");
        throw new Error("No price data available");
      }

      // Process price history
      const dates = Object.keys(timeSeries).sort((a, b) => new Date(a) - new Date(b));
      const latestDate = dates[dates.length - 1];
      const latestPrice = parseFloat(timeSeries[latestDate]["4. close"]);
      const previousPrice = parseFloat(timeSeries[dates[dates.length - 2]]["4. close"]);
      const change = latestPrice - previousPrice;
      const changePercent = (change / previousPrice) * 100;

      // Generate price history for different ranges
      const generatePriceHistory = (days) => {
        const history = [];
        const startIndex = Math.max(0, dates.length - days);
        for (let i = startIndex; i < dates.length; i++) {
          history.push({
            date: new Date(dates[i]).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }),
            price: parseFloat(timeSeries[dates[i]]["4. close"]),
          });
        }
        return history;
      };

      const formatMarketCapFromNumber = (num) => {
        const n = parseFloat(num);
        if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
        if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
        if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
        return `$${n.toFixed(2)}`;
      };

      const formatRevenueFromNumber = (num) => {
        const n = parseFloat(num);
        if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
        if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
        return `$${n.toFixed(2)}`;
      };

      const processedData = {
        ticker: upperTicker,
        name: overviewData.Name || `${upperTicker} Corporation`,
        price: latestPrice,
        change: change,
        changePercent: changePercent,
        marketCap: overviewData.MarketCapitalization
          ? formatMarketCapFromNumber(overviewData.MarketCapitalization)
          : "N/A",
        exchange: overviewData.Exchange || "N/A",
        metrics: {
          revenue: overviewData.RevenueTTM
            ? formatRevenueFromNumber(overviewData.RevenueTTM)
            : "N/A",
          netIncome: overviewData.NetIncomeTTMFromContinuingOperations
            ? formatRevenueFromNumber(overviewData.NetIncomeTTMFromContinuingOperations)
            : "N/A",
          peRatio: parseFloat(overviewData.PERatio) || null,
          dividendYield: parseFloat(overviewData.DividendYield) || null,
          weekHigh52: parseFloat(overviewData["52WeekHigh"]) || null,
          weekLow52: parseFloat(overviewData["52WeekLow"]) || null,
        },
        priceHistory: {
          "1M": generatePriceHistory(30),
          "6M": generatePriceHistory(180),
          "1Y": generatePriceHistory(365),
        },
        headlines: [],
      };

      // Fetch news from Finnhub if available
      if (finnhubKey) {
        try {
          const to = new Date().toISOString().split("T")[0];
          const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];
          const newsRes = await fetch(
            `https://finnhub.io/api/v1/company-news?symbol=${upperTicker}&from=${from}&to=${to}&token=${finnhubKey}`
          );
          const newsData = await newsRes.json();
          if (Array.isArray(newsData) && newsData.length > 0) {
            processedData.headlines = newsData.slice(0, 5).map((item) => ({
              title: item.headline,
              source: item.source,
              time: formatNewsTime(item.datetime),
              sentiment: "Neutral",
            }));
          }
        } catch (newsError) {
          console.error("Finnhub error:", newsError);
          processedData.headlines = getMockData(upperTicker).headlines;
        }
      } else {
        processedData.headlines = getMockData(upperTicker).headlines;
      }

      console.log("Successfully fetched live data for", upperTicker);
      setData(processedData);
      setUsingMock(false);
    } catch (err) {
      console.error("API error:", err);
      setError(`Could not fetch live data for ${upperTicker}. Using simulated data.`);
      setData(getMockData(upperTicker));
      setUsingMock(true);
    }

    setLoading(false);
  }, [ticker, apiKeys]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Update ref when apiKeys changes
  useEffect(() => {
    prevApiKeysRef.current = apiKeys;
  }, [apiKeys]);

  return { data, loading, error, usingMock, refetch: fetchData };
};

const formatNewsTime = (timestamp) => {
  const diff = Date.now() - timestamp * 1000;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default useStockData;
