"use client";

import { useState } from "react";
import { Search, Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * PropertiesTopbar
 * Props:
 *  - onSearch?: (query: string) => void
 *  - onNewProperty?: () => void
 *  - searchPlaceholder?: string
 */
export default function PropertiesTopbar({
  onSearch,
  onNewProperty,
  searchPlaceholder = "Type a command or search...",
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="ml-auto mb-3 flex items-center gap-3">
      <div className="w-100 h-10 border-[#4A24AB]  flex items-center gap-2   px-3 rounded-lg border bg-gray-50">
        <Search size={13} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          placeholder={searchPlaceholder}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
        />
      </div>

      {/* New Property CTA */}
      <Button
        onClick={onNewProperty}
        className="w-32 h-10 px-4 bg-[#4A24AB] text-white text-xs font-medium rounded-md shrink-0 gap-1 mr-1"
      >
        <Plus size={13} strokeWidth={2.5} />
        New Property
      </Button>
    </div>
  );
}
