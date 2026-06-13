import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatPrice } from "../utils/formatters";

const PriceChart = ({ data, loading }) => {
  const [timeRange, setTimeRange] = useState("6M");

  const chartData = useMemo(() => {
    if (!data?.priceHistory?.[timeRange]) return [];
    return data.priceHistory[timeRange];
  }, [data, timeRange]);

  const isPositive = useMemo(() => {
    if (chartData.length < 2) return true;
    return chartData[chartData.length - 1].price >= chartData[0].price;
  }, [chartData]);

  const color = isPositive ? "#00D4AA" : "#FF4D6A";

  if (loading) {
    return (
      <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 animate-pulse">
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-12 bg-[#1F2937] rounded" />
          ))}
        </div>
        <div className="h-64 bg-[#1F2937] rounded" />
      </div>
    );
  }

  if (!data || chartData.length === 0) {
    return (
      <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6">
        <p className="text-[#8892A4] text-center py-20">
          No price history available for this time range
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A0E1A] border border-[#1F2937] rounded px-3 py-2">
          <p className="text-[#8892A4] text-xs mb-1">{label}</p>
          <p className="text-[#F8FAFC] font-bold font-space-grotesk">
            {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const prices = chartData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.1;
  const yDomain = [minPrice - padding, maxPrice + padding];

  return (
    <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6">
      <div className="flex gap-2 mb-6">
        {["1M", "6M", "1Y"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
              timeRange === range
                ? "bg-[#00D4AA] text-[#0A0E1A]"
                : "bg-[#1F2937] text-[#8892A4] hover:bg-[#2D3748] hover:text-[#E2E8F0]"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8892A4", fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8892A4", fontSize: 11 }}
              domain={yDomain}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
