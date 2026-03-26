"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CallsTopbar from "../../../../components/dashboard/calls/CallsTopbar";
import CallsTable from "../../../../components/dashboard/calls/CallsTable";
import CallDetailPanel from "../../../../components/dashboard/calls/CallDetailPanel";
import { MOCK_CALLS } from "../../../../components/dashboard/calls/callsMockData";

export default function CallDetailPage() {
  const { id } = useParams();

  const [calls, setCalls] = useState(MOCK_CALLS);
  const [selectedId, setSelectedId] = useState(Number(id) || null);

  // Look up ACTUAL call object
  const selectedCall = selectedId
    ? (calls.find((c) => c.id === selectedId) ?? null)
    : null;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <CallsTopbar
        onDownloadCSV={() => console.log("Download CSV")}
        onLogCall={() => console.log("Log a Call")}
      />

      <div className="flex flex-1 min-h-0 md:flex-row gap-6 px-6">
        {/* Left panel — compact calls list */}
        <div
          className={`${selectedCall ? "flex-[0_0_30%]" : "flex-1"} border-r border-gray-100 flex flex-col overflow-x-auto`}
        >
          <CallsTable
            calls={calls}
            selectedId={selectedId}
            compact={!!selectedCall}
            onRowClick={(c) =>
              setSelectedId((prev) => (prev === c.id ? null : c.id))
            }
          />
        </div>

        {/* Right panel — only when a call is selected */}
        {selectedCall && (
          <div className="flex-[0_0_70%] overflow-y-auto">
            <div className="border border-slate-300 rounded-md p-6 my-4">
              <CallDetailPanel
                key={selectedId}
                call={selectedCall}
                onClose={() => setSelectedId(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
