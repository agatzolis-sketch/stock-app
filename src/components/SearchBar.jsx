import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

const SearchBar = ({ onSearch, loading = false }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (value.trim() && !loading) {
      onSearch(value.trim().toUpperCase());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-[#111827] border border-[#1F2937] rounded-lg overflow-hidden focus-within:border-[#00D4AA] transition-colors">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a ticker symbol... (e.g. AAPL, NVDA)"
          className="flex-1 px-4 py-2 bg-transparent text-[#E2E8F0] placeholder-[#8892A4] focus:outline-none font-sans text-sm"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !value.trim()}
          className="px-4 py-2 bg-[#00D4AA] hover:bg-[#00B894] disabled:bg-[#1F2937] disabled:text-[#8892A4] text-[#0A0E1A] transition-colors"
          aria-label="Search"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
