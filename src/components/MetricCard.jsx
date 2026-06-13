import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart2 } from "lucide-react";
import {
  formatPrice,
  formatLargeNumber,
  formatPERatio,
  formatDividendYield,
} from "../utils/formatters";

const MetricCard = ({ label, value, subLabel, type, trend }) => {
  const getIcon = () => {
    switch (type) {
      case "price":
      case "revenue":
      case "income":
        return <DollarSign className="w-4 h-4" />;
      case "pe":
      case "dividend":
        return <Percent className="w-4 h-4" />;
      default:
        return <BarChart2 className="w-4 h-4" />;
    }
  };

  const getValueColor = () => {
    if (type === "income" && parseFloat(value?.replace(/[^0-9.-]/g, "")) < 0) {
      return "text-[#FF4D6A]";
    }
    return "text-[#F8FAFC]";
  };

  const formatValue = () => {
    if (value === null || value === undefined || value === "N/A") return "N/A";

    switch (type) {
      case "price":
        return formatPrice(value);
      case "revenue":
      case "income":
        return value.startsWith?.("$") ? value : formatLargeNumber(value);
      case "pe":
        return formatPERatio(value);
      case "dividend":
        return formatDividendYield(value);
      default:
        return value;
    }
  };

  return (
    <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 hover:border-[#00D4AA]/50 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#8892A4]">{getIcon()}</span>
        <span className="text-sm text-[#8892A4]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-2xl font-bold font-space-grotesk ${getValueColor()}`}>
          {formatValue()}
        </span>
        {trend && (
          <span className={trend === "up" ? "text-[#00D4AA]" : "text-[#FF4D6A]"}>
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
          </span>
        )}
      </div>
      {subLabel && <p className="text-xs text-[#8892A4] mt-1">{subLabel}</p>}
    </div>
  );
};

export default MetricCard;
