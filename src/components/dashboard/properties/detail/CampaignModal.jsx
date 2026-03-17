"use client";

import { useState } from "react";
import { X, CalendarDays, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";


//  Mock options
const TYPE_OPTIONS = [
  "For rent",
  "For sale",
  "Auction",
  "Expression of Interest",
];
const STATUS_OPTIONS = ["Live", "Pre-Launched", "Closed", "Scheduled"];
const DATE_TYPE_OPTIONS = [
  "Open for Inspection",
  "Auction",
  "Private Inspection",
  "Settlement",
];

// Default empty state 
const EMPTY_FORM = {
  campaign: "",
  type: "",
  status: "Live",
  listingUrl: "",
  priceMin: "",
  priceMax: "",
  keyDates: [
    { date: "11:00am, Tue 15 Mar-25", type: "Open for Inspection" },
    { date: "11:00am, Tue 15 Mar-25", type: "Open for Inspection" },
  ],
};

// Prefilled edit state 
const EDIT_FORM = {
  campaign: "Sales 1",
  type: "For rent",
  status: "Live",
  listingUrl: "https://vow.work-v1.web.arced.app/home/aual-ham-75m",
  priceMin: "1,100,000",
  priceMax: "2,000,000",
  keyDates: [
    { date: "11:00am, Tue 15 Mar-25", type: "Open for Inspection" },
    { date: "11:00am, Tue 15 Mar-25", type: "Open for Inspection" },
  ],
};

//  StatusPill — coloured inline select for status field 
function StatusPill({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-full h-10 text-sm font-semibold rounded-md border border-[#CBD5E1]",
          value === "Live" && "bg-green-100 text-green-700",
          value === "Pre-Launched" && "bg-purple-100 text-purple-700",
          value === "Closed" && "bg-red-100 text-red-600",
          value === "Scheduled" && "bg-amber-100 text-amber-700",
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// KeyDateRow 
function KeyDateRow({ date, type, onDateChange, onTypeChange, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <Input
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-54 h-9 text-xs rounded-md border border-[#CBD5E1]"
      />
      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="w-44 h-9 text-xs rounded-md border border-[#CBD5E1]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DATE_TYPE_OPTIONS.map((t) => (
            <SelectItem key={t} value={t} className="text-xs">
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        onClick={onRemove}
        className="text-[#EF4444]"
      >
        <X size={13} />
      </button>
    </div>
  );
}

export default function CampaignModal({
  open,
  onClose,
  onSchedule,
  mode = "new",
  initialData,
}) {
  const isEdit = mode === "edit";
  const initForm = initialData ?? (isEdit ? EDIT_FORM : EMPTY_FORM);

  const [form, setForm] = useState({ ...initForm });

  if (!open) return null;

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const updateDate = (i, key, value) =>
    setForm((prev) => {
      const keyDates = [...prev.keyDates];
      keyDates[i] = { ...keyDates[i], [key]: value };
      return { ...prev, keyDates };
    });

  const removeDate = (i) =>
    setForm((prev) => ({
      ...prev,
      keyDates: prev.keyDates.filter((_, idx) => idx !== i),
    }));

  const addDate = () =>
    setForm((prev) => ({
      ...prev,
      keyDates: [...prev.keyDates, { date: "", type: "Open for Inspection" }],
    }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl border border-[#CBD5E1] w-187 h-155  flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-sm font-bold text-[#4A24AB]">
            {isEdit ? "Edit Campaign" : "New Campaign"}
          </h2>
        </div>
        <div className="overflow-y-auto px-5 pb-4 flex flex-col gap-4">
          <ModalField label="Campaign">
            <Input
              value={form.campaign}
              onChange={(e) => setField("campaign", e.target.value)}
              placeholder={isEdit ? "" : "Campaign Name"}
              className="w-full h-10 text-base rounded-md border-[#CBD5E1]  placeholder:text-[#94A3B8]"
            />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Type">
              <Select
                value={form.type}
                onValueChange={(v) => setField("type", v)}
              >
                <SelectTrigger className="w-full h-10 text-base rounded-md border border-[#CBD5E1]">
                  <SelectValue placeholder="About Type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t} className="text-base">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </ModalField>

            <ModalField label="Status">
              <StatusPill
                value={form.status}
                onChange={(v) => setField("status", v)}
              />
            </ModalField>
          </div>
          <ModalField label="Listing URL">
            <Input
              value={form.listingUrl}
              onChange={(e) => setField("listingUrl", e.target.value)}
              placeholder="URL here"
              className="w-full h-10 text-base rounded-md border border-[#CBD5E1] placeholder:text-[#94A3B8]"
            />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Price Guide (Min)">
              <Input
                value={form.priceMin}
                onChange={(e) => setField("priceMin", e.target.value)}
                placeholder="Add minimum price"
                className="w-full h-10 text-base rounded-md border border-[#CBD5E1] placeholder:text-[#94A3B8]"
              />
            </ModalField>
            <ModalField label="Price Guide (Max)">
              <Input
                value={form.priceMax}
                onChange={(e) => setField("priceMax", e.target.value)}
                placeholder="Add maximum price"
                className="w-full h-10 text-xs rounded-md border border-[#CBD5E1] placeholder:text-[#94A3B8]"
              />
            </ModalField>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold text-slate-700">
              Key Dates
            </span>
            <div className=" flex flex-col gap-2">
              {form.keyDates.map((kd, i) => (
                <KeyDateRow
                  key={i}
                  date={kd.date}
                  type={kd.type}
                  onDateChange={(v) => updateDate(i, "date", v)}
                  onTypeChange={(v) => updateDate(i, "type", v)}
                  onRemove={() => removeDate(i)}
                />
              ))}
            </div>
            <Button
              onClick={addDate}
              className="w-103 h-10 flex items-center gap-1.5 text-sm font-semibold bg-[#4A24AB] text-white mt-1"
            >
              <Plus size={12} strokeWidth={2.5} />
              Add New Date
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border border-[#CBD5E1]">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-10 px-4 text-sm font-medium rounded-md border-[#4A24AB] border text-[#4A24AB]"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onSchedule?.(form);
              onClose();
            }}
            className="h-10 px-4 bg-[#4A24AB] text-white text-sm font-semibold rounded-md"
          >
            Schedule
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EditCampaignModal({ open, onClose, onSchedule, campaign }) {
  return (
    <CampaignModal
      open={open}
      onClose={onClose}
      onSchedule={onSchedule}
      mode="edit"
      initialData={
        campaign
          ? { ...EDIT_FORM, campaign: campaign.name ?? "Sales 1" }
          : undefined
      }
    />
  );
}

export function NewCampaignModal({ open, onClose, onSchedule }) {
  return (
    <CampaignModal
      open={open}
      onClose={onClose}
      onSchedule={onSchedule}
      mode="new"
    />
  );
}

function ModalField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-[#4A24AB] ">
        {label}
      </span>
      {children}
    </div>
  );
}
