"use client";

import { useState } from "react";
import BatchesTopbar from "../../../components/dashboard/batches/BatchesTopbar";
import BatchesTable from "../../../components/dashboard/batches/BatchesTable";
import BatchSummaryPanel from "../../../components/dashboard/batches/BatchSummaryPanel";
import { MOCK_BATCHES } from "../../../components/dashboard/batches/batchMockData";

export default function BatchesPage() {
  const [batches, setBatches]     = useState(MOCK_BATCHES);
  const [query, setQuery]         = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSchedule = (newBatch) => {
    setBatches((prev) => [newBatch, ...prev]);
  };

  const selectedBatch = selectedId
    ? batches.find((b) => b.id === selectedId) ?? null
    : null;

  const filtered = batches.filter((b) => {
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
      <BatchesTopbar onSearch={setQuery} onSchedule={handleSchedule} />

      <div className="flex flex-1 min-h-0">
        <div className={`${selectedBatch ? "flex-[0_0_40%]" : "flex-1"} border-r border-gray-100 overflow-auto`}>
          <BatchesTable
            batches={filtered}
            selectedId={selectedId}
            compact={!!selectedBatch}
            onRowClick={(b) => setSelectedId((prev) => (prev === b.id ? null : b.id))}
          />
        </div>

        {selectedBatch && (
          <div className="flex-[0_0_60%] overflow-y-auto">
            <div className="border border-slate-200 rounded-md m-4 p-5">
              <BatchSummaryPanel
                key={selectedId}
                batch={selectedBatch}
                onClose={() => setSelectedId(null)}        
                onCopyFailed={() => console.log("Copy failed")}
                onCancelBatch={() => {
                  setBatches((prev) =>
                    prev.map((b) =>
                      b.id === selectedId ? { ...b, status: "Cancelled" } : b
                    )
                  );
                  setSelectedId(null);                    
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}