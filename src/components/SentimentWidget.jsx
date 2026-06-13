import { useState, useEffect } from "react";
import { useApiKeys } from "../context/ApiKeysContext";
import { TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";

const SentimentWidget = ({ data, loading }) => {
  const { apiKeys } = useApiKeys();
  const [sentiment, setSentiment] = useState(null);
  const [sentimentLoading, setSentimentLoading] = useState(false);

  const generateMockSentiment = (headlines) => {
    if (!headlines?.length) {
      return {
        sentiment: "Neutral",
        score: 50,
        summary: "No recent news available for sentiment analysis.",
        keyFactors: ["Market conditions", "Sector performance", "General economic outlook"],
      };
    }

    const bullishCount = headlines.filter((h) => h.sentiment === "Bullish").length;
    const bearishCount = headlines.filter((h) => h.sentiment === "Bearish").length;

    let sentimentType = "Neutral";
    let score = 50;

    if (bullishCount > bearishCount + 1) {
      sentimentType = "Bullish";
      score = 60 + (bullishCount - bearishCount) * 10;
    } else if (bearishCount > bullishCount + 1) {
      sentimentType = "Bearish";
      score = 40 - (bearishCount - bullishCount) * 10;
    }

    score = Math.max(1, Math.min(100, score));

    return {
      sentiment: sentimentType,
      score,
      summary: `Based on ${headlines.length} recent headlines, the overall market sentiment for ${data?.ticker || "this stock"} appears ${sentimentType.toLowerCase()}. News flow suggests a balanced view with mixed signals from various market participants.`,
      keyFactors: [
        bullishCount > 0 ? `${bullishCount} positive news item(s)` : null,
        bearishCount > 0 ? `${bearishCount} negative news item(s)` : null,
        "Market sentiment indicators",
      ].filter(Boolean),
    };
  };

  useEffect(() => {
    const fetchSentiment = async () => {
      if (!data?.ticker || !apiKeys.anthropic) {
        if (data?.headlines?.length > 0) {
          setSentiment(generateMockSentiment(data.headlines));
        }
        return;
      }

      setSentimentLoading(true);
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKeys.anthropic,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [
              {
                role: "user",
                content: `You are a financial analyst assistant. Analyze the following recent news headlines for ${data.name} (${data.ticker}) and return ONLY a JSON object with no markdown, no explanation, no preamble. The JSON must have exactly these keys:
{
  "sentiment": "Bullish" | "Neutral" | "Bearish",
  "score": <integer 1–100, where 1=most bearish, 50=neutral, 100=most bullish>,
  "summary": "<2–3 sentence summary of overall market sentiment and key themes>",
  "keyFactors": ["<factor 1>", "<factor 2>", "<factor 3>"]
}

Headlines:
${data.headlines.map((h, i) => `${i + 1}. ${h.title}`).join("\n")}`,
              },
            ],
          }),
        });

        const json = await response.json();
        const text = json.content?.find((b) => b.type === "text")?.text || "{}";

        try {
          const parsed = JSON.parse(text);
          setSentiment({
            sentiment: parsed.sentiment || "Neutral",
            score: parsed.score || 50,
            summary: parsed.summary || "Unable to generate analysis.",
            keyFactors: parsed.keyFactors || [],
          });
        } catch {
          setSentiment(generateMockSentiment(data.headlines));
        }
      } catch (error) {
        console.error("Sentiment API error:", error);
        setSentiment(generateMockSentiment(data.headlines));
      }
      setSentimentLoading(false);
    };

    fetchSentiment();
  }, [data, apiKeys.anthropic]);

  if (loading || sentimentLoading) {
    return (
      <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 animate-pulse">
        <div className="h-6 w-32 bg-[#1F2937] rounded mb-4" />
        <div className="h-4 w-full bg-[#1F2937] rounded mb-2" />
        <div className="h-4 w-3/4 bg-[#1F2937] rounded mb-4" />
        <div className="h-20 w-full bg-[#1F2937] rounded" />
      </div>
    );
  }

  if (!sentiment) return null;

  const getSentimentColor = (s) => {
    switch (s) {
      case "Bullish":
        return "text-[#00D4AA]";
      case "Bearish":
        return "text-[#FF4D6A]";
      default:
        return "text-[#F0B429]";
    }
  };

  const getSentimentBg = (s) => {
    switch (s) {
      case "Bullish":
        return "bg-[#00D4AA]/10 border-[#00D4AA]/30";
      case "Bearish":
        return "bg-[#FF4D6A]/10 border-[#FF4D6A]/30";
      default:
        return "bg-[#F0B429]/10 border-[#F0B429]/30";
    }
  };

  const SentimentIcon =
    sentiment.sentiment === "Bullish"
      ? TrendingUp
      : sentiment.sentiment === "Bearish"
      ? TrendingDown
      : Minus;

  return (
    <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-[#F0B429]" />
        <span className="text-sm text-[#8892A4]">AI Sentiment Analysis</span>
      </div>

      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getSentimentBg(
          sentiment.sentiment
        )} mb-4`}
      >
        <SentimentIcon className={`w-5 h-5 ${getSentimentColor(sentiment.sentiment)}`} />
        <span
          className={`text-xl font-bold font-space-grotesk ${getSentimentColor(
            sentiment.sentiment
          )}`}
        >
          {sentiment.sentiment.toUpperCase()}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-[#8892A4] mb-1">
          <span>1</span>
          <span className="font-medium">Sentiment Score</span>
          <span>100</span>
        </div>
        <div className="relative h-3 bg-[#1F2937] rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-[#FF4D6A] via-[#F0B429] to-[#00D4AA]"
            style={{ width: "100%" }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F8FAFC] rounded-full border-2 border-[#0A0E1A] shadow-lg"
            style={{ left: `calc(${sentiment.score}% - 8px)` }}
          />
        </div>
        <div className="text-center mt-2">
          <span className="text-2xl font-bold text-[#F8FAFC] font-space-grotesk">
            {sentiment.score}
          </span>
        </div>
      </div>

      <p className="text-sm text-[#E2E8F0] mb-4 leading-relaxed">
        {sentiment.summary}
      </p>

      <div className="space-y-2">
        <span className="text-xs text-[#8892A4] font-medium">Key Factors</span>
        <ul className="space-y-1">
          {sentiment.keyFactors.map((factor, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-[#E2E8F0]">
              <span className="text-[#00D4AA]">•</span>
              {factor}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-[#8892A4] mt-4 pt-4 border-t border-[#1F2937]">
        AI-generated analysis · Not financial advice
      </p>
    </div>
  );
};

export default SentimentWidget;
