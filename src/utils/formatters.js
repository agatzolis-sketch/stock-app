export const formatPrice = (price) => {
  if (price === null || price === undefined) return "N/A";
  return `$${Number(price).toFixed(2)}`;
};

export const formatMarketCap = (value) => {
  if (!value) return "N/A";
  if (typeof value === "string") return `$${value}`;
  const num = Number(value);
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
};

export const formatChange = (change, changePercent) => {
  const prefix = change >= 0 ? "+" : "";
  return `${prefix}${change.toFixed(2)} (${prefix}${changePercent.toFixed(2)}%)`;
};

export const formatLargeNumber = (value) => {
  if (!value) return "N/A";
  if (typeof value === "string") return `$${value}`;
  const num = Number(value);
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  return `$${num.toFixed(2)}`;
};

export const formatPERatio = (pe) => {
  if (pe === null || pe === undefined || pe < 0) return "N/A";
  return `${pe.toFixed(1)}×`;
};

export const formatDividendYield = (yield_) => {
  if (yield_ === null || yield_ === undefined || yield_ === 0) return "None";
  return `${yield_.toFixed(2)}%`;
};
