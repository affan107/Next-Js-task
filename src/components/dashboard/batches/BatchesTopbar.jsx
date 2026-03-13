"use client";

import { useState } from "react";
import { Search, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBatchModal from "./CreateBatchModal";

/**
 * BatchesTopbar
 * Props:
 *  - onSearch?: (query: string) => void
 *  - searchPlaceholder?: string
 */
export default function BatchesTopbar({
  onSearch,
  searchPlaceholder = "Type a command or search...",
}) {
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="ml-auto mb-3 flex items-center gap-3">
      {/* <div className="flex items-center gap-2 shrink-0">
        <AlignJustify size={14} className="text-gray-400" strokeWidth={1.8} />
        <span className="text-sm font-medium text-gray-700">Batches</span>
      </div> */}

      <div className="w-100 h-10 border-[#4A24AB] flex items-center gap-2 px-3 rounded-md border bg-gray-50">
        <Search size={13} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          placeholder={searchPlaceholder}
          onChange={handleChange}
          className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
        />
      </div>

      <Button
        onClick={() => setOpenModal(true)}
        className="h-10 px-4 bg-[#4A24AB] text-white text-sm font-medium rounded-md shrink-0 mr-1"
      >
        Create New Batch
      </Button>

      <CreateBatchModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
