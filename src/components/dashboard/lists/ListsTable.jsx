"use client";

import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
  ChevronDown as ChevDown,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MOCK_LISTS } from "./listsMockData";
import { cn } from "@/lib/utils";

// ── Column definitions ────────────────────────────────────────────────────────
const COLUMNS = [
  { key: "name", label: "List", sortable: true },
  { key: "propertyStr", label: "Property", sortable: true },
  { key: "contacts", label: "Contacts", sortable: true },
  { key: "completedBatch", label: "Completed Batch", sortable: true },
  { key: "latestBatch", label: "Latest Batch", sortable: true },
  { key: "createdDate", label: "Created Date", sortable: true },
];

const COMPACT_COLUMNS = [
  { key: "name", label: "List", sortable: true },
  { key: "propertyStr", label: "Property", sortable: true },
  { key: "contacts", label: "Contacts", sortable: true },
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

function RowActions({ onView, onDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-7 h-7 rounded-md text-slate-800">
          <MoreHorizontal size={15} strokeWidth={1.8} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={onView} className="text-xs cursor-pointer">
          View detail
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="text-xs cursor-pointer text-red-500 focus:text-red-500"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * ListsTable
 * Props:
 *  - lists?: array
 *  - selectedId?: number
 *  - onRowClick?: (list) => void
 *  - compact?: boolean
 */
export default function ListsTable({
  lists = MOCK_LISTS,
  selectedId,
  onRowClick,
  compact = false,
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

  // Flatten properties array → display string for sorting/display
  const withStr = lists.map((l) => ({
    ...l,
    propertyStr: [...new Set(l.properties)].join(", "),
  }));

  const sorted = [...withStr].sort((a, b) => {
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
            {sorted.map((list) => {
              const isSelected = selectedId === list.id;
              return (
                <tr
                  key={list.id}
                  onClick={() => onRowClick?.(list)}
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
                      {col.key === "propertyStr" ? (
                        <div className="flex gap-1 flex-wrap">
                          {[...new Set(list.properties)].map((p) => (
                            <span
                              key={p}
                              className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      ) : (
                        (list[col.key] ?? "—")
                      )}
                    </td>
                  ))}
                  {!compact && (
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActions
                        onView={() => onRowClick?.(list)}
                        onDelete={() => console.log("delete", list.id)}
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
