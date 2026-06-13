const HeadlineCard = ({ title, source, time, sentiment }) => {
  const getSentimentStyle = () => {
    switch (sentiment) {
      case "Bullish":
        return "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]/30";
      case "Bearish":
        return "bg-[#FF4D6A]/10 text-[#FF4D6A] border-[#FF4D6A]/30";
      default:
        return "bg-[#F0B429]/10 text-[#F0B429] border-[#F0B429]/30";
    }
  };

  return (
    <article className="bg-[#111827] rounded-xl border border-[#1F2937] p-5 hover:border-[#00D4AA]/50 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="text-[#E2E8F0] font-medium leading-snug line-clamp-2">
          {title}
        </h4>
        <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getSentimentStyle()} flex-shrink-0`}>
          {sentiment}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-[#8892A4]">
        <span className="font-medium">{source}</span>
        <span>•</span>
        <span>{time}</span>
      </div>
    </article>
  );
};

export default HeadlineCard;
