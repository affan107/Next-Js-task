"use client";

import { useState } from "react";
import { Search, AlignJustify } from "lucide-react";

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
    <div className="flex flex-wrap w-full items-center gap-3">
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
