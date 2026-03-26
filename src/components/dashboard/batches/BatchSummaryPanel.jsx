"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  PanelLeftOpen,
  ExternalLink,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BatchStatusBadge } from "./BatchesTable";
import { MOCK_BATCH_DETAIL } from "./batchMockData";

function StatRow({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#4A24AB] w-36 shrink-0">
        {label}
      </span>
      <span className="text-sm text-slate-800">{value}</span>
    </div>
  );
}

function AIInsightsSection({ insights }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-lg border border-[#6B3FE8] bg-[#F4F3FF] p-4 flex flex-col gap-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 w-fit"
      >
        <span className="text-sm font-semibold text-slate-700">
          AI Insights
        </span>
        {open ? (
          <ChevronDown size={15} className="text-black ml-0.5" />
        ) : (
          <ChevronUp size={15} className="text-black ml-0.5" />
        )}
      </button>
      {open && (
        <>
          <div className="sm:flex-row sm:flex-wrap gap-3 sm:gap-5">
            {[
              { label: "Qualified Buyers", value: insights.qualifiedBuyers },
              { label: "Attending Event", value: insights.attendingEvent },
              { label: "Top Buyers", value: insights.topBuyers },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full sm:w-auto"
              >
                <span className="text-sm font-medium text-slate-900">{label}</span>
                <span className="text-sm font-normal text-slate-800">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {insights.summary.map((line, i) => (
              <p key={i} className="text-[11px] text-gray-500 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CallsSection({ calls }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-lg border border-slate-500 bg-slate-50 flex flex-col">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-4 py-3 w-fit"
      >
        <span className="text-lg sm:text-xl font-semibold text-slate-800">
          Calls
        </span>

        {open ? (
          <ChevronDown size={15} className="text-slate-600" />
        ) : (
          <ChevronUp size={15} className="text-slate-600" />
        )}
      </button>
      {open && (
        <div className="w-full overflow-x-auto">

          <table className="min-w-150 w-full text-xs border-collapse">

            <thead>
              <tr className="border-b text-slate-500">
                {[
                  "Contact",
                  "Time",
                  "Duration",
                  "Result",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left font-semibold whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {calls.map((call, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 last:border-0 hover:bg-white transition-colors"
                >
                  <td className="px-3 py-2.5 text-slate-800 whitespace-nowrap">
                    {call.contact}
                  </td>

                  <td className="px-3 py-2.5 text-slate-800 whitespace-nowrap">
                    {call.time}
                  </td>

                  <td className="px-3 py-2.5 text-slate-800 whitespace-nowrap">
                    {call.duration}
                  </td>

                  <td className="px-3 py-2.5 text-slate-800 whitespace-nowrap">
                    {call.result}
                  </td>

                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <BatchStatusBadge status={call.status} />
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <button className="text-slate-600">
                        <ExternalLink size={13} strokeWidth={1.8} />
                      </button>
                      <button className="text-[#4A24AB]">
                        <Volume2 size={13} strokeWidth={1.8} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default function BatchSummaryPanel({
  batch = MOCK_BATCH_DETAIL,
  onCopyFailed,
  onCancelBatch,
  onClose,
  onMaximize 
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onMaximize}
            title="Maximize"
            className="text-slate-800 shrink-0"
          >
            <Maximize2 size={14} strokeWidth={1.8} />
          </button>
          <button
            onClick={onClose}
            title="Close panel"
            className="text-slate-800 shrink-0"
          >
            <PanelLeftOpen size={13} strokeWidth={1.8} />
          </button>

          <span className="text-lg sm:text-xl font-semibold text-slate-700">
            Batch Summary
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          <Button
            onClick={onCopyFailed}
            variant="default"
            size="sm"
            className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm font-medium border-[#4A24AB] border bg-[#4A24AB] text-white rounded-md w-full sm:w-auto"
          >
            Copy failed to new batch
          </Button>
          <Button
            onClick={onClose}
            size="sm"
            className="h-9 sm:h-10 px-3 sm:px-4 bg-red-500 text-white text-xs sm:text-sm font-medium rounded-md w-full sm:w-auto"
          >
            Cancel Batch
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#4A24AB]">
            Batch Summary
          </p>

          <p className="text-lg sm:text-xl font-bold text-slate-900 mb-1 wrap-break-word">
            {batch.batchSummary}
          </p>

          <StatRow
            label="Property"
            value={
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                {batch.property}
              </span>
            }
          />
          <StatRow label="Suburb" value={batch.suburb} />
          <StatRow
            label="Status"
            value={<BatchStatusBadge status={batch.status} />}
          />
          <StatRow label="Start Date/Time" value={batch.startDateTime} />
          <StatRow label="Calls Total" value={batch.callsTotal} />
          <StatRow label="Remaining Calls" value={batch.remainingCalls} />
          <StatRow label="% Completed" value={batch.pctCompleted} />
        </div>

        <div className="flex flex-col gap-2.5 md:w-63 w-full">
          <StatRow label="Voicemail Rate" value={batch.voicemailRate} />
          <StatRow label="Dropout Rate" value={batch.dropoutRate} />
          <StatRow label="Hangup Rate" value={batch.hangupRate} />
          <StatRow label="Total Time" value={batch.totalTime} />
          <StatRow label="Average Time" value={batch.averageTime} />
        </div>
      </div>

      <AIInsightsSection insights={batch.aiInsights} />
      <CallsSection calls={batch.calls} />
    </div>
  );
}
