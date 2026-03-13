"use client";

import { useState } from "react";
import { Search, AlignJustify, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * CallsTopbar
 * Props:
 *  - onSearch?: (query: string) => void
 *  - onDownloadCSV?: () => void
 *  - onLogCall?: () => void
 *  - searchPlaceholder?: string
 */
export default function CallsTopbar({
  onSearch,
  onDownloadCSV,
  onLogCall,
  searchPlaceholder = "Type a command or search...",
}) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="ml-auto mb-3 flex items-center gap-3">
      {/* <div className="flex items-center gap-2 shrink-0">
        <AlignJustify size={14} className="text-gray-400" strokeWidth={1.8} />
        <span className="text-sm font-medium text-gray-700">Calls</span>
      </div> */}

      <div className="w-100 h-10 border-[#EBEAFD] flex items-center gap-2 px-3 rounded-md border bg-gray-50">
        <Search size={13} className="text-white shrink-0" />
        <input
          type="text"
          value={query}
          placeholder={searchPlaceholder}
          onChange={handleChange}
          className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
        />
      </div>

      <Button
        onClick={onDownloadCSV}
        variant="outline"
        className="h-10 px-4 text-sm font-medium border-[#4A24AB] border text-[#4A24AB] hover:bg-purple-50 rounded-md shrink-0 gap-1.5"
      >
        Download CSV
      </Button>

      <Button
        onClick={onLogCall}
        className="h-10 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-medium rounded-md shrink-0 mr-1"
      >
        Log a Call
      </Button>
    </div>
  );
}
