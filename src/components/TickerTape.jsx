import { tickerTapeData } from "../data/mockData";

const TickerTape = () => {
  const items = [...tickerTapeData, ...tickerTapeData];

  return (
    <div className="w-full h-8 bg-[#0A0E1A] overflow-hidden border-b border-[#1F2937]">
      <div className="ticker-tape-scroll flex whitespace-nowrap h-full items-center">
        {items.map((item, idx) => (
          <span
            key={`${item.ticker}-${idx}`}
            className="inline-flex items-center mx-4 text-sm font-medium"
          >
            <span className="text-[#F8FAFC] font-space-grotesk">{item.ticker}</span>
            <span
              className={`ml-2 ${
                item.change >= 0 ? "text-[#00D4AA]" : "text-[#FF4D6A]"
              }`}
            >
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(1)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TickerTape;
