"use client";

/**
 * List Modals — all 5 Add Contact flows
 *
 * Exports:
 *  - AddFromPropertiesModal   — Image 4: properties table with checkboxes
 *  - AddFromExistingListModal — Image 5: lists table with checkboxes
 *  - UploadOptionModal        — Image 6: Download CSV template + Upload File
 *  - UploadFileModal          — Image 7: drag & drop zone + Browse
 *  - AddContactsModal         — Image 8: Name/Phone table with checkboxes + Delete/Add
 */

import { useState, useRef } from "react";
import {
  ChevronDown,
  MoreHorizontal,
  Search,
  Download,
  Upload,
  CloudUpload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AVAILABLE_PROPERTIES, MOCK_LISTS } from "./listsMockData";
import { MOCK_CONTACTS } from "../contacts/contactsMockData";
import { cn } from "@/lib/utils";

// ── Shared property status badge ──────────────────────────────────────────────
const PROP_STATUS_STYLES = {
  "Pre-Launched": "bg-[#BFE2FF] text-[#2C96F0] border-[#BFE2FF]",
  Live: "bg-[#C8FFDC] text-[#15813D] border-[#C8FFDC]",
  Closed: "bg-[#FFC5C5] text-[#B42941] border-[#FFC5C5]",
};
function PropStatusBadge({ status }) {
  const s = PROP_STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border whitespace-nowrap",
        s,
      )}
    >
      {status}
    </span>
  );
}

// ── Shared contact status badge ───────────────────────────────────────────────
const CONTACT_STATUS_STYLES = {
  "Looking to purchase": "bg-[#C8FFDC] text-[#15813D]",
  "Looking to sell": "bg-[#BFE2FF] text-[#2C96F0]",
  "Not looking": "bg-[#FFC5C5] text-[#B42941]",
};
function ContactStatusBadge({ status }) {
  const s = CONTACT_STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border whitespace-nowrap",
        s,
      )}
    >
      {status}
    </span>
  );
}

