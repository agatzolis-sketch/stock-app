const generatePriceHistory = (basePrice, volatility, days) => {
  const history = [];
  const today = new Date();
  let price = basePrice * 0.85;

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.48) * volatility * price;
    price = Math.max(price * 0.7, price + change);
    history.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      price: Number(price.toFixed(2)),
    });
  }
  return history;
};

const mockTickers = {
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 189.3,
    change: 2.14,
    changePercent: 1.14,
    marketCap: "2.94T",
    exchange: "NASDAQ",
    metrics: {
      revenue: "383.3B",
      netIncome: "97.0B",
      peRatio: 29.4,
      dividendYield: 0.52,
      weekHigh52: 199.62,
      weekLow52: 164.08,
    },
    priceHistory: {
      "1M": generatePriceHistory(189.3, 0.02, 30),
      "6M": generatePriceHistory(189.3, 0.02, 180),
      "1Y": generatePriceHistory(189.3, 0.02, 365),
    },
    headlines: [
      { title: "Apple reports record holiday iPhone sales, beating analyst estimates", source: "Reuters", time: "2h ago", sentiment: "Bullish" },
      { title: "EU regulators open antitrust probe into App Store payment practices", source: "Financial Times", time: "5h ago", sentiment: "Bearish" },
      { title: "Apple Vision Pro supply chain ramp accelerates ahead of Q2 launch", source: "Bloomberg", time: "1d ago", sentiment: "Neutral" },
      { title: "Services revenue hits all-time high as App Store growth continues", source: "CNBC", time: "2d ago", sentiment: "Bullish" },
    ],
  },
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 15.42,
    changePercent: 1.79,
    marketCap: "2.16T",
    exchange: "NASDAQ",
    metrics: {
      revenue: "60.9B",
      netIncome: "29.8B",
      peRatio: 64.2,
      dividendYield: 0.02,
      weekHigh52: 974.0,
      weekLow52: 138.84,
    },
    priceHistory: {
      "1M": generatePriceHistory(875.28, 0.035, 30),
      "6M": generatePriceHistory(875.28, 0.035, 180),
      "1Y": generatePriceHistory(875.28, 0.04, 365),
    },
    headlines: [
      { title: "NVIDIA unveils next-gen Blackwell chips, shares surge to record high", source: "Bloomberg", time: "1h ago", sentiment: "Bullish" },
      { title: "AI chip demand continues to outpace supply, says CEO Jensen Huang", source: "Reuters", time: "4h ago", sentiment: "Bullish" },
      { title: "Tech giants race to secure NVIDIA H100 inventory for AI expansion", source: "WSJ", time: "1d ago", sentiment: "Neutral" },
    ],
  },
  TSLA: {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    price: 177.48,
    change: -3.25,
    changePercent: -1.8,
    marketCap: "564.7B",
    exchange: "NASDAQ",
    metrics: {
      revenue: "96.8B",
      netIncome: "15.0B",
      peRatio: 44.5,
      dividendYield: 0,
      weekHigh52: 299.29,
      weekLow52: 101.81,
    },
    priceHistory: {
      "1M": generatePriceHistory(177.48, 0.04, 30),
      "6M": generatePriceHistory(177.48, 0.04, 180),
      "1Y": generatePriceHistory(177.48, 0.05, 365),
    },
    headlines: [
      { title: "Tesla Q4 deliveries miss estimates amid production challenges", source: "Reuters", time: "3h ago", sentiment: "Bearish" },
      { title: "Cybertruck production ramp faces ongoing supply constraints", source: "Bloomberg", time: "6h ago", sentiment: "Bearish" },
      { title: "Tesla expands Supercharger network across Europe and Asia", source: "InsideEVs", time: "1d ago", sentiment: "Bullish" },
      { title: "Musk announces new Gigafactory location in Southeast Asia", source: "CNBC", time: "2d ago", sentiment: "Neutral" },
    ],
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    price: 415.5,
    change: 3.28,
    changePercent: 0.8,
    marketCap: "3.09T",
    exchange: "NASDAQ",
    metrics: {
      revenue: "227.6B",
      netIncome: "82.4B",
      peRatio: 36.1,
      dividendYield: 0.74,
      weekHigh52: 430.82,
      weekLow52: 213.43,
    },
    priceHistory: {
      "1M": generatePriceHistory(415.5, 0.018, 30),
      "6M": generatePriceHistory(415.5, 0.018, 180),
      "1Y": generatePriceHistory(415.5, 0.02, 365),
    },
    headlines: [
      { title: "Microsoft cloud revenue surges 24% as Azure AI adoption accelerates", source: "Bloomberg", time: "2h ago", sentiment: "Bullish" },
      { title: "Copilot AI integration drives enterprise Office 365 upgrades", source: "WSJ", time: "5h ago", sentiment: "Bullish" },
      { title: "Microsoft invests $10B in OpenAI partnership expansion", source: "Reuters", time: "1d ago", sentiment: "Neutral" },
    ],
  },
  AMZN: {
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    price: 178.25,
    change: -0.89,
    changePercent: -0.5,
    marketCap: "1.86T",
    exchange: "NASDAQ",
    metrics: {
      revenue: "574.8B",
      netIncome: "30.4B",
      peRatio: 78.3,
      dividendYield: 0,
      weekHigh52: 189.77,
      weekLow52: 88.12,
    },
    priceHistory: {
      "1M": generatePriceHistory(178.25, 0.022, 30),
      "6M": generatePriceHistory(178.25, 0.022, 180),
      "1Y": generatePriceHistory(178.25, 0.025, 365),
    },
    headlines: [
      { title: "Amazon Web Services maintains cloud market lead despite competition", source: "CNBC", time: "2h ago", sentiment: "Neutral" },
      { title: "Prime Day sales set new record with $12.7B in revenue", source: "Reuters", time: "8h ago", sentiment: "Bullish" },
      { title: "FTC antitrust lawsuit against Amazon moves forward", source: "WSJ", time: "1d ago", sentiment: "Bearish" },
    ],
  },
  GOOGL: {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    price: 141.8,
    change: -1.32,
    changePercent: -0.92,
    marketCap: "1.77T",
    exchange: "NASDAQ",
    metrics: {
      revenue: "307.4B",
      netIncome: "73.8B",
      peRatio: 24.8,
      dividendYield: 0,
      weekHigh52: 153.78,
      weekLow52: 83.34,
    },
    priceHistory: {
      "1M": generatePriceHistory(141.8, 0.02, 30),
      "6M": generatePriceHistory(141.8, 0.02, 180),
      "1Y": generatePriceHistory(141.8, 0.022, 365),
    },
    headlines: [
      { title: "Google Gemini AI rollout faces privacy concerns in EU markets", source: "Financial Times", time: "3h ago", sentiment: "Bearish" },
      { title: "YouTube ad revenue rebounds as short-form video monetization grows", source: "Bloomberg", time: "6h ago", sentiment: "Bullish" },
      { title: "Alphabet faces $8B antitrust fine in EU search ruling", source: "Reuters", time: "1d ago", sentiment: "Bearish" },
    ],
  },
};

