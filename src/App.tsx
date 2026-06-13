import { useState, useMemo } from "react";
import { ApiKeysProvider, useApiKeys } from "./context/ApiKeysContext";
import TickerTape from "./components/TickerTape";
import Navbar from "./components/Navbar";
import SettingsPanel from "./components/SettingsPanel";
import StockHeader from "./components/StockHeader";
import PriceChart from "./components/PriceChart";
import SentimentWidget from "./components/SentimentWidget";
import MetricsGrid from "./components/MetricsGrid";
import NewsSection from "./components/NewsSection";
import Disclaimer from "./components/Disclaimer";
import useStockData from "./hooks/useStockData";

// Inner component that uses the hook inside the provider
function AppContent() {
  const [ticker, setTicker] = useState("AAPL");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { apiKeys } = useApiKeys();

  const hasKeys = useMemo(() => {
    return !!(apiKeys.alphaVantage || apiKeys.anthropic || apiKeys.finnhub);
  }, [apiKeys]);

  const { data, loading, error, usingMock } = useStockData(ticker);

  const handleSearch = (newTicker: string) => {
    setTicker(newTicker);
  };

  const lastUpdated = useMemo(() => {
    const now = new Date();
    return `${now.getMinutes()} min ago`;
  }, [data]);

  return (
    <>
      <TickerTape />

      <Navbar
        onSearch={handleSearch}
        onOpenSettings={() => setSettingsOpen(true)}
        hasKeys={hasKeys}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {error && (
          <div className="w-full bg-[#FF4D6A]/10 border border-[#FF4D6A]/30 rounded-xl p-4">
            <p className="text-[#FF4D6A] text-sm">{error}</p>
          </div>
        )}

        {usingMock && !error && (
          <div className="flex items-center gap-2 text-sm text-[#F0B429]">
            <span className="px-2 py-1 bg-[#F0B429]/10 border border-[#F0B429]/30 rounded">
              Using simulated data
            </span>
          </div>
        )}

        <StockHeader data={data} loading={loading} lastUpdated={lastUpdated} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PriceChart data={data} loading={loading} />
          </div>
          <div className="lg:col-span-1">
            <SentimentWidget data={data} loading={loading} />
          </div>
        </div>

        <MetricsGrid data={data} loading={loading} />

        <NewsSection
          headlines={data?.headlines}
          loading={loading}
          usingMock={usingMock}
        />

        <Disclaimer />
      </main>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}

function App() {
  const [apiKeys, setApiKeys] = useState({
    alphaVantage: "",
    anthropic: "",
    finnhub: "",
  });

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <ApiKeysProvider value={{ apiKeys, setApiKeys }}>
        <AppContent />
      </ApiKeysProvider>
    </div>
  );
}

export default App;
