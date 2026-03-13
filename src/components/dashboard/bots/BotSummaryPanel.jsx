"use client";

import { useState } from "react";
import { Maximize2, Copy, Phone, ExternalLink, X } from "lucide-react";
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
import TestCallModal from "./TestCallModal";
import {
  WORKFLOW_STAGES,
  ACTIVITY_OPTIONS,
  TEMPLATE_OPTIONS,
  VOICE_OPTIONS,
} from "./botsMockData";

function StatRow({ label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-sm font-medium text-[#4A24AB] w-28 shrink-0">
        {label}
      </span>
      <span className="text-sm text-slate-800">{value ?? "—"}</span>
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <span className="text-sm font-medium text-[#4A24AB] mb-1 block">
      {children}
    </span>
  );
}

/**
 * Fully driven by the `bot` prop — no hardcoded values.
 *
 * Props:
 *  - bot: object              — the currently selected bot row
 *  - onClose?: () => void
 *  - onSave?: (updatedBot) => void
 */
export default function BotSummaryPanel({ bot, onClose, onSave }) {
  const [editing, setEditing] = useState(false);
  const [testCallOpen, setTestCallOpen] = useState(false);

  // Local edit form — initialised fresh whenever bot changes
  const [form, setForm] = useState(null);

  const currentForm = form ?? {
    name: bot.name,
    workflowStage: bot.workflowStage ?? bot.stage,
    activity: bot.activity,
    description: bot.description,
    template: bot.template ?? bot.botTemplate,
    voice: bot.voice,
    promptDescription: bot.promptDescription ?? "",
    dataCollection: bot.dataCollection ?? [],
  };

  const setField = (key, val) =>
    setForm((prev) => ({ ...(prev ?? currentForm), [key]: val }));

  const handleSave = () => {
    onSave?.({ ...bot, ...currentForm });
    setEditing(false);
    setForm(null);
  };

  const handleCancel = () => {
    setForm(null);
    setEditing(false);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-4">
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
              Bot Summary
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              {bot.summaryTitle ?? bot.activity}
            </h2>
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
                  className="flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-200 transition-all"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setTestCallOpen(true)}
                  size="sm"
                  className="h-9 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-medium rounded-md gap-1.5"
                >
                  <Phone size={13} strokeWidth={2} />
                  Test Call
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

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4">
          {editing ? (
            /* ── Edit Mode ── */
            <>
              <div>
                <FieldLabel>Bot Name</FieldLabel>
                <Input
                  value={currentForm.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Lead Qualification"
                  className="h-9 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
                />
              </div>

              <div>
                <FieldLabel>Workflow Stage</FieldLabel>
                <Select
                  value={currentForm.workflowStage}
                  onValueChange={(v) => setField("workflowStage", v)}
                >
                  <SelectTrigger className="h-9 text-sm rounded-md border-[#CBD5E1] focus:ring-[#4A24AB]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WORKFLOW_STAGES.map((s) => (
                      <SelectItem key={s} value={s} className="text-sm">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <FieldLabel>Activity</FieldLabel>
                <Select
                  value={currentForm.activity}
                  onValueChange={(v) => setField("activity", v)}
                >
                  <SelectTrigger className="h-9 text-sm rounded-md border-[#CBD5E1] focus:ring-[#4A24AB]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ACTIVITY_OPTIONS.map((a) => (
                      <SelectItem key={a} value={a} className="text-sm">
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <FieldLabel>Description</FieldLabel>
                <Input
                  value={currentForm.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="Pitch new properties"
                  className="h-9 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
                />
              </div>

              <div>
                <FieldLabel>Template</FieldLabel>
                <Select
                  value={currentForm.template}
                  onValueChange={(v) => setField("template", v)}
                >
                  <SelectTrigger className="h-9 text-sm rounded-md border-[#CBD5E1] focus:ring-[#4A24AB]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEMPLATE_OPTIONS.map((t) => (
                      <SelectItem key={t} value={t} className="text-sm">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <FieldLabel>Voice</FieldLabel>
                <Select
                  value={currentForm.voice}
                  onValueChange={(v) => setField("voice", v)}
                >
                  <SelectTrigger className="h-9 text-sm rounded-md border-[#CBD5E1] focus:ring-[#4A24AB]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VOICE_OPTIONS.map((v) => (
                      <SelectItem key={v} value={v} className="text-sm">
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  value={currentForm.promptDescription}
                  onChange={(e) =>
                    setField("promptDescription", e.target.value)
                  }
                  rows={4}
                  className="text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB] resize-none"
                />
              </div>

              <div>
                <FieldLabel>Data Collection</FieldLabel>
                <div className="rounded-md border border-[#CBD5E1] p-3 flex flex-col gap-1.5 max-h-40 overflow-y-auto">
                  {currentForm.dataCollection.map((item, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-[#4A24AB]"
                        defaultChecked
                      />
                      <span className="text-xs text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <StatRow label="Bot Name" value={bot.name} />
              <StatRow label="Stage" value={bot.stage} />
              <StatRow label="Description" value={bot.description} />
              <StatRow label="Activity" value={bot.activity} />
              <StatRow label="Type" value={bot.type} />
              <StatRow
                label="Template"
                value={bot.template ?? bot.botTemplate}
              />
              <StatRow label="Voice" value={bot.voice} />
            </div>
          )}
        </div>
      </div>

      <TestCallModal
        open={testCallOpen}
        onClose={() => setTestCallOpen(false)}
        onStartCall={(data) => console.log("Start call:", data)}
        botName={bot.name}
      />
    </>
  );
}
