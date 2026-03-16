"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  ExternalLink,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BatchStatusBadge } from "./BatchesTable";
import { MOCK_BATCH_DETAIL } from "./batchMockData";

// ── Stat row: purple label + value ────────────────────────────────────────────
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

// ── AI Insights card — same style as AIInsightsCard in properties ─────────────
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
          {[
            { label: "Qualified Buyers", value: insights.qualifiedBuyers },
            { label: "Attending Event", value: insights.attendingEvent },
            { label: "Top Buyers", value: insights.topBuyers },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-10">
              <span className="text-sm font-medium text-slate-900">
                {label}
              </span>
              <span className="text-sm font-normal text-slate-800">
                {value}
              </span>
            </div>
          ))}
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
        <span className="text-xl font-semibold text-slate-800">Calls</span>
        {open ? (
          <ChevronDown size={15} className="text-slate-600" />
        ) : (
          <ChevronUp size={15} className="text-slate-600" />
        )}
      </button>
      {open && (
        <table className="w-full text-xs border-collapse">
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
                  className="px-3 py-2 text-left font-semibold text-slate-500 whitespace-nowrap"
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
                <td className="px-3 py-2.5 text-slate-800">{call.contact}</td>
                <td className="px-3 py-2.5 text-slate-800">{call.time}</td>
                <td className="px-3 py-2.5 text-slate-800">{call.duration}</td>
                <td className="px-3 py-2.5 text-slate-800">{call.result}</td>
                <td className="px-3 py-2.5">
                  <BatchStatusBadge status={call.status} />
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    <button className="text-slate-600 w-4 h-4">
                      <ExternalLink size={13} strokeWidth={1.8} />
                    </button>
                    <button className="text-[#4A24AB] w-4 h-4">
                      <Volume2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function BatchSummaryPanel({
  batch = MOCK_BATCH_DETAIL,
  onCopyFailed,
  onCancelBatch,
  onClose,
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            title="Close panel"
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <Maximize2 size={14} strokeWidth={1.8} />
          </button>
          <span className="text-xl font-semibold text-slate-700">
            Batch Summary
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onCopyFailed}
            variant="default"
            size="sm"
            className="h-10 px-4 text-sm font-medium border-[#4A24AB] border bg-[#4A24AB] text-white rounded-md"
          >
            Copy failed to new batch
          </Button>
          <Button
            onClick={onCancelBatch}
            size="sm"
            className="h-10 px-4 bg-red-500 text-white text-sm font-medium rounded-md"
          >
            Cancel Batch
          </Button>
        </div>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-col gap-2.5 flex-1">
          <p className="text-sm font-semibold text-slate-500">Batch Summary</p>
          <p className="text-xl font-bold text-slate-900 mb-1">
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

        <div className="flex flex-col gap-2.5 shrink-0">
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
