"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CallsTopbar from "../../../../components/dashboard/calls/CallsTopbar";
import CallsTable from "../../../../components/dashboard/calls/CallsTable";
import CallDetailPanel from "../../../../components/dashboard/calls/CallDetailPanel";
import {
  MOCK_CALLS,
  MOCK_CALL_DETAIL,
} from "../../../../components/dashboard/calls/callsMockData";

export default function CallDetailPage() {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(Number(id) || 1);

  // In a real app: fetch by selectedId
  const call = { ...MOCK_CALL_DETAIL, id: selectedId };

  // Compact left panel data: address, suburb, type
  const compactData = MOCK_CALLS.map((c) => ({
    ...c,
    address: c.property,
  }));

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <CallsTopbar
        onDownloadCSV={() => console.log("Download CSV")}
        onLogCall={() => console.log("Log a Call")}
      />

      <div className="flex flex-1 min-h-0 gap-6 px-6">
        {/* Left panel — 30%, compact calls list */}
        <div className="flex-[0_0_30%] border-r border-gray-100 flex flex-col overflow-x-auto">
          <CallsTable
            calls={MOCK_CALLS}
            selectedId={selectedId}
            compact
            compactData={compactData}
            onRowClick={(c) => setSelectedId(c.id)}
          />
        </div>

        {/* Right panel — 70%, call detail */}
        <div className="flex-[0_0_70%] overflow-y-auto">
          <div className="border border-slate-300 rounded-md p-6 my-4 flex flex-col gap-6">
            <CallDetailPanel call={call} />
          </div>
        </div>
      </div>
    </div>
  );
}
