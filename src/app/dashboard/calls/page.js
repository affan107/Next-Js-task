"use client";

import { useState } from "react";
import CallsTopbar from "../../../components/dashboard/calls/CallsTopbar";
import CallsTable from "../../../components/dashboard/calls/CallsTable";
import { MOCK_CALLS } from "../../../components/dashboard/calls/callsMockData";

export default function CallsPage() {
  const [query, setQuery] = useState("");

  const filtered = MOCK_CALLS.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.contact.toLowerCase().includes(q) ||
      c.suburb.toLowerCase().includes(q) ||
      c.property.toLowerCase().includes(q) ||
      c.bot.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <CallsTopbar
        onSearch={setQuery}
        onDownloadCSV={() => console.log("Download CSV")}
        onLogCall={() => console.log("Log a Call")}
      />
      <CallsTable calls={filtered} />
    </div>
  );
}
