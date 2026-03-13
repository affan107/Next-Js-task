"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import BatchesTopbar from "../../../../components/dashboard/batches/BatchesTopbar";
import BatchesTable from "../../../../components/dashboard/batches/BatchesTable";
import BatchSummaryPanel from "../../../../components/dashboard/batches/BatchSummaryPanel";
import {
  MOCK_BATCHES,
  MOCK_BATCH_DETAIL,
} from "../../../../components/dashboard/batches/batchMockData";

export default function BatchDetailPage() {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(Number(id) || 1);

  // In real app: fetch by selectedId
  const batch = { ...MOCK_BATCH_DETAIL, id: selectedId };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <BatchesTopbar />

      <div className="flex flex-1 min-h-0 gap-6 px-6">
        {/* Left panel — 30%, compact batch list */}
        <div className="flex-[0_0_30%] border-r border-gray-100 flex flex-col overflow-x-auto">
          <BatchesTable
            batches={MOCK_BATCHES}
            selectedId={selectedId}
            compact
            onRowClick={(b) => setSelectedId(b.id)}
          />
        </div>

        {/* Right panel — 70%, batch summary */}
        <div className="flex-[0_0_70%] overflow-y-auto">
          <div className="border border-slate-300 rounded-md p-6 my-4 flex flex-col gap-6">
            <BatchSummaryPanel
              batch={batch}
              onCopyFailed={() => console.log("Copy failed to new batch")}
              onCancelBatch={() => console.log("Cancel batch", selectedId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
