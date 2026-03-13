"use client";

import { useState, useRef, useEffect } from "react";
import {
  Maximize2,
  Copy,
  ExternalLink,
  X,
  Search,
  ChevronDown,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AddFromPropertiesModal,
  AddFromExistingListModal,
  UploadOptionModal,
  UploadFileModal,
  AddContactsModal,
} from "./ListModals";
import { PROPERTY_DROPDOWN_OPTIONS } from "./listsMockData";
import { ContactStatusBadge } from "../contacts/ContactsTable";
import { cn } from "@/lib/utils";

// ── Purple label (view mode) ──────────────────────────────────────────────────
function StatRow({ label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-sm font-medium text-[#4A24AB] w-32 shrink-0">
        {label}
      </span>
      <span className="text-sm text-slate-800">{value ?? "—"}</span>
    </div>
  );
}

// ── "New List" dropdown button (top-right of topbar) ─────────────────────────
export function NewListDropdown({
  onFromProperty,
  onFromExistingList,
  onFromFile,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-9 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-medium rounded-md gap-1.5">
          New List
          <ChevronDown size={13} strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={setAddFromPropOpen}
          className="text-xs gap-2 cursor-pointer"
        >
          Add Contacts
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onFromProperty}
          className="text-xs gap-2 cursor-pointer"
        >
          From Property
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onFromExistingList}
          className="text-xs gap-2 cursor-pointer"
        >
          From Existing List
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onFromFile}
          className="text-xs gap-2 cursor-pointer"
        >
          From File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * ListSummaryPanel
 *
 * Fully driven by `list` prop — zero hardcoded values.
 *
 * Props:
 *  - list: object                — selected list row
 *  - onClose?: () => void
 *  - onSave?: (updated) => void
 */
