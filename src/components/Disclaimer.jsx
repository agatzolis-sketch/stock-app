import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="w-full bg-[#111827] rounded-xl border-l-4 border-l-[#F0B429] border border-[#1F2937] p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#F0B429] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#8892A4] leading-relaxed">
          <strong className="text-[#F0B429]">Disclaimer:</strong> This tool is for
          educational and research purposes only. It does not constitute financial
          advice, investment recommendations, or solicitation to buy or sell any
          security. Past performance is not indicative of future results. Always
          consult a qualified financial advisor before making investment decisions.
          Market data may be delayed or simulated.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
