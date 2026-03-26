"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_CALLS } from "./callsMockData";
import { cn } from "@/lib/utils";

const CALL_STATUS_STYLES = {
  Completed: "bg-[#C8FFDC] text-[#15813D]",
  "IN progress": "bg-[#BFE2FF] text-[#2C96F0]",
  Scheduled: "bg-[#EDE9FE] text-[#4A24AB]",
  Cancelled: "bg-[#FFC5C5] text-[#B42941]",
};

export function CallStatusBadge({ status, className }) {
  const styles = CALL_STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border",
        styles,
        className,
      )}
    >
      {status}
    </span>
  );
}

const COLUMNS = [
  { key: "contact", label: "Contact", sortable: true },
  { key: "suburb", label: "Suburb", sortable: true },
  { key: "property", label: "Property", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "batch", label: "Batch", sortable: true },
  { key: "bot", label: "Bot", sortable: true },
  { key: "time", label: "Time", sortable: true },
  { key: "duration", label: "Duration", sortable: true },
  { key: "successEvaluation", label: "Success Evaluation", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

const COMPACT_COLUMNS = [
  { key: "address", label: "Address", sortable: true },
  { key: "suburb", label: "Suburb", sortable: true },
  { key: "type", label: "Type", sortable: true },
];

function SortIcon({ column, sortKey, sortDir }) {
  if (sortKey !== column)
    return <ChevronsUpDown size={11} className="text-gray-300 ml-1 shrink-0" />;
  return sortDir === "asc" ? (
    <ChevronUp size={11} className="text-[#4A24AB] ml-1 shrink-0" />
  ) : (
    <ChevronDown size={11} className="text-[#4A24AB] ml-1 shrink-0" />
  );
}

function RowActions({ callId, onView, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-7 h-7 rounded-md text-slate-900">
          <MoreHorizontal size={15} strokeWidth={1.8} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={onView}
          className="text-xs gap-2 cursor-pointer"
        >
          View detail
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="text-xs gap-2 cursor-pointer text-red-500 focus:text-red-500"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function CallsTable({
  calls = MOCK_CALLS,
  selectedId,
  onRowClick,
  compact = false,
  compactData,
}) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState("time");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // Compact mode uses address-shaped data
  const data = compact
    ? (compactData ?? calls.map((c) => ({ ...c, address: c.property })))
    : calls;

  const sorted = [...data].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = String(av).localeCompare(String(bv), undefined, {
      numeric: true,
    });
    return sortDir === "asc" ? cmp : -cmp;
  });

  const handleRowClick = (call) => {
    if (onRowClick) onRowClick(call);
    else router.push(`/dashboard/calls/${call.id}`);
  };

  const visibleColumns = compact ? COMPACT_COLUMNS : COLUMNS;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="overflow-auto flex-1">
        <table className="min-w-full text-xs border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-slate-300">
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    "px-3 py-2.5 text-xs font-semibold text-slate-500 select-none text-left",
                    col.sortable && "cursor-pointer hover:text-slate-700",
                  )}
                >
                  <div className="flex items-center">
                    {col.label}
                    {col.sortable && (
                      <SortIcon
                        column={col.key}
                        sortKey={sortKey}
                        sortDir={sortDir}
                      />
                    )}
                  </div>
                </th>
              ))}
              {!compact && (
                <th className="px-3 py-2.5 text-xs font-semibold text-slate-500 text-left">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.map((call) => {
              const isSelected = selectedId === call.id;
              return (
                <tr
                  key={call.id}
                  onClick={() => handleRowClick(call)}
                  className={cn(
                    "border-b border-slate-300 cursor-pointer transition-colors duration-100",
                    isSelected
                      ? "bg-[#EBEAFD] border-[#E2E8F0]"
                      : "hover:bg-gray-50",
                  )}
                >
                  {visibleColumns.map((col) => (
                    <td
                      key={col.key}
                      className="px-3 py-2.5 text-xs text-slate-800"
                    >
                      {col.key === "status" ? (
                        <CallStatusBadge status={call.status} />
                      ) : (
                        (call[col.key] ?? "—")
                      )}
                    </td>
                  ))}
                  {!compact && (
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActions
                        callId={call.id}
                        onView={() =>
                          router.push(`/dashboard/calls/${call.id}`)
                        }
                        onDelete={() => console.log("delete", call.id)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
