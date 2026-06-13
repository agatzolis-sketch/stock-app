import { useState, useEffect } from "react";
import { X, Eye, EyeOff, Key, Info, CheckCircle } from "lucide-react";
import { useApiKeys } from "../context/ApiKeysContext";

const SettingsPanel = ({ isOpen, onClose }) => {
  const { apiKeys, setApiKeys } = useApiKeys();
  const [localKeys, setLocalKeys] = useState(apiKeys);
  const [showKeys, setShowKeys] = useState({
    alphaVantage: false,
    anthropic: false,
    finnhub: false,
  });
  const [saved, setSaved] = useState(false);

  // Sync local state with context when panel opens
  useEffect(() => {
    if (isOpen) {
      setLocalKeys(apiKeys);
    }
  }, [isOpen, apiKeys]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKeys(localKeys);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  const handleClear = (key) => {
    setLocalKeys((prev) => ({ ...prev, [key]: "" }));
  };

  const handleToggleShow = (key) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      tabIndex={0}
    >
      <div className="w-full max-w-md bg-[#111827] border-l border-[#1F2937] h-full overflow-y-auto animate-slide-in">
        <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#F0B429]" />
            <h2 className="text-lg font-bold text-[#F8FAFC] font-space-grotesk">
              API Key Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#1F2937] transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5 text-[#8892A4]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[#E2E8F0] font-medium">
              Alpha Vantage API Key
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showKeys.alphaVantage ? "text" : "password"}
                value={localKeys.alphaVantage}
                onChange={(e) =>
                  setLocalKeys((prev) => ({ ...prev, alphaVantage: e.target.value }))
                }
                className="flex-1 px-3 py-2 bg-[#0A0E1A] border border-[#1F2937] rounded text-[#E2E8F0] text-sm focus:outline-none focus:border-[#00D4AA]"
                placeholder="Enter your API key"
              />
              <button
                onClick={() => handleToggleShow("alphaVantage")}
                className="p-2 hover:bg-[#1F2937] rounded transition-colors"
                aria-label={showKeys.alphaVantage ? "Hide key" : "Show key"}
              >
                {showKeys.alphaVantage ? (
                  <EyeOff className="w-4 h-4 text-[#8892A4]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#8892A4]" />
                )}
              </button>
              <button
                onClick={() => handleClear("alphaVantage")}
                className="px-2 py-1 text-xs text-[#FF4D6A] hover:bg-[#FF4D6A]/10 rounded transition-colors"
              >
                Clear
              </button>
            </div>
            <a
              href="https://www.alphavantage.co/support/#api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#00D4AA] hover:underline"
            >
              Free key at alphavantage.co/support
            </a>
            <p className="text-xs text-[#8892A4]">Used for: price history + fundamentals</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#E2E8F0] font-medium">
              Anthropic API Key
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showKeys.anthropic ? "text" : "password"}
                value={localKeys.anthropic}
                onChange={(e) =>
                  setLocalKeys((prev) => ({ ...prev, anthropic: e.target.value }))
                }
                className="flex-1 px-3 py-2 bg-[#0A0E1A] border border-[#1F2937] rounded text-[#E2E8F0] text-sm focus:outline-none focus:border-[#00D4AA]"
                placeholder="Enter your API key"
              />
              <button
                onClick={() => handleToggleShow("anthropic")}
                className="p-2 hover:bg-[#1F2937] rounded transition-colors"
                aria-label={showKeys.anthropic ? "Hide key" : "Show key"}
              >
                {showKeys.anthropic ? (
                  <EyeOff className="w-4 h-4 text-[#8892A4]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#8892A4]" />
                )}
              </button>
              <button
                onClick={() => handleClear("anthropic")}
                className="px-2 py-1 text-xs text-[#FF4D6A] hover:bg-[#FF4D6A]/10 rounded transition-colors"
              >
                Clear
              </button>
            </div>
            <a
              href="https://console.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#00D4AA] hover:underline"
            >
              Free key at console.anthropic.com
            </a>
            <p className="text-xs text-[#8892A4]">Used for: AI sentiment analysis</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#E2E8F0] font-medium">
              Finnhub API Key (optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showKeys.finnhub ? "text" : "password"}
                value={localKeys.finnhub}
                onChange={(e) =>
                  setLocalKeys((prev) => ({ ...prev, finnhub: e.target.value }))
                }
                className="flex-1 px-3 py-2 bg-[#0A0E1A] border border-[#1F2937] rounded text-[#E2E8F0] text-sm focus:outline-none focus:border-[#00D4AA]"
                placeholder="Enter your API key"
              />
              <button
                onClick={() => handleToggleShow("finnhub")}
                className="p-2 hover:bg-[#1F2937] rounded transition-colors"
                aria-label={showKeys.finnhub ? "Hide key" : "Show key"}
              >
                {showKeys.finnhub ? (
                  <EyeOff className="w-4 h-4 text-[#8892A4]" />
                ) : (
                  <Eye className="w-4 h-4 text-[#8892A4]" />
                )}
              </button>
              <button
                onClick={() => handleClear("finnhub")}
                className="px-2 py-1 text-xs text-[#FF4D6A] hover:bg-[#FF4D6A]/10 rounded transition-colors"
              >
                Clear
              </button>
            </div>
            <a
              href="https://finnhub.io/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#00D4AA] hover:underline"
            >
              Free key at finnhub.io
            </a>
            <p className="text-xs text-[#8892A4]">Used for: live news headlines</p>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-[#00D4AA] hover:bg-[#00B894] text-[#0A0E1A] font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Keys Saved!
              </>
            ) : (
              "Save Keys"
            )}
          </button>

          <div className="flex items-start gap-2 p-4 bg-[#F0B429]/10 border border-[#F0B429]/20 rounded-lg">
            <Info className="w-4 h-4 text-[#F0B429] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#8892A4] space-y-1">
              <p>
                <strong className="text-[#F0B429]">Keys are stored in memory only.</strong>
              </p>
              <p>Never sent anywhere except the APIs above.</p>
              <p>Cleared when you close this tab.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
