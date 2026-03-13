"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  Copy,
  ExternalLink,
  X,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactStatusBadge } from "./ContactsTable";
import AddPropertyModal from "./AddPropertyModal";
import { CONTACT_STATUS_OPTIONS, INTEREST_OPTIONS } from "./contactsMockData";
import { cn } from "@/lib/utils";

// ── Interest badge ─────────────────────────────────────────────────────────────
const INTEREST_STYLES = {
  Hot: "bg-orange-100 text-orange-600 border-orange-200",
  Warm: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Cold: "bg-blue-100   text-blue-600   border-blue-200",
  Unknown: "bg-gray-100   text-gray-500   border-gray-200",
};
function InterestBadge({ level }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
        INTEREST_STYLES[level] ?? "bg-gray-100 text-gray-500",
      )}
    >
      {level}
    </span>
  );
}

// ── Collapsible section ───────────────────────────────────────────────────────
function Collapsible({
  title,
  defaultOpen = true,
  children,
  cardStyle = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const wrapper = cardStyle
    ? "rounded-lg border border-[#6B3FE8] bg-[#F4F3FF] p-4"
    : "rounded-lg border border-slate-200 bg-white p-4";
  return (
    <div className={wrapper}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 w-full text-left"
      >
        <span className="text-sm font-semibold text-slate-700 flex-1">
          {title}
        </span>
        {open ? (
          <ChevronDown size={14} className="text-slate-500 shrink-0" />
        ) : (
          <ChevronUp size={14} className="text-slate-500 shrink-0" />
        )}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

// ── Purple label + value (view mode) ─────────────────────────────────────────
function StatRow({ label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-sm font-medium text-[#4A24AB] w-32 shrink-0">
        {label}
      </span>
      <span className="text-sm text-slate-800">{value ?? "—"}</span>
    </div>
  );
}

// ── Purple field label (edit mode) ────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <span className="text-sm font-medium text-[#4A24AB] w-32 shrink-0">
      {children}
    </span>
  );
}

// ── Calls status badge ────────────────────────────────────────────────────────
const CALL_BADGE = {
  Completed: "bg-[#C8FFDC] text-[#15813D]",
  "IN progress": "bg-[#BFE2FF] text-[#2C96F0]",
  Scheduled: "bg-[#EDE9FE] text-[#4A24AB]",
};
function CallBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border whitespace-nowrap",
        CALL_BADGE[status] ?? "bg-gray-100 text-gray-500",
      )}
    >
      {status}
    </span>
  );
}

/**
 * ContactSummaryPanel
 *
 * All data sourced from `contact` prop — zero hardcoded values.
 *
 * Props:
 *  - contact: object                 — currently selected contact row
 *  - onClose?: () => void
 *  - onSave?: (updatedContact) => void
 */
