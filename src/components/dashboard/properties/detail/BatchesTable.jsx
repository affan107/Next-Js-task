"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import PropertyStatusBadge from "../PropertyStatusBadge";

function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 group w-fit"
      >
        <span className="text-xl font-semibold text-slate-800">{title}</span>
        {open ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
      </button>
      {open && children}
    </div>
  );
}

function MiniTable({ columns, rows, renderCell }) {
  return (
    <div className="rounded-lg border bg-slate-50 p-4 flex flex-col gap-3 ">
      <CollapsibleSection title="Batches">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-xs border-collapse">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left font-semibold text-slate-500"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-2 text-left font-semibold text-slate-500 ">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 last:border-0 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2 text-slate-800">
                    {renderCell(col.key, row)}
                  </td>
                ))}
                <td className="px-3 py-2">
                  <button className="text-black">
                    <MoreHorizontal size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </CollapsibleSection>
    </div>
  );
}

const BATCH_COLUMNS = [
  { key: "name", label: "Batch" },
  { key: "time", label: "Time" },
  { key: "calls", label: "Calls" },
  { key: "bot", label: "Bot" },
  { key: "status", label: "Status" },
  { key: "pct", label: "%" },
];

const MOCK_BATCHES = [
  {
    name: "Follow up #1",
    time: "11:00am, 14-Mar-25",
    calls: 100,
    bot: "Lead Bot 2",
    status: "Completed",
    pct: "100%",
  },
  {
    name: "Follow up #2",
    time: "12:00pm, 14-Mar-25",
    calls: 150,
    bot: "Lead Bot 2",
    status: "In Progress",
    pct: "80%",
  },
  {
    name: "Follow up #3",
    time: "2:00pm, 14-Mar-25",
    calls: 150,
    bot: "Follow-up",
    status: "Scheduled",
    pct: "0%",
  },
];

export function BatchesTable({ batches = MOCK_BATCHES }) {
  return (
    <MiniTable
      columns={BATCH_COLUMNS}
      rows={batches}
      renderCell={(key, row) => {
        if (key === "status")
          return <PropertyStatusBadge status={row.status} />;
        if (key === "pct")
          return <span className="font-semibold text-gray-700">{row.pct}</span>;
        return row[key] ?? "—";
      }}
    />
  );
}
