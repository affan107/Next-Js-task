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
import { MOCK_BATCHES } from "./batchMockData";
import { cn } from "@/lib/utils";

const BATCH_STATUS_STYLES = {
  Completed: "bg-[#C8FFDC] text-[#15813D]",
  "IN progress": "bg-[#BFE2FF] text-[#2C96F0]",
  Scheduled: "bg-[#EDE9FE] text-[#4A24AB]",
  Cancelled: "bg-[#FFC5C5] text-[#B42941]",
};

export function BatchStatusBadge({ status, className }) {
  const styles = BATCH_STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border whitespace-nowrap",
        styles,
        className,
      )}
    >
      {status}
    </span>
  );
}

const COLUMNS = [
  { key: "name", label: "Batch", sortable: true },
  { key: "address", label: "Address", sortable: true },
  { key: "suburb", label: "Suburb", sortable: true },
  { key: "bot", label: "Bot", sortable: true },
  { key: "list", label: "List", sortable: true },
  { key: "time", label: "Time", sortable: true },
  { key: "callsTotal", label: "Calls Total", sortable: true },
  { key: "remaining", label: "Remaining", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "pct", label: "%", sortable: false },
];

const COMPACT_COLUMNS = [
  { key: "address", label: "Address", sortable: true },
  { key: "suburb", label: "Suburb", sortable: true },
  { key: "bot", label: "Bot", sortable: true },
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

function BatchRowActions({ batchId, onView, onEdit, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-7 h-7 rounded-md text-slate-800">
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
        <DropdownMenuItem
          onClick={onEdit}
          className="text-xs gap-2 cursor-pointer"
        >
          Edit batch
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

/**
 * BatchesTable
 * Props:
 *  - batches?: array        — defaults to MOCK_BATCHES
 *  - selectedId?: number    — highlight a row (detail left panel)
 *  - onRowClick?: (batch) => void
 *  - compact?: boolean      — narrower version for left panel
 */
export default function BatchesTable({
  batches = MOCK_BATCHES,
  selectedId,
  onRowClick,
  compact = false,
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

  const sorted = [...batches].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = String(av).localeCompare(String(bv), undefined, {
      numeric: true,
    });
    return sortDir === "asc" ? cmp : -cmp;
  });

  const handleRowClick = (batch) => {
    if (onRowClick) onRowClick(batch);
    else router.push(`/dashboard/batches/${batch.id}`);
  };

  const visibleColumns = compact ? COMPACT_COLUMNS : COLUMNS;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="overflow-auto flex-1">
        <table className="min-w-full text-xs border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-100">
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    "px-3 py-2.5 text-xs font-semibold text-slate-500 whitespace-nowrap select-none text-left",
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
            {sorted.map((batch) => {
              const isSelected = selectedId === batch.id;
              return (
                <tr
                  key={batch.id}
                  onClick={() => handleRowClick(batch)}
                  className={cn(
                    "border-b border-gray-50 cursor-pointer transition-colors duration-100",
                    isSelected
                      ? "bg-[#EBEAFD] border-[#E2E8F0]"
                      : "hover:bg-gray-50",
                  )}
                >
                  {visibleColumns.map((col) => (
                    <td
                      key={col.key}
                      className="px-3 py-2.5 text-xs text-slate-800 whitespace-nowrap"
                    >
                      {col.key === "status" ? (
                        <BatchStatusBadge status={batch.status} />
                      ) : col.key === "pct" ? (
                        <span className="font-semibold text-gray-700">
                          {batch.pct}
                        </span>
                      ) : (
                        (batch[col.key] ?? "—")
                      )}
                    </td>
                  ))}
                  {!compact && (
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BatchRowActions
                        batchId={batch.id}
                        onView={() =>
                          router.push(`/dashboard/batches/${batch.id}`)
                        }
                        onEdit={() => console.log("edit", batch.id)}
                        onDelete={() => console.log("delete", batch.id)}
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
