"use client";

import { useState } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AVAILABLE_PROPERTIES } from "./contactsMockData";
import { cn } from "@/lib/utils";

// Reuse PropertyStatusBadge colours
const PROP_STATUS_STYLES = {
  "Pre-Launched": "bg-[#BFE2FF] text-[#2C96F0]",
  Live: "bg-[#C8FFDC] text-[#15813D]",
  Closed: "bg-[#FFC5C5] text-[#B42941]",
};

function PropStatusBadge({ status }) {
  const style = PROP_STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border whitespace-nowrap",
        style,
      )}
    >
      {status}
    </span>
  );
}

const COLUMNS = [
  { key: "address", label: "Address" },
  { key: "suburb", label: "Suburb" },
  { key: "agent", label: "Agent" },
  { key: "batch", label: "Batch" },
  { key: "type", label: "Type" },
  { key: "description", label: "Description" },
  { key: "listed", label: "Listed" },
  { key: "auction", label: "Auction" },
  { key: "status", label: "Status" },
];

/**
 * AddPropertyModal
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onAdd: (selectedProperties: array) => void
 *  - alreadyAdded?: string[]   — addresses already linked
 */
export default function AddPropertyModal({
  open,
  onClose,
  onAdd,
  alreadyAdded = [],
}) {
  const [selected, setSelected] = useState(new Set());

  if (!open) return null;

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleAdd = () => {
    const chosenProps = AVAILABLE_PROPERTIES.filter((p) => selected.has(p.id));
    onAdd?.(chosenProps);
    setSelected(new Set());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[820px] max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <h2 className="text-sm font-bold text-[#4A24AB]">Properties</h2>
        </div>

        {/* Scrollable table */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full text-xs border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-gray-100">
                <th className="w-8 px-3 py-2.5" />
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      <ChevronDown size={10} className="text-slate-400" />
                    </div>
                  </th>
                ))}
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    Action <ChevronDown size={10} className="text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {AVAILABLE_PROPERTIES.map((prop) => {
                const isChecked = selected.has(prop.id);
                return (
                  <tr
                    key={prop.id}
                    className={cn(
                      "border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer",
                      isChecked && "bg-[#EBEAFD]",
                    )}
                    onClick={() => toggle(prop.id)}
                  >
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(prop.id)}
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                      />
                    </td>
                    {COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 py-2.5 text-xs text-slate-800 whitespace-nowrap"
                      >
                        {col.key === "status" ? (
                          <PropStatusBadge status={prop.status} />
                        ) : col.key === "description" ? (
                          <span className="text-slate-500 truncate max-w-[100px] block">
                            {prop[col.key]}
                          </span>
                        ) : (
                          (prop[col.key] ?? "—")
                        )}
                      </td>
                    ))}
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="text-gray-400 hover:text-gray-700">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-5 text-sm font-medium border-slate-200 text-slate-600 rounded-md"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={selected.size === 0}
            className="h-9 px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md disabled:opacity-40"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
