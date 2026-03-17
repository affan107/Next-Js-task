"use client";

import { useState, useRef } from "react";
import { Upload, MoreHorizontal, ChevronDown, Calendar, X } from "lucide-react";
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

function FieldLabel({ children }) {
  return (
    <span className="text-sm font-medium text-[#4A24AB] mb-1 block">
      {children}
    </span>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="text-[10px] text-red-500 mt-0.5">{msg}</p>;
}

export default function CreateBatchModal({ open, onClose, onSchedule }) {
  const csvRef = useRef(null);

  const [form, setForm] = useState({
    contactList: "",
    property: "",
    bot: "",
    dateTime: "",
    additionalInfo: "",
    reviewPrompt: "",
  });

  const [csvFileName, setCsvFileName] = useState(null);
  const [csvContacts, setCsvContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [errors, setErrors] = useState({});

  const set = (key) => (val) =>
    setForm((prev) => ({ ...prev, [key]: val?.target?.value ?? val }));

  const toggleContact = (id) =>
    setSelectedContacts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleCsvUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.trim().split("\n").filter(Boolean);
      // Expect header row: name,phone  (or Name,Phone Number)
      const rows = lines.slice(1).map((line, i) => {
        const [name, phone] = line
          .split(",")
          .map((s) => s.trim().replace(/"/g, ""));
        return {
          id: `csv_${i}`,
          name: name || `Contact ${i + 1}`,
          phone: phone || "",
        };
      });
      setCsvContacts(rows);
    };
    reader.readAsText(file);
    // Reset input so same file can be re-uploaded
    e.target.value = "";
  };

  // All contacts to show in review table = mock + csv uploaded
  const allContacts = [...MOCK_CONTACTS, ...csvContacts];

  const validate = () => {
    const e = {};
    if (!form.contactList) e.contactList = "Contact list is required";
    if (!form.property) e.property = "Property is required";
    if (!form.bot) e.bot = "Bot is required";
    if (!form.dateTime) e.dateTime = "Date and time is required";
    return e;
  };

  const handleSchedule = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Build a new batch row that matches MOCK_BATCHES shape
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}${now.getHours() >= 12 ? "pm" : "am"}, ${now.getDate()}-${now.toLocaleString("default", { month: "short" })}-${String(now.getFullYear()).slice(2)}`;

    const newBatch = {
      // table fields
      id: Date.now(),
      name: `Batch — ${form.property}`,
      address: form.property,
      suburb: "",
      bot: form.bot,
      list: form.contactList,
      time: form.dateTime || timeStr,
      callsTotal: allContacts.length,
      remaining: allContacts.length,
      status: "Scheduled",
      pct: "0%",
      // detail panel fields
      batchSummary: `Batch — ${form.property}`,
      property: form.property,
      startDateTime: form.dateTime || timeStr,
      remainingCalls: allContacts.length,
      pctCompleted: "0%",
      voicemailRate: "0%",
      dropoutRate: "0%",
      hangupRate: "0%",
      totalTime: "0m 00s",
      averageTime: "0m 00s",
      aiInsights: {
        qualifiedBuyers: 0,
        attendingEvent: 0,
        topBuyers: 0,
        summary: ["Batch is scheduled and has not started yet."],
      },
      calls: [],
      // extra
      additionalInfo: form.additionalInfo,
      reviewPrompt: form.reviewPrompt,
      selectedContacts: [...selectedContacts],
    };

    onSchedule?.(newBatch);
    handleClose();
  };

  const handleClose = () => {
    setForm({
      contactList: "",
      property: "",
      bot: "",
      dateTime: "",
      additionalInfo: "",
      reviewPrompt: "",
    });
    setCsvFileName(null);
    setCsvContacts([]);
    setSelectedContacts(new Set());
    setErrors({});
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[4px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white rounded-2xl border-slate-200 w-187 max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-semibold text-[#4A24AB]">Create Batch</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="h-10 px-4 text-sm font-medium border-[#4A24AB] border-[2px] bg-white text-[#4A24AB] rounded-sm"
            >
              Test Call
            </Button>
            <Button
              size="sm"
              onClick={handleSchedule}
              className="h-10 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-sm"
            >
              Schedule
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          <div>
            <FieldLabel>Contact List</FieldLabel>
            <div className="flex items-center gap-2">
              <Select
                value={form.contactList}
                onValueChange={set("contactList")}
              >
                <SelectTrigger
                  className={`flex-1 h-9 text-sm rounded-sm ${errors.contactList ? "border-red-400" : "border-[#CBD5E1]"}`}
                >
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
              <input
                ref={csvRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleCsvUpload}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => csvRef.current?.click()}
                className="h-10 px-3 text-white border bg-[#4A24AB] rounded-sm gap-1.5 shrink-0"
              >
                <Upload size={13} strokeWidth={2} />
                <span className="text-sm font-medium">
                  {csvFileName ? "CSV ✓" : "Upload CSV"}
                </span>
              </Button>
            </div>
            <FieldError msg={errors.contactList} />
            {csvFileName && (
              <p className="text-[10px] text-[#4A24AB] mt-1 flex items-center gap-1">
                <span>📄 {csvFileName}</span>
                <button
                  onClick={() => {
                    setCsvFileName(null);
                    setCsvContacts([]);
                  }}
                  className="text-red-400 hover:text-red-600 ml-1"
                >
                  <X size={10} />
                </button>
              </p>
            )}
          </div>
          <div>
            <FieldLabel>Property</FieldLabel>
            <Select value={form.property} onValueChange={set("property")}>
              <SelectTrigger
                className={`w-full h-9 text-sm rounded-sm ${errors.property ? "border-red-400" : "border-[#CBD5E1]"}`}
              >
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
            <FieldError msg={errors.property} />
          </div>
          <div>
            <FieldLabel>Bot</FieldLabel>
            <Select value={form.bot} onValueChange={set("bot")}>
              <SelectTrigger
                className={`w-full h-9 text-sm rounded-sm ${errors.bot ? "border-red-400" : "border-[#CBD5E1]"}`}
              >
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
            <FieldError msg={errors.bot} />
          </div>
          <div>
            <FieldLabel>Date and Time</FieldLabel>
              <Input
               placeholder = "Select date and Time"
                type="datetime-local"
                onChange={set("dateTime")}
                className={`h-9 text-sm text-slate-400 rounded-sm pr-9 ${errors.dateTime ? "border-red-400" : "border-[#CBD5E1]"}`}
              />
            <FieldError msg={errors.dateTime} />
          </div>
          <div>
            <FieldLabel>
              Additional Property Information Available for AI Calling
            </FieldLabel>
            <Textarea
              value={form.additionalInfo}
              onChange={set("additionalInfo")}
              placeholder="Autofill"
              rows={3}
              className="text-sm rounded-sm border-[#CBD5E1] placeholder:text-slate-400"
            />
          </div>
          <div>
            <FieldLabel>Review Prompt</FieldLabel>
            <Textarea
              value={form.reviewPrompt}
              onChange={set("reviewPrompt")}
              placeholder="Autofill"
              rows={3}
              className="text-sm rounded-sm border-[#CBD5E1] placeholder:text-slate-400"
            />
          </div>
          <div>
            <FieldLabel>Review Contact List</FieldLabel>
            <div className="max-h-35 overflow-y-auto border border-slate-200 rounded-md">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="text-slate-500">
                    <th className="w-8 px-3 py-2">
                      <input
                        type="checkbox"
                        checked={
                          selectedContacts.size === allContacts.length &&
                          allContacts.length > 0
                        }
                        onChange={() => {
                          if (selectedContacts.size === allContacts.length) {
                            setSelectedContacts(new Set());
                          } else {
                            setSelectedContacts(
                              new Set(allContacts.map((c) => c.id)),
                            );
                          }
                        }}
                        className="w-3 h-3 rounded border-gray-300 accent-[#4A24AB]"
                      />
                    </th>
                    {["Name", "Phone Number", "Action"].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-2.5 text-left text-xs font-semibold text-slate-500"
                      >
                        <div className="flex items-center gap-10">
                          {h}{" "}
                          <ChevronDown size={15} className="text-slate-500" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={selectedContacts.has(contact.id)}
                          onChange={() => toggleContact(contact.id)}
                          className="w-3 h-3 rounded border-gray-300 accent-[#4A24AB]"
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
                  {allContacts.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-4 text-center text-slate-400 text-xs"
                      >
                        No contacts yet. Upload a CSV or select a contact list.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-6 mt-2 px-1">
              <span className="text-sm font-medium text-[#4A24AB]">Total</span>
              <span className="text-sm text-slate-700">
                {allContacts.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
