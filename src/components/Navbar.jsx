import { Activity, Settings } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar = ({ onSearch, onOpenSettings, hasKeys }) => {
  return (
    <nav className="w-full bg-[#0A0E1A] border-b border-[#1F2937] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Activity className="w-6 h-6 text-[#00D4AA]" />
            <span className="text-xl font-bold text-[#F8FAFC] font-space-grotesk">
              StockPulse
            </span>
          </div>

          <div className="flex-1 max-w-xl mx-4 sm:mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

          <button
            onClick={onOpenSettings}
            className="relative p-2 rounded-lg hover:bg-[#111827] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D4AA]"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5 text-[#8892A4] hover:text-[#F8FAFC] transition-colors" />
            <span
              className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                hasKeys ? "bg-[#00D4AA]" : "bg-[#8892A4]"
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
