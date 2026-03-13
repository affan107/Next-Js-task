"use client";

import { useState } from "react";
import { Upload, MoreHorizontal, ChevronDown, Calendar } from "lucide-react";
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
import {
  MOCK_CONTACTS,
  MOCK_PROPERTIES_LIST,
  MOCK_BOTS_LIST,
  MOCK_CONTACT_LISTS,
} from "./batchMockData";

// ── Purple field label — same as CampaignModal ModalField ────────────────────
function FieldLabel({ children }) {
  return (
    <span className="text-sm font-medium text-[#4A24AB] mb-1 block">
      {children}
    </span>
  );
}

/**
 * CreateBatchModal
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onSchedule?: (data) => void
 *  - onTestCall?: (data) => void
 */
export default function CreateBatchModal({
  open,
  onClose,
  onSchedule,
  onTestCall,
}) {
  const [form, setForm] = useState({
    contactList: "",
    property: "",
    bot: "",
    dateTime: "",
    additionalInfo: "",
    reviewPrompt: "",
  });
  const [selectedContacts, setSelectedContacts] = useState(new Set());

  const set = (key) => (val) =>
    setForm((prev) => ({ ...prev, [key]: val?.target?.value ?? val }));

  const toggleContact = (id) =>
    setSelectedContacts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleSchedule = () => {
    onSchedule?.({ ...form, selectedContacts: [...selectedContacts] });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal box — same border-radius / shadow as CampaignModal */}
      <div className="bg-white rounded-2xl border-slate-200 w-[520px] max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <h2 className="text-sm font-bold text-[#4A24AB]">Create Batch</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTestCall?.(form)}
              className="h-10 px-4 text-sm font-medium border-[#4A24AB] border text-[#4A24AB] hover:bg-purple-50 rounded-md"
            >
              Test Call
            </Button>
            <Button
              size="sm"
              onClick={handleSchedule}
              className="h-10 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md"
            >
              Schedule
            </Button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          {/* Contact List + Upload CSV */}
          <div>
            <FieldLabel>Contact List</FieldLabel>
            <div className="flex items-center gap-2">
              <Select
                value={form.contactList}
                onValueChange={set("contactList")}
              >
                <SelectTrigger className="flex-1 h-9 text-sm rounded-md border-[#CBD5E1]">
                  <SelectValue placeholder="Contact List" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CONTACT_LISTS.map((l) => (
                    <SelectItem key={l} value={l} className="text-sm">
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 border-[#4A24AB] text-[#4A24AB] hover:bg-purple-50 rounded-md gap-1.5 shrink-0"
              >
                <Upload size={13} strokeWidth={2} />
                <span className="text-sm font-medium">Upload CSV</span>
              </Button>
            </div>
          </div>

          {/* Property */}
          <div>
            <FieldLabel>Property</FieldLabel>
            <Select value={form.property} onValueChange={set("property")}>
              <SelectTrigger className="w-full h-9 text-sm rounded-md border-[#CBD5E1]">
                <SelectValue placeholder="Select Property" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_PROPERTIES_LIST.map((p) => (
                  <SelectItem key={p} value={p} className="text-sm">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bot */}
          <div>
            <FieldLabel>Bot</FieldLabel>
            <Select value={form.bot} onValueChange={set("bot")}>
              <SelectTrigger className="w-full h-9 text-sm rounded-md border-[#CBD5E1]">
                <SelectValue placeholder="Select Bot" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_BOTS_LIST.map((b) => (
                  <SelectItem key={b} value={b} className="text-sm">
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div>
            <FieldLabel>Date and Time</FieldLabel>
            <div className="relative">
              <Input
                value={form.dateTime}
                onChange={set("dateTime")}
                placeholder="Select Date and Time"
                className="h-9 text-sm rounded-md border-[#CBD5E1] placeholder:text-gray-300 pr-9"
              />
              <Calendar
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Additional Property Info */}
          <div>
            <FieldLabel>
              Additional Property Information Available for AI Calling
            </FieldLabel>
            <Textarea
              value={form.additionalInfo}
              onChange={set("additionalInfo")}
              placeholder="Autofill"
              rows={3}
              className="text-sm rounded-md border-[#CBD5E1] placeholder:text-gray-300 resize-none"
            />
          </div>

          {/* Review Prompt */}
          <div>
            <FieldLabel>Review Prompt</FieldLabel>
            <Textarea
              value={form.reviewPrompt}
              onChange={set("reviewPrompt")}
              placeholder="Autofill"
              rows={3}
              className="text-sm rounded-md border-[#CBD5E1] placeholder:text-gray-300 resize-none"
            />
          </div>

          {/* Review Contact List */}
          <div>
            <FieldLabel>Review Contact List</FieldLabel>
            <div className="rounded-md border border-[#CBD5E1] overflow-hidden">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-gray-50">
                    <th className="w-8 px-3 py-2.5" />
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        Name{" "}
                        <ChevronDown size={10} className="text-slate-400" />
                      </div>
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        Phone Number{" "}
                        <ChevronDown size={10} className="text-slate-400" />
                      </div>
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        Action{" "}
                        <ChevronDown size={10} className="text-slate-400" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CONTACTS.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={selectedContacts.has(contact.id)}
                          onChange={() => toggleContact(contact.id)}
                          className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                        />
                      </td>
                      <td className="px-3 py-2.5 text-slate-800">
                        {contact.name}
                      </td>
                      <td className="px-3 py-2.5 text-slate-600">
                        {contact.phone}
                      </td>
                      <td className="px-3 py-2.5">
                        <button className="text-slate-400 hover:text-slate-700">
                          <MoreHorizontal size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total row — purple label like ModalField */}
            <div className="flex items-center gap-6 mt-2 px-1">
              <span className="text-sm font-medium text-[#4A24AB]">Total</span>
              <span className="text-sm text-slate-700">150</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
