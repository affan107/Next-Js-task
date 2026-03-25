"use client";

import { useState } from "react";
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
import { MOCK_BOTS } from "./botsMockData";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { key: "name", label: "Bot", sortable: true },
  { key: "stage", label: "Stage", sortable: true },
  { key: "activity", label: "Activity", sortable: true },
  { key: "description", label: "Description", sortable: false },
  { key: "type", label: "Type", sortable: true },
  { key: "botTemplate", label: "Bot Template", sortable: true },
  { key: "voice", label: "Voice", sortable: true },
];

const COMPACT_COLUMNS = [
  { key: "name", label: "Bot", sortable: true },
  { key: "stage", label: "Stage", sortable: true },
  { key: "activity", label: "Activity", sortable: true },
  { key: "description", label: "Description", sortable: false },
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

function RowActions({ onEdit, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-7 h-7 rounded-md text-slate-800 hover:bg-gray-100 hover:text-gray-700 transition-all">
          <MoreHorizontal size={15} strokeWidth={1.8} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={onEdit}
          className="text-xs gap-2 cursor-pointer"
        >
          View bot
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
 * BotsTable
 * Props:
 *  - bots?: array
 *  - selectedId?: number        — highlights row + drives summary panel
 *  - onRowClick?: (bot) => void
 *  - compact?: boolean
 *  - onEdit?: (bot) => void
 */
export default function BotsTable({
  bots = MOCK_BOTS,
  selectedId,
  onRowClick,
  compact = false,
  onEdit,
}) {
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...bots].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = String(av).localeCompare(String(bv), undefined, {
      numeric: true,
    });
    return sortDir === "asc" ? cmp : -cmp;
  });

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
            {sorted.map((bot) => {
              const isSelected = selectedId === bot.id;
              return (
                <tr
                  key={bot.id}
                  onClick={() => onRowClick?.(bot)}
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
                      className={cn(
                        "px-3 py-2.5 text-xs text-slate-800 whitespace-nowrap",
                        col.key === "description" &&
                          "max-w-40 truncate text-slate-500",
                      )}
                    >
                      {bot[col.key] ?? "—"}
                    </td>
                  ))}
                  {!compact && (
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActions
                        onEdit={() => onEdit?.(bot)}
                        onDelete={() => console.log("delete", bot.id)}
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
