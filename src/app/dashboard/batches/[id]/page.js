"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import BatchesTopbar from "../../../../components/dashboard/batches/BatchesTopbar";
import BatchesTable from "../../../../components/dashboard/batches/BatchesTable";
import BatchSummaryPanel from "../../../../components/dashboard/batches/BatchSummaryPanel";
import { MOCK_BATCHES } from "../../../../components/dashboard/batches/batchMockData";

export default function BatchDetailPage() {
  const { id } = useParams();

  //  batches in state so new ones created here also appear in the list
  const [batches, setBatches] = useState(MOCK_BATCHES);
  const [selectedId, setSelectedId] = useState(Number(id) || null);

  const handleSchedule = (newBatch) => {
    setBatches((prev) => [newBatch, ...prev]);
    setSelectedId(newBatch.id);
  };

  const selectedBatch = selectedId
    ? (batches.find((b) => b.id === selectedId) ?? null)
    : null;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <BatchesTopbar onSchedule={handleSchedule} />

      <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-6 px-6">
        {/* Left panel — compact batch list */}
        <div className="flex-[0_0_30%] border-r border-gray-100 flex flex-col overflow-x-auto">
          <BatchesTable
            batches={batches}
            selectedId={selectedId}
            compact={!!selectedBatch}
            onRowClick={(b) =>
              setSelectedId((prev) => (prev === b.id ? null : b.id))
            }
          />
        </div>

        {/* Right panel — batch summary driven by selectedBatch */}
        <div className="flex-[0_0_70%] overflow-y-auto">
          <div className="border border-slate-300 rounded-md p-6 my-4 flex flex-col gap-6">
            <BatchSummaryPanel
              key={selectedId}
              batch={selectedBatch}
              onClose={() => setSelectedId(null)}
              onCopyFailed={() => console.log("Copy failed to new batch")}
              onCancelBatch={() => {
                setBatches((prev) =>
                  prev.map((b) =>
                    b.id === selectedId ? { ...b, status: "Cancelled" } : b,
                  ),
                );
                setSelectedId(null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
