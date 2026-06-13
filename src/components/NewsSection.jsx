import HeadlineCard from "./HeadlineCard";
import { Newspaper } from "lucide-react";

const NewsSection = ({ headlines, loading, usingMock }) => {
  if (loading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="w-5 h-5 text-[#00D4AA]" />
          <h3 className="text-lg font-bold text-[#F8FAFC] font-space-grotesk">
            Latest News
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#111827] rounded-xl border border-[#1F2937] p-5 animate-pulse"
            >
              <div className="h-4 w-full bg-[#1F2937] rounded mb-2" />
              <div className="h-4 w-3/4 bg-[#1F2937] rounded mb-3" />
              <div className="h-3 w-24 bg-[#1F2937] rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!headlines?.length) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Newspaper className="w-5 h-5 text-[#00D4AA]" />
        <h3 className="text-lg font-bold text-[#F8FAFC] font-space-grotesk">
          Latest News
        </h3>
        {usingMock && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-[#F0B429]/10 text-[#F0B429] rounded">
            Simulated
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {headlines.map((headline, idx) => (
          <HeadlineCard
            key={idx}
            title={headline.title}
            source={headline.source}
            time={headline.time}
            sentiment={headline.sentiment}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
