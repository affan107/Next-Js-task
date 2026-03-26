"use client";

import { useState } from "react";
import CallsTopbar from "../../../components/dashboard/calls/CallsTopbar";
import CallsTable from "../../../components/dashboard/calls/CallsTable";
import CallDetailPanel from "../../../components/dashboard/calls/CallDetailPanel";
import { MOCK_CALLS } from "../../../components/dashboard/calls/callsMockData";
import TopbarSlot from "@/components/dashboard/topbar/TopbarSlot";

export default function CallsPage() {
  const [calls, setCalls]         = useState(MOCK_CALLS);
  const [query, setQuery]         = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [maximized, setMaximized] = useState(false);
 
  // Look up full call object by id
  const selectedCall = selectedId ? calls.find((c) => c.id === selectedId) ?? null : null;
 
  const filtered = calls.filter((c) => {
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
      <TopbarSlot>
      <CallsTopbar
        onSearch={setQuery}
        onDownloadCSV={() => console.log("Download CSV")}
        onLogCall={() => console.log("Log a Call")}
      />
      </TopbarSlot>
 
      <div className="flex flex-1 flex-col md:flex-row gap-4 lg:gap-0 min-h-0">
        {/* Table — shrinks when panel open */}
        {!maximized && (
        <div className={`${selectedCall ? "flex-[0_0_40%]" : "flex-1"} border-r border-gray-100 overflow-auto`}>
          <CallsTable
            calls={filtered}
            selectedId={selectedId}
            compact={false}
            onRowClick={(c) => setSelectedId((prev) => (prev === c.id ? null : c.id))}
          />
        </div>
        )}
 
        {/* Detail panel — only when a call is selected */}
        {selectedCall && (
          <div className={maximized ? "flex-1 overflow-y-auto" : "flex-[0_0_60%] overflow-y-auto"}>
            <div className="border border-slate-200 rounded-md lg:ml-2 p-5">
              <CallDetailPanel
                key={selectedId}      
                call={selectedCall}
                onMaximize={() => setMaximized((v) => !v)}
                onClose={() => { setSelectedId(null); setMaximized(false); }}         
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
