"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import PropertyStatusBadge from "./PropertyStatusBadge";
import PropertyRowActions from "./PropertyRowActions";
import { cn } from "@/lib/utils";

//  Mock data 
export const MOCK_PROPERTIES = [
  {
    id: 1,
    address: "35 Jones St",
    suburb: "Balmain",
    agent: "John Mcmahon",
    batch: 5,
    type: "Sale",
    description: "A 4-bed 5-bath mansion in heart of balmain.",
    listed: "13-Mar-25",
    auction: "13-Apr-25",
    status: "Pre-Launched",
  },
  {
    id: 2,
    address: "10 Bird St",
    suburb: "Five Dock",
    agent: "Barbara Darcean",
    batch: 6,
    type: "Rental",
    description: "A 3-bed 2-bath appartmnet in barbara dercean..",
    listed: "14-Mar-25",
    auction: "14-Apr-25",
    status: "Live",
  },
  {
    id: 3,
    address: "21 Thompson St",
    suburb: "Drummoyne",
    agent: "Ryan Steffani",
    batch: 7,
    type: "Sale",
    description: "A cozy 2-bed 1-bathroom in thompson st..",
    listed: "15-Mar-25",
    auction: "15-Apr-25",
    status: "Live",
  },
  {
    id: 4,
    address: "77 Oak Rd",
    suburb: "Strathfield",
    agent: "Sofia Vargas",
    batch: 8,
    type: "Rental",
    description: "A luxurious penthagon in Strathfield..",
    listed: "16-Mar-25",
    auction: "16-Apr-25",
    status: "Closed",
  },
  {
    id: 5,
    address: "5 Pine Ln",
    suburb: "Burwood",
    agent: "David Beckham",
    batch: 9,
    type: "Rental",
    description: "A charming studio...",
    listed: "17-Mar-25",
    auction: "17-Apr-25",
    status: "Pre-Launched",
  },
  {
    id: 6,
    address: "14 Cedar Blvd",
    suburb: "Ashfield",
    agent: "Emma Stone",
    batch: 10,
    type: "Sale",
    description: "A spacious 5-bed...",
    listed: "18-Mar-25",
    auction: "18-Apr-25",
    status: "Live",
  },
];

//  Column definitions 
const COLUMNS = [
  { key: "address", label: "Address", sortable: true, width: "w-[140px]" },
  { key: "suburb", label: "Suburb", sortable: true, width: "w-[110px]" },
  { key: "agent", label: "Agent", sortable: true, width: "w-[140px]" },
  { key: "batch", label: "Batch", sortable: true, width: "w-[70px]" },
  { key: "type", label: "Type", sortable: true, width: "w-[80px]" },
  {
    key: "description",
    label: "Description",
    sortable: false,
    width: "w-[160px]",
  },
  { key: "listed", label: "Listed", sortable: true, width: "w-[100px]" },
  { key: "auction", label: "Auction", sortable: true, width: "w-[100px]" },
  { key: "status", label: "Status", sortable: true, width: "w-[120px]" },
];

//  Sort icon helper 
function SortIcon({ column, sortKey, sortDir }) {
  if (sortKey !== column)
    return <ChevronsUpDown size={11} className="text-gray-300 ml-1 shrink-0" />;
  return sortDir === "asc" ? (
    <ChevronUp size={11} className="text-[#4B3FD4] ml-1 shrink-0" />
  ) : (
    <ChevronDown size={11} className="text-[#4B3FD4] ml-1 shrink-0" />
  );
}

/**
 * PropertiesTable
 * Props:
 *  - properties?: array     — defaults to MOCK_PROPERTIES
 *  - selectedId?: number    — highlight a row (used on detail page left panel)
 *  - onRowClick?: (property) => void
 *  - compact?: boolean      — narrower version for left panel on detail page
 */
export default function PropertiesTable({
  properties = MOCK_PROPERTIES,
  selectedId,
  onRowClick,
  compact = false,
}) {
  const router = useRouter();
  const [sortKey, setSortKey] = useState("listed");
  const [sortDir, setSortDir] = useState("asc");
  const [selected, setSelected] = useState(new Set());

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...properties].sort((a, b) => {
    const av = a[sortKey] ?? "";
    const bv = b[sortKey] ?? "";
    const cmp = String(av).localeCompare(String(bv), undefined, {
      numeric: true,
    });
    return sortDir === "asc" ? cmp : -cmp;
  });

  const handleRowClick = (property) => {
    if (onRowClick) {
      onRowClick(property);
    } else {
      router.push(`/dashboard/properties/${property.id}`);
    }
  };

  // Compact mode (detail page left panel) shows fewer columns
  const visibleColumns = compact
    ? COLUMNS.filter((c) => ["address", "suburb", "agent"].includes(c.key))
    : COLUMNS;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="overflow-auto flex-1">
        <table className="min-w-full text-xs border-collapse">
          {/* ── Head ── */}
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-100">
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    "w-9.5 px-3 py-2.5 text-xs font-semibold text-slate-500 whitespace-nowrap select-none",
                    col.width,
                    col.sortable && "cursor-pointer",
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
                <th className="w-9.5 px-3 py-2 text-xs font-semibold text-slate-500">
                  Action
                </th>
              )}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody>
            {sorted.map((property) => {
              const isSelected =
                selectedId === property.id || selected.has(property.id);
              return (
                <tr
                  key={property.id}
                  onClick={() => handleRowClick(property)}
                  className={cn(
                    "border-b border-gray-50 cursor-pointer transition-colors duration-100",
                    isSelected
                      ? "bg-[#EBEAFD] border-[#E2E8F0]"
                      : "hover:bg-gray-50",
                  )}
                >
                  {/* Address */}
                  {visibleColumns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-3 py-2.5 text-xs text-slate-800",
                        col.key === "address" && " text-slate-800",
                        col.key === "description" &&
                          "text-slate-400 truncate max-w-[145px]",
                      )}
                    >
                      {col.key === "status" ? (
                        <PropertyStatusBadge status={property.status} />
                      ) : col.key === "type" ? (
                        <span className="text-xs font-normal text-slate-800">
                          {property.type}
                        </span>
                      ) : (
                        property[col.key]
                      )}
                    </td>
                  ))}

                  {/* Action */}
                  {!compact && (
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PropertyRowActions
                        propertyId={property.id}
                        onView={() =>
                          router.push(`/dashboard/properties/${property.id}`)
                        }
                        onEdit={() => console.log("edit", property.id)}
                        onDuplicate={() =>
                          console.log("duplicate", property.id)
                        }
                        onDelete={() => console.log("delete", property.id)}
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
