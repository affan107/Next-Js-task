"use client";

import { useState } from "react";
import BatchesTopbar from "../../../components/dashboard/batches/BatchesTopbar";
import BatchesTable from "../../../components/dashboard/batches/BatchesTable";
import { MOCK_BATCHES } from "../../../components/dashboard/batches/batchMockData";

export default function BatchesPage() {
  const [query, setQuery] = useState("");

  const filtered = MOCK_BATCHES.filter((b) => {
    const q = query.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q) ||
      b.suburb.toLowerCase().includes(q) ||
      b.bot.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <BatchesTopbar onSearch={setQuery} />
      <BatchesTable batches={filtered} />
    </div>
  );
}
