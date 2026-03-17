"use client";

import { useState } from "react";
import { ChevronDown, X, PanelLeftOpen, Maximize2, Minimize2 } from "lucide-react";
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
  onMaximize,
  maximized
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
          <button
            onClick={onMaximize}
            title={maximized ? "Restore" : "Maximize"}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            {maximized
              ? <Minimize2 size={14} strokeWidth={1.8} />
              : <Maximize2 size={14} strokeWidth={1.8} />
            }
          </button>
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

        <label className="text-sm font-medium text-[#4A24AB] pt-1.5"> Description </label>
          <Textarea
            value={form.description}
            onChange={set("description")}
            placeholder="Description here"
            rows={3}
            className="w-88 h-18 text-xs rounded-lg border-gray-200  placeholder:text-gray-300 resize-none"
          />
        
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-start gap-3">
      <span className="text-sm font-medium text-[#4A24AB] pt-1.5">
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}