// ── Shared modal shell ────────────────────────────────────────────────────────
function ModalShell({
  open,
  onClose,
  title,
  searchable = false,
  onSearch,
  children,
  footer,
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[4px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[860px] max-h-[82vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0">
          <h2 className="text-sm font-bold text-[#4A24AB]">{title}</h2>
          {searchable && (
            <div className="flex items-center gap-2 border border-[#CBD5E1] rounded-lg px-3 h-8 w-56 bg-gray-50">
              <Search size={12} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Type a command or search..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="bg-transparent text-xs text-gray-700 placeholder:text-gray-400 outline-none w-full"
              />
            </div>
          )}
        </div>
        {/* Body */}
        <div className="flex-1 overflow-auto px-6 pb-2">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ADD FROM PROPERTIES MODAL (Image 4)
// ─────────────────────────────────────────────────────────────────────────────
const PROP_COLS = [
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

export function AddFromPropertiesModal({ open, onClose, onAdd }) {
  const [selected, setSelected] = useState(new Set());
  const [query, setQuery] = useState("");

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = AVAILABLE_PROPERTIES.filter(
    (p) =>
      p.address.toLowerCase().includes(query.toLowerCase()) ||
      p.suburb.toLowerCase().includes(query.toLowerCase()),
  );

  const handleAdd = () => {
    onAdd?.(AVAILABLE_PROPERTIES.filter((p) => selected.has(p.id)));
    setSelected(new Set());
    onClose();
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Add Contacts from Properties"
      searchable
      onSearch={setQuery}
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-5 text-sm border-slate-200 text-slate-600 rounded-md"
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
        </>
      }
    >
      <table className="min-w-full text-xs border-collapse">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="border-b border-gray-100">
            <th className="w-8 px-2 py-2.5" />
            {PROP_COLS.map((col) => (
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
                Action
                <ChevronDown size={10} className="text-slate-400" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((prop) => {
            const isChecked = selected.has(prop.id);
            return (
              <tr
                key={prop.id}
                onClick={() => toggle(prop.id)}
                className={cn(
                  "border-b border-gray-50 cursor-pointer transition-colors",
                  isChecked ? "bg-[#EBEAFD]" : "hover:bg-gray-50",
                )}
              >
                <td
                  className="px-2 py-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(prop.id)}
                    className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                  />
                </td>
                {PROP_COLS.map((col) => (
                  <td
                    key={col.key}
                    className="px-3 py-2.5 text-xs text-slate-800 whitespace-nowrap"
                  >
                    {col.key === "status" ? (
                      <PropStatusBadge status={prop.status} />
                    ) : col.key === "description" ? (
                      <span className="text-slate-500 max-w-[100px] truncate block">
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
                    <MoreHorizontal size={13} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ADD FROM EXISTING LIST MODAL (Image 5)
// ─────────────────────────────────────────────────────────────────────────────
const LIST_COLS = [
  { key: "name", label: "List" },
  { key: "propertyStr", label: "Property" },
  { key: "contacts", label: "Contacts" },
  { key: "completedBatch", label: "Completed Batch" },
  { key: "latestBatch", label: "Latest Batch" },
  { key: "createdDate", label: "Created Date" },
];

export function AddFromExistingListModal({
  open,
  onClose,
  onAdd,
  currentListId,
}) {
  const [selected, setSelected] = useState(new Set());
  const [query, setQuery] = useState("");

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const lists = MOCK_LISTS.filter((l) => l.id !== currentListId);
  const filtered = lists
    .filter((l) => l.name.toLowerCase().includes(query.toLowerCase()))
    .map((l) => ({ ...l, propertyStr: [...new Set(l.properties)].join(", ") }));

  const handleAdd = () => {
    onAdd?.(MOCK_LISTS.filter((l) => selected.has(l.id)));
    setSelected(new Set());
    onClose();
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Add Contacts from Existing"
      searchable
      onSearch={setQuery}
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-5 text-sm border-slate-200 text-slate-600 rounded-md"
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
        </>
      }
    >
      <table className="min-w-full text-xs border-collapse">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="border-b border-gray-100">
            <th className="w-8 px-2 py-2.5" />
            {LIST_COLS.map((col) => (
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
                Action
                <ChevronDown size={10} className="text-slate-400" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((list) => {
            const isChecked = selected.has(list.id);
            return (
              <tr
                key={list.id}
                onClick={() => toggle(list.id)}
                className={cn(
                  "border-b border-gray-50 cursor-pointer transition-colors",
                  isChecked ? "bg-[#EBEAFD]" : "hover:bg-gray-50",
                )}
              >
                <td
                  className="px-2 py-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(list.id)}
                    className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                  />
                </td>
                {LIST_COLS.map((col) => (
                  <td
                    key={col.key}
                    className="px-3 py-2.5 text-xs text-slate-800 whitespace-nowrap"
                  >
                    {list[col.key] ?? "—"}
                  </td>
                ))}
                <td
                  className="px-3 py-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="text-gray-400 hover:text-gray-700">
                    <MoreHorizontal size={13} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. UPLOAD OPTION MODAL (Image 6)
// ─────────────────────────────────────────────────────────────────────────────
export function UploadOptionModal({ open, onClose, onUploadFile }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[4px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-7 flex flex-col gap-5">
        <h2 className="text-sm font-bold text-[#4A24AB]">
          Add Contacts from Existing
        </h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onClose(); /* trigger CSV download */
            }}
            className="flex items-center gap-2.5 px-4 h-11 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download size={14} className="text-slate-500" strokeWidth={1.8} />
            Download CSV template
          </button>
          <button
            onClick={() => {
              onClose();
              onUploadFile?.();
            }}
            className="flex items-center gap-2.5 px-4 h-11 rounded-lg bg-[#4A24AB] hover:bg-[#3b1d8a] text-sm font-medium text-white transition-colors"
          >
            <Upload size={14} strokeWidth={1.8} />
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. UPLOAD FILE (drag & drop) MODAL (Image 7)
// ─────────────────────────────────────────────────────────────────────────────
export function UploadFileModal({ open, onClose, onFileSelected }) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    onFileSelected?.(file);
    onClose();
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[4px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-7 flex flex-col gap-4">
        <h2 className="text-sm font-bold text-[#4A24AB]">
          Add Contacts from Existing
        </h2>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-10 px-6 transition-colors",
            dragging
              ? "border-[#4A24AB] bg-purple-50"
              : "border-slate-200 bg-slate-50",
          )}
        >
          <CloudUpload size={36} className="text-[#4A24AB]" strokeWidth={1.5} />
          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">
              Choose a file or drag &amp; drop it here
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Supported format : CSV , .xlsx upto 50MB
            </p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.xlsx"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <Button
            onClick={() => fileRef.current?.click()}
            className="h-9 px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-medium rounded-lg gap-1.5 mt-1"
          >
            <Upload size={13} strokeWidth={2} />
            Browse
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. ADD CONTACTS (Name + Phone mini-table) MODAL (Image 8)
// ─────────────────────────────────────────────────────────────────────────────
export function AddContactsModal({ open, onClose, onAdd, onDelete }) {
  const [selected, setSelected] = useState(new Set([1, 3])); // Tom Cruise + Hugh Jackman pre-checked
  const [query, setQuery] = useState("");

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = MOCK_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query),
  );

  const handleAdd = () => {
    onAdd?.(MOCK_CONTACTS.filter((c) => selected.has(c.id)));
    setSelected(new Set());
    onClose();
  };

  const handleDelete = () => {
    onDelete?.(MOCK_CONTACTS.filter((c) => selected.has(c.id)));
    setSelected(new Set());
    onClose();
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[4px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[500px] max-h-[70vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
          <h2 className="text-sm font-bold text-[#4A24AB]">Add Contacts</h2>
          <div className="flex items-center gap-2 border border-[#CBD5E1] rounded-lg px-3 h-8 w-48 bg-gray-50">
            <Search size={12} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Type a command or search..."
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-xs placeholder:text-gray-400 outline-none w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-5">
          <table className="min-w-full text-xs border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-gray-100">
                <th className="w-8 px-2 py-2.5" />
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    Name
                    <ChevronDown size={10} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    Phone Number
                    <ChevronDown size={10} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1">
                    Action
                    <ChevronDown size={10} className="text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => {
                const isChecked = selected.has(contact.id);
                return (
                  <tr
                    key={contact.id}
                    onClick={() => toggle(contact.id)}
                    className={cn(
                      "border-b border-gray-50 cursor-pointer transition-colors",
                      isChecked ? "bg-[#EBEAFD]" : "hover:bg-gray-50",
                    )}
                  >
                    <td
                      className="px-2 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(contact.id)}
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-800 whitespace-nowrap">
                      {contact.name}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">
                      {contact.phone}
                    </td>
                    <td
                      className="px-3 py-2.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="text-gray-400 hover:text-gray-700">
                        <MoreHorizontal size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-9 px-4 text-sm border-slate-200 text-slate-600 rounded-md"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleDelete}
            disabled={selected.size === 0}
            className="h-9 px-4 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-md disabled:opacity-40"
          >
            Delete
          </Button>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={selected.size === 0}
            className="h-9 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md disabled:opacity-40"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