export const getMockData = (ticker) => {
  const upperTicker = ticker?.toUpperCase();
  if (mockTickers[upperTicker]) {
    return mockTickers[upperTicker];
  }

  const genericPrice = 50 + Math.random() * 200;
  return {
    ticker: upperTicker || "UNKNOWN",
    name: `${upperTicker || "Unknown"} Corporation`,
    price: Number(genericPrice.toFixed(2)),
    change: Number(((Math.random() - 0.5) * 5).toFixed(2)),
    changePercent: Number(((Math.random() - 0.5) * 3).toFixed(2)),
    marketCap: `${(Math.random() * 500 + 10).toFixed(1)}B`,
    exchange: "NYSE",
    metrics: {
      revenue: `${(Math.random() * 50 + 5).toFixed(1)}B`,
      netIncome: `${(Math.random() * 10 - 2).toFixed(1)}B`,
      peRatio: Number((Math.random() * 30 + 10).toFixed(1)),
      dividendYield: Number((Math.random() * 3).toFixed(2)),
      weekHigh52: Number((genericPrice * 1.15).toFixed(2)),
      weekLow52: Number((genericPrice * 0.75).toFixed(2)),
    },
    priceHistory: {
      "1M": generatePriceHistory(genericPrice, 0.025, 30),
      "6M": generatePriceHistory(genericPrice, 0.025, 180),
      "1Y": generatePriceHistory(genericPrice, 0.03, 365),
    },
    headlines: [
      { title: `${upperTicker || "Company"} reports quarterly results in line with expectations`, source: "Reuters", time: "4h ago", sentiment: "Neutral" },
      { title: `Analysts maintain hold rating on ${upperTicker || "stock"}`, source: "Bloomberg", time: "1d ago", sentiment: "Neutral" },
      { title: `${upperTicker || "Company"} announces strategic partnership initiative`, source: "WSJ", time: "2d ago", sentiment: "Bullish" },
    ],
  };
};

export const tickerTapeData = [
  { ticker: "AAPL", change: 1.2 },
  { ticker: "NVDA", change: -0.4 },
  { ticker: "TSLA", change: 3.1 },
  { ticker: "MSFT", change: 0.8 },
  { ticker: "AMZN", change: 0.3 },
  { ticker: "GOOGL", change: -0.9 },
  { ticker: "META", change: 2.5 },
  { ticker: "JPM", change: -1.1 },
  { ticker: "V", change: 0.6 },
  { ticker: "WMT", change: -0.2 },
  { ticker: "DIS", change: 1.8 },
  { ticker: "NFLX", change: -0.7 },
];

export default mockTickers;
