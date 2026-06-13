import MetricCard from "./MetricCard";

const MetricsGrid = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 animate-pulse"
          >
            <div className="h-4 w-24 bg-[#1F2937] rounded mb-3" />
            <div className="h-8 w-32 bg-[#1F2937] rounded mb-2" />
            <div className="h-3 w-20 bg-[#1F2937] rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!data?.metrics) return null;

  const metrics = [
    {
      label: "Revenue",
      value: data.metrics.revenue,
      subLabel: "Trailing 12 Months",
      type: "revenue",
    },
    {
      label: "Net Income",
      value: data.metrics.netIncome,
      subLabel: "Trailing 12 Months",
      type: "income",
    },
    {
      label: "P/E Ratio",
      value: data.metrics.peRatio,
      subLabel: "Price to Earnings",
      type: "pe",
    },
    {
      label: "Dividend Yield",
      value: data.metrics.dividendYield,
      subLabel: "Annual Dividend",
      type: "dividend",
    },
    {
      label: "52-Week High",
      value: data.metrics.weekHigh52,
      subLabel: "Past 52 weeks",
      type: "price",
      trend: "up",
    },
    {
      label: "52-Week Low",
      value: data.metrics.weekLow52,
      subLabel: "Past 52 weeks",
      type: "price",
      trend: "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, idx) => (
        <MetricCard key={idx} {...metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;