export default function ContactSummaryPanel({ contact, onClose, onSave }) {
  const [editing, setEditing] = useState(false);
  const [addPropOpen, setAddPropOpen] = useState(false);
  const [form, setForm] = useState(null);

  // Always derive form from contact; reset on contact change via key= in parent
  const currentForm = form ?? {
    status: contact.status,
    phone: contact.phone,
    email: contact.email,
    address: contact.address,
    lastContacted: contact.lastContacted,
    calls: contact.calls,
    profile: contact.profile,
    linkedProperties: contact.linkedProperties.map((p) => ({ ...p })),
  };

  const setField = (key, val) =>
    setForm((prev) => ({ ...(prev ?? currentForm), [key]: val }));

  const setPropertyInterest = (idx, interest) =>
    setForm((prev) => {
      const lp = [...(prev ?? currentForm).linkedProperties];
      lp[idx] = { ...lp[idx], interest };
      return { ...(prev ?? currentForm), linkedProperties: lp };
    });

  const removeProperty = (idx) =>
    setForm((prev) => {
      const lp = [...(prev ?? currentForm).linkedProperties];
      lp.splice(idx, 1);
      return { ...(prev ?? currentForm), linkedProperties: lp };
    });

  const handleAddProperties = (newProps) => {
    setForm((prev) => {
      const existing = (prev ?? currentForm).linkedProperties;
      const toAdd = newProps
        .filter((p) => !existing.find((e) => e.address === p.address))
        .map((p) => ({ address: p.address, interest: "Unknown" }));
      return {
        ...(prev ?? currentForm),
        linkedProperties: [...existing, ...toAdd],
      };
    });
  };

  const handleSave = () => {
    onSave?.({ ...contact, ...currentForm });
    setEditing(false);
    setForm(null);
  };

  const handleCancel = () => {
    setForm(null);
    setEditing(false);
  };

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
              Contact Summary
            </span>
            <h2 className="text-xl font-bold text-slate-900">{contact.name}</h2>
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
                  onClick={handleCancel}
                  className="flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 text-red-500 hover:bg-red-50 transition-all"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
              >
                <ExternalLink size={13} strokeWidth={1.8} />
              </button>
            )}
          </div>
        </div>

        {/* ── Core fields ── */}
        {editing ? (
          <div className="flex flex-col gap-3">
            {/* Status */}
            <div className="flex items-center gap-4">
              <FieldLabel>Status</FieldLabel>
              <Select
                value={currentForm.status}
                onValueChange={(v) => setField("status", v)}
              >
                <SelectTrigger className="flex-1 h-9 text-sm rounded-md border-[#CBD5E1]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s} className="text-sm">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {[
              { key: "phone", label: "Phone" },
              { key: "email", label: "Email" },
              { key: "address", label: "Address" },
              { key: "lastContacted", label: "Last Contacted" },
              { key: "calls", label: "Calls" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-4">
                <FieldLabel>{label}</FieldLabel>
                <Input
                  value={String(currentForm[key] ?? "")}
                  onChange={(e) => setField(key, e.target.value)}
                  className="flex-1 h-9 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <StatRow
              label="Status"
              value={<ContactStatusBadge status={contact.status} />}
            />
            <StatRow label="Phone" value={contact.phone} />
            <StatRow label="Email" value={contact.email} />
            <StatRow label="Address" value={contact.address} />
            <StatRow label="Last Contacted" value={contact.lastContacted} />
            <StatRow label="Calls" value={contact.calls} />
          </div>
        )}

        {/* ── AI Insights ── */}
        <Collapsible title="AI Insights" cardStyle>
          <div className="flex flex-col gap-1">
            {contact.aiInsights.map((line, i) => (
              <p key={i} className="text-[11px] text-gray-600 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </Collapsible>

        {/* ── Contact Profile ── */}
        <Collapsible title="Contact Profile">
          {editing ? (
            <Textarea
              value={currentForm.profile}
              onChange={(e) => setField("profile", e.target.value)}
              rows={3}
              className="text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB] resize-none w-full"
            />
          ) : (
            <p className="text-sm text-slate-700 leading-relaxed">
              {contact.profile}
            </p>
          )}
        </Collapsible>

        {/* ── Properties ── */}
        <Collapsible title="Properties">
          {editing ? (
            <div className="flex flex-col gap-2">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-1 pb-1 border-b border-slate-100">
                <span className="text-xs font-semibold text-[#4A24AB]">
                  Property
                </span>
                <span className="text-xs font-semibold text-[#4A24AB]">
                  Interest
                </span>
                <span className="w-5" />
              </div>
              {currentForm.linkedProperties.map((lp, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
                >
                  <span className="text-sm text-slate-800 truncate">
                    {lp.address}
                  </span>
                  <Select
                    value={lp.interest}
                    onValueChange={(v) => setPropertyInterest(i, v)}
                  >
                    <SelectTrigger className="h-8 text-xs rounded-md border-[#CBD5E1]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INTEREST_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt} className="text-xs">
                          <InterestBadge level={opt} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    onClick={() => removeProperty(i)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
              {/* New Property button */}
              <Button
                onClick={() => setAddPropOpen(true)}
                className="w-full h-9 mt-1 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-lg gap-1.5"
              >
                <Plus size={13} strokeWidth={2.5} />
                New Property
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {contact.linkedProperties.map((lp) => (
                <span
                  key={lp.address}
                  className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700"
                >
                  {lp.address} :
                </span>
              ))}
            </div>
          )}
        </Collapsible>

        {/* ── Calls ── */}
        <Collapsible title="Calls">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  {[
                    "Batch",
                    "Time",
                    "Duration",
                    "Address",
                    "Bot",
                    "Result",
                    "Status",
                    "More",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-2 py-2 text-left font-semibold text-slate-500 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-0.5">
                        {h}
                        {h !== "More" && (
                          <ChevronDown size={9} className="text-slate-400" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contact.callHistory.map((call, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-2 py-2 text-slate-800 whitespace-nowrap">
                      {call.batch}
                    </td>
                    <td className="px-2 py-2 text-slate-600 whitespace-nowrap">
                      {call.time}
                    </td>
                    <td className="px-2 py-2 text-slate-600 whitespace-nowrap">
                      {call.duration}
                    </td>
                    <td className="px-2 py-2 text-slate-600 whitespace-nowrap">
                      {call.address}
                    </td>
                    <td className="px-2 py-2 text-slate-600 whitespace-nowrap">
                      {call.bot}
                    </td>
                    <td className="px-2 py-2 text-slate-600 whitespace-nowrap">
                      {call.result}
                    </td>
                    <td className="px-2 py-2">
                      <CallBadge status={call.status} />
                    </td>
                    <td className="px-2 py-2">
                      <button className="text-gray-400 hover:text-gray-700">
                        <MoreHorizontal size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Collapsible>
      </div>

      {/* Add Property Modal */}
      <AddPropertyModal
        open={addPropOpen}
        onClose={() => setAddPropOpen(false)}
        onAdd={handleAddProperties}
        alreadyAdded={currentForm.linkedProperties.map((p) => p.address)}
      />
    </>
  );
}