export default function ListSummaryPanel({ list, onClose, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [contactSearch, setContactSearch] = useState("");

  // Add Contact modals
  const [addFromPropOpen, setAddFromPropOpen] = useState(false);
  const [addFromExistingOpen, setAddFromExistingOpen] = useState(false);
  const [uploadOptionOpen, setUploadOptionOpen] = useState(false);
  const [uploadFileOpen, setUploadFileOpen] = useState(false);
  const [addContactsOpen, setAddContactsOpen] = useState(false);

  // Properties inline dropdown (edit mode)
  const [propDropOpen, setPropDropOpen] = useState(false);

  const currentForm = form ?? {
    properties: [...list.properties],
  };
  const setField = (k, v) =>
    setForm((prev) => ({ ...(prev ?? currentForm), [k]: v }));

  const addProperty = (p) => {
    setField("properties", [...currentForm.properties, p]);
    setPropDropOpen(false);
  };
  const removeProperty = (idx) => {
    const next = [...currentForm.properties];
    next.splice(idx, 1);
    setField("properties", next);
  };

  const handleSave = () => {
    onSave?.({ ...list, ...currentForm });
    setEditing(false);
    setForm(null);
  };

  // Contacts in the calls sub-table
  const contactsToShow = (list.contacts_data ?? []).filter(
    (c) =>
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.phone.includes(contactSearch),
  );

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2 mb-1">
              <Maximize2
                size={13}
                className="text-slate-400"
                strokeWidth={1.8}
              />
              <Copy size={13} className="text-slate-400" strokeWidth={1.8} />
            </div>
            <span className="text-xs font-semibold text-[#4A24AB]">
              List Summary
            </span>
            <h2 className="text-xl font-bold text-slate-900">{list.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <Button
                  onClick={handleSave}
                  size="sm"
                  className="h-9 px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md"
                >
                  Save
                </Button>
                <button
                  onClick={() => {
                    setForm(null);
                    setEditing(false);
                  }}
                  className="flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 text-red-500 hover:bg-red-50 transition-all"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => console.log("Create Batch Call")}
                  className="h-9 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-medium rounded-md"
                >
                  Create Batch Call
                </Button>
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
                >
                  <ExternalLink size={13} strokeWidth={1.8} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Properties field ── */}
        <div className="flex items-start gap-3">
          <span className="text-sm font-medium text-[#4A24AB] w-32 shrink-0 pt-0.5">
            Properties
          </span>
          {editing ? (
            <div className="flex flex-col gap-2 flex-1">
              {/* Multi-property pills + remove */}
              <div className="relative">
                <div
                  onClick={() => setPropDropOpen((v) => !v)}
                  className="flex items-center flex-wrap gap-1.5 min-h-9 px-3 py-1.5 rounded-md border border-[#CBD5E1] cursor-pointer bg-white"
                >
                  {currentForm.properties.map((p, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#4A24AB] text-[10px] font-medium"
                    >
                      {p}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProperty(i);
                        }}
                        className="text-[#4A24AB] hover:text-red-500 transition-colors"
                      >
                        <X size={9} />
                      </button>
                    </span>
                  ))}
                  <ChevronDown
                    size={12}
                    className="text-slate-400 ml-auto shrink-0"
                  />
                </div>
                {propDropOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 max-h-40 overflow-y-auto">
                    {PROPERTY_DROPDOWN_OPTIONS.filter(
                      (p) => !currentForm.properties.includes(p),
                    ).map((p) => (
                      <button
                        key={p}
                        onClick={() => addProperty(p)}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-1.5 flex-wrap">
              {[...new Set(list.properties)].map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700"
                >
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Meta rows ── */}
        <div className="flex flex-col gap-2.5">
          <StatRow label="Created by" value={list.createdBy} />
          <StatRow label="Created Date" value={list.createdDate} />
          <StatRow
            label="Completed Batch"
            value={String(list.completedBatch)}
          />
          <StatRow label="Latest Batch" value={list.latestBatch} />
        </div>

        {/* ── Calls / Contacts sub-section ── */}
        <div className="flex flex-col gap-2">
          {/* Sub-header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-slate-700">
                Calls
              </span>
              <ChevronDown size={14} className="text-slate-500" />
            </div>
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="flex items-center gap-2 border border-[#CBD5E1] rounded-lg px-2.5 h-8 bg-gray-50 w-44">
                <Search size={12} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  className="bg-transparent text-xs placeholder:text-gray-400 outline-none w-full"
                />
              </div>
              {/* Search btn */}
              <Button
                size="sm"
                className="h-8 px-3 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-xs font-medium rounded-md gap-1.5"
              >
                <Search size={11} strokeWidth={2.5} />
                Search
              </Button>
              {/* Delete Selected */}
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 border-red-300 text-red-500 hover:bg-red-50 text-xs font-medium rounded-md gap-1.5"
              >
                Delete Selected
              </Button>
              {/* Add Contact dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="h-8 px-3 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-xs font-medium rounded-md gap-1"
                  >
                    Add Contact
                    <ChevronDown size={11} strokeWidth={2} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem
                    onClick={setAddContactsOpen}
                    className="text-xs gap-2 cursor-pointer"
                  >
                    Add Contacts
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs gap-2 cursor-pointer"
                    onClick={() => setAddFromPropOpen(true)}
                  >
                    From Property
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs gap-2 cursor-pointer"
                    onClick={() => setAddFromExistingOpen(true)}
                  >
                    From Existing List
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs gap-2 cursor-pointer"
                    onClick={() => setUploadOptionOpen(true)}
                  >
                    From File
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Contacts table */}
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <table className="min-w-full text-xs border-collapse">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-100">
                    <th className="w-8 px-2 py-2.5">
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                        onChange={() => {}}
                      />
                    </th>
                    {[
                      "Name",
                      "Phone Number",
                      "Address",
                      "Calls",
                      "Last Contacted",
                      "Status",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500 whitespace-nowrap"
                      >
                        <div className="flex items-center gap-1">
                          {h}
                          <ChevronDown size={9} className="text-slate-400" />
                        </div>
                      </th>
                    ))}
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        More
                        <ChevronDown size={9} className="text-slate-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contactsToShow.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-gray-50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-2 py-2.5">
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                          onChange={() => {}}
                        />
                      </td>
                      <td className="px-3 py-2.5 text-xs text-slate-800 whitespace-nowrap">
                        {c.name}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">
                        {c.phone}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">
                        {c.address}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">
                        {c.calls}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">
                        {c.lastContacted}
                      </td>
                      <td className="px-3 py-2.5">
                        <ContactStatusBadge status={c.status} />
                      </td>
                      <td className="px-3 py-2.5">
                        <button className="text-gray-400 hover:text-gray-700">
                          <MoreHorizontal size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── All Add Contact Modals ── */}
      <AddFromPropertiesModal
        open={addFromPropOpen}
        onClose={() => setAddFromPropOpen(false)}
        onAdd={(props) => console.log("Add from props:", props)}
      />
      <AddFromExistingListModal
        open={addFromExistingOpen}
        onClose={() => setAddFromExistingOpen(false)}
        currentListId={list.id}
        onAdd={(lists) => console.log("Add from lists:", lists)}
      />
      <UploadOptionModal
        open={uploadOptionOpen}
        onClose={() => setUploadOptionOpen(false)}
        onUploadFile={() => setUploadFileOpen(true)}
      />
      <UploadFileModal
        open={uploadFileOpen}
        onClose={() => setUploadFileOpen(false)}
        onFileSelected={(f) => console.log("File selected:", f)}
      />
      <AddContactsModal
        open={addContactsOpen}
        onClose={() => setAddContactsOpen(false)}
        onAdd={(contacts) => console.log("Add contacts:", contacts)}
        onDelete={(contacts) => console.log("Delete contacts:", contacts)}
      />
    </>
  );
}
