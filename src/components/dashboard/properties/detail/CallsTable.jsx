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
      <CollapsibleSection title="Calls">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-150 border-collapse">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left font-semibold text-slate-5 00 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-3 py-2 text-left font-semibold text-slate-500 w-8">
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
                  <td key={col.key} className="px-3 py-2 text-slate-800 whitespace-nowrap">
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

const CALL_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "time", label: "Time" },
  { key: "duration", label: "Duration" },
  { key: "bot", label: "Bot" },
  { key: "callStatus", label: "Call Status" },
  { key: "pct", label: "%" },
];

const MOCK_CALLS = [
  {
    name: "Follow up #2",
    time: "12:00pm, 14-Mar-25",
    duration: "2d 1m",
    bot: "Lead Bot 1",
    callStatus: "In Progress",
    pct: "80%",
  },
  {
    name: "Follow up #3",
    time: "2:00pm, 15-Mar-25",
    duration: "6h 20s",
    bot: "Follow-up",
    callStatus: "Scheduled",
    pct: "0%",
  },
  {
    name: "Follow up #4",
    time: "2:00pm, 14-Mar-25",
    duration: "3m 30s",
    bot: "Follow up",
    callStatus: "Scheduled",
    pct: "5%",
  },
];

export function CallsTable({ calls = MOCK_CALLS }) {
  return (
    <MiniTable
      columns={CALL_COLUMNS}
      rows={calls}
      renderCell={(key, row) => {
        if (key === "callStatus")
          return <PropertyStatusBadge status={row.callStatus} />;
        if (key === "pct")
          return <span className="font-semibold text-gray-700">{row.pct}</span>;
        return row[key] ?? "—";
      }}
    />
  );
}
