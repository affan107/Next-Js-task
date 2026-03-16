"use client";

import { useState } from "react";
import { Search, AlignJustify } from "lucide-react";

/**
 * BotsTopbar
 * Props:
 *  - onSearch?: (query: string) => void
 *  - searchPlaceholder?: string
 */
export default function BotsTopbar({
  onSearch,
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
        <span className="text-sm font-medium text-gray-700">Bots</span>
      </div> */}

      <div className="w-100 h-10 border-[#EBEAFD] flex items-center gap-2 px-3 rounded-md border bg-gray-50 mr-2">
        <Search size={13} className="text-gray-400" />
        <input
          type="text"
          value={query}
          placeholder={searchPlaceholder}
          onChange={handleChange}
          className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
        />
      </div>
    </div>
  );
}
