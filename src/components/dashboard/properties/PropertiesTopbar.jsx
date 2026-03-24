"use client";

import { useState } from "react";
import { Search, Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyDescriptionModal from "./detail/PropertyDescriptionModal";

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
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="flex flex-wrap w-full items-center gap-3">
      <div className="w-100 h-10 border-[#EBEAFD]  flex items-center gap-2   px-3 rounded-lg border bg-gray-50">
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

      <PropertyDescriptionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
