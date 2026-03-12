"use client";

import { useState } from "react";
import { ChevronDown, X, PanelLeftOpen } from "lucide-react";
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

const MOCK_AGENTS = [
  "John Mcmahon",
  "Barbara Darcean",
  "Ryan Steffani",
  "Sofia Vargas",
  "David Beckham",
  "Emma Stone",
];

export default function PropertyDescriptionForm({
  property,
  onSave,
  onCancel,
  isNew = false,
}) {
  const [form, setForm] = useState({
    address: property?.address ?? "",
    suburb: property?.suburb ?? "",
    agent: property?.agent ?? "",
    description: property?.description ?? "",
  });

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e?.target?.value ?? e }));

  const handleSave = () => onSave?.(form);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <PanelLeftOpen size={15} strokeWidth={1.8} />
          <span className="text-xl font-semibold text-slate-700">
            Property Description
          </span>
          <ChevronDown size={15} className="text-black" />
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            onClick={handleSave}
            size="sm"
            className="w-16 h-10 px-4 bg-[#4A24AB] text-white text-sm font-medium rounded-md"
          >
            Save
          </Button>
          <button
            onClick={onCancel}
            className="flex items-center justify-center w-10 h-10 border border-slate-200 text-red-600 rounded"
          >
            <X size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
      {/* ── Form fields ── */}
      <div className="flex flex-col gap-3">
        <FormField label="Address">
          <Input
            value={form.address}
            onChange={set("address")}
            placeholder="Address here"
            className="w-64 h-9 text-xs rounded-lg border-[#CBD5E1] placeholder:text-[#94A3B8]"
          />
        </FormField>

        <FormField label="Suburb">
          <Input
            value={form.suburb}
            onChange={set("suburb")}
            placeholder="Suburb here"
            className="w-64 h-9  text-xs rounded-lg border-[#CBD5E1]  placeholder:text-[#94A3B8]"
          />
        </FormField>

        <FormField label="Agent">
          <Select value={form.agent} onValueChange={set("agent")}>
            <SelectTrigger className="w-64 h-9  text-xs rounded-lg border-[#CBD5E1]">
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_AGENTS.map((a) => (
                <SelectItem key={a} value={a} className="text-xs">
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Description">
          <Textarea
            value={form.description}
            onChange={set("description")}
            placeholder="Description here"
            rows={3}
            className="w-96 h-18 text-xs rounded-lg border-gray-200  placeholder:text-gray-300 resize-none"
          />
        </FormField>

        {isNew && (
          <div className="mt-1">
            <label className="flex flex-col items-center justify-center gap-2 w-full py-5 rounded-xl border-2 border-dashed border-[#4B3FD4] bg-[#FAFAFE] cursor-pointer hover:bg-[#F3F2FD] transition-colors">
              <input type="file" accept="image/*" className="hidden" />
              <div className="flex items-center gap-2 text-[#4B3FD4]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="text-xs font-semibold text-[#4B3FD4]">
                  Upload Property Image
                </span>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-start gap-3">
      <span className="text-sm font-medium text-[#4A24AB] pt-1.5 ">
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}
