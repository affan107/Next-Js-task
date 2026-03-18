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
import { MOCK_CONTACTS } from "./contactsMockData";
import { cn } from "@/lib/utils";

// Contact status badge 
const STATUS_STYLES = {
  "Looking to purchase": "bg-[#C8FFDC] text-[#15813D]",
  "Looking to sell": "bg-[#BFE2FF] text-[#2C96F0]",
  "Not looking": "bg-[#FFC5C5] text-[#B42941]",
  Completed: "bg-[#EDE9FE] text-[#4A24AB]",
};

export function ContactStatusBadge({ status, className }) {
  const styles = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap border",
        styles,
        className,
      )}
    >
      {status}
    </span>
  );
}

// Column definitions 
const COLUMNS = [
  { key: "name", label: "Name", sortable: true },
  { key: "phone", label: "Phone Number", sortable: true },
  { key: "properties", label: "Properties", sortable: true },
  { key: "calls", label: "Calls", sortable: true },
  { key: "lastContacted", label: "Last Contacted", sortable: true },
  { key: "interested", label: "Interested", sortable: false },
  { key: "status", label: "Status", sortable: true },
];

const COMPACT_COLUMNS = [
  { key: "name", label: "Name", sortable: true },
  { key: "address", label: "Address", sortable: true },
  { key: "status", label: "Status", sortable: true },
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

function RowActions({ onView, onEdit, onDelete }) {
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
          Edit contact
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

export default function ContactsTable({
  contacts = MOCK_CONTACTS,
  selectedId,
  onRowClick,
  compact = false,
}) {
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [checked, setChecked] = useState(new Set());

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...contacts].sort((a, b) => {
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
              {/* Checkbox col — full table only */}
              {!compact && (
                <th className="w-8 px-3 py-2.5">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                    onChange={() => {}}
                  />
                </th>
              )}
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
            {sorted.map((contact) => {
              const isSelected = selectedId === contact.id;
              return (
                <tr
                  key={contact.id}
                  onClick={() => onRowClick?.(contact)}
                  className={cn(
                    "border-b border-gray-50 cursor-pointer transition-colors duration-100",
                    isSelected
                      ? "bg-[#EBEAFD] border-[#E2E8F0]"
                      : "hover:bg-gray-50",
                  )}
                >
                  {!compact && (
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={checked.has(contact.id)}
                        onChange={() =>
                          setChecked((prev) => {
                            const next = new Set(prev);
                            next.has(contact.id)
                              ? next.delete(contact.id)
                              : next.add(contact.id);
                            return next;
                          })
                        }
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                      />
                    </td>
                  )}
                  {visibleColumns.map((col) => (
                    <td
                      key={col.key}
                      className="px-3 py-2.5 text-xs text-slate-800 whitespace-nowrap"
                    >
                      {col.key === "status" ? (
                        <ContactStatusBadge status={contact.status} />
                      ) : (
                        (contact[col.key] ?? "—")
                      )}
                    </td>
                  ))}
                  {!compact && (
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RowActions
                        onView={() => onRowClick?.(contact)}
                        onEdit={() => onRowClick?.(contact)}
                        onDelete={() => console.log("delete", contact.id)}
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
