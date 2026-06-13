import { formatPrice, formatChange } from "../utils/formatters";

const StockHeader = ({ data, loading, lastUpdated }) => {
  if (loading) {
    return (
      <div className="w-full bg-[#111827] rounded-xl border border-[#1F2937] p-6 animate-pulse">
        <div className="h-6 w-48 bg-[#1F2937] rounded mb-4" />
        <div className="h-10 w-32 bg-[#1F2937] rounded mb-2" />
        <div className="h-4 w-24 bg-[#1F2937] rounded" />
      </div>
    );
  }

  if (!data) return null;

  const isPositive = data.change >= 0;
  const changeColor = isPositive ? "text-[#00D4AA]" : "text-[#FF4D6A]";
  const changeBg = isPositive ? "bg-[#00D4AA]/10" : "bg-[#FF4D6A]/10";

  return (
    <div className="w-full bg-[#111827] rounded-xl border border-[#1F2937] p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-[#F8FAFC] font-space-grotesk">
              {data.ticker}
            </h1>
            <span className="px-2 py-0.5 bg-[#1F2937] text-[#8892A4] text-xs rounded font-medium">
              {data.exchange}
            </span>
          </div>
          <h2 className="text-[#8892A4] text-sm mb-4">{data.name}</h2>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-[#F8FAFC] font-space-grotesk">
              {formatPrice(data.price)}
            </span>
            <div className={`flex items-center gap-1 px-2 py-1 rounded ${changeBg}`}>
              <span className={changeColor}>
                {isPositive ? "▲" : "▼"}
              </span>
              <span className={`${changeColor} font-medium text-sm`}>
                {formatChange(data.change, data.changePercent)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <span className="text-[#8892A4] text-sm">Market Cap</span>
            <p className="text-xl font-bold text-[#F8FAFC] font-space-grotesk">
              {data.marketCap.startsWith("$") ? data.marketCap : `$${data.marketCap}`}
            </p>
          </div>
          <p className="text-xs text-[#8892A4]">
            Updated {lastUpdated || "just now"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
