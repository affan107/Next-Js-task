"use client";

import { useState, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  Play,
  Pause,
  Volume2,
  Copy,
} from "lucide-react";
import { CallStatusBadge } from "./CallsTable";
import { MOCK_CALL_DETAIL } from "./callsMockData";
import { cn } from "@/lib/utils";

// ── Purple stat label ─────────────────────────────────────────────────────────
function StatRow({ label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#4A24AB] w-28 shrink-0">
        {label}
      </span>
      <span className="text-sm text-slate-800">{value}</span>
    </div>
  );
}

// ── Interest level badge (orange "Hot", blue "Warm", etc.) ────────────────────
const INTEREST_STYLES = {
  Hot: "bg-orange-100 text-orange-600",
  Warm: "bg-yellow-100 text-yellow-600",
  Cold: "bg-blue-100   text-blue-600",
  Unknown: "bg-gray-100   text-gray-500",
};
function InterestBadge({ level }) {
  const style = INTEREST_STYLES[level] ?? "bg-gray-100 text-gray-500";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
        style,
      )}
    >
      {level}
    </span>
  );
}

// ── Waveform bars (decorative — matches the Figma waveform visual) ────────────
function Waveform({ playing }) {
  const bars = [
    3, 5, 8, 6, 9, 7, 5, 10, 8, 6, 9, 5, 7, 8, 6, 5, 9, 7, 4, 6, 8, 5, 7, 9, 6,
    8, 5, 7, 6, 9,
  ];
  return (
    <div className="flex items-center gap-[2px] h-8">
      {bars.map((h, i) => (
        <div
          key={i}
          className={cn(
            "w-[2px] rounded-full transition-all duration-100",
            playing ? "bg-white" : "bg-white/70",
          )}
          style={{ height: `${h * 2.8}px` }}
        />
      ))}
    </div>
  );
}

// ── Audio player ──────────────────────────────────────────────────────────────
function RecordingPlayer({ duration = "02:12" }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const toggle = () => {
    if (playing) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e >= 132) {
            clearInterval(intervalRef.current);
            setPlaying(false);
            return 0;
          }
          return e + 1;
        });
      }, 1000);
    }
    setPlaying((v) => !v);
  };

  const pad = (n) => String(n).padStart(2, "0");
  const mins = pad(Math.floor(elapsed / 60));
  const secs = pad(elapsed % 60);

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors",
        playing ? "bg-[#4A24AB]" : "bg-[#4A24AB]/10 border border-[#4A24AB]/20",
      )}
    >
      {/* Play / Pause */}
      <button
        onClick={toggle}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors",
          playing
            ? "bg-white text-[#4A24AB]"
            : "border-2 border-[#4A24AB] text-[#4A24AB] bg-white",
        )}
      >
        {playing ? (
          <Pause size={14} fill="currentColor" strokeWidth={0} />
        ) : (
          <Play size={14} fill="currentColor" strokeWidth={0} />
        )}
      </button>

      {/* Waveform */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <Waveform playing={playing} />
      </div>

      {/* Timer */}
      <span
        className={cn(
          "text-xs font-medium tabular-nums shrink-0",
          playing ? "text-white" : "text-[#4A24AB]",
        )}
      >
        {playing ? `${mins}:${secs}` : duration}
      </span>

      {/* Volume */}
      <button
        className={cn(
          "shrink-0",
          playing
            ? "text-white/80 hover:text-white"
            : "text-[#4A24AB]/60 hover:text-[#4A24AB]",
        )}
      >
        <Volume2 size={14} strokeWidth={1.8} />
      </button>
    </div>
  );
}

// ── Collapsible section wrapper ───────────────────────────────────────────────
function Collapsible({
  title,
  defaultOpen = true,
  children,
  cardStyle = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const inner = (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 w-fit"
      >
        <span className="text-sm font-semibold text-slate-700">{title}</span>
        {open ? (
          <ChevronDown size={15} className="text-slate-500" />
        ) : (
          <ChevronUp size={15} className="text-slate-500" />
        )}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </>
  );

  if (cardStyle) {
    return (
      <div className="rounded-lg border border-[#6B3FE8] bg-[#F4F3FF] p-4 flex flex-col gap-0">
        {inner}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-0">
      {inner}
    </div>
  );
}

// ── Transcript ────────────────────────────────────────────────────────────────
function Transcript({ messages }) {
  return (
    <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
      {messages.map((msg, i) => {
        const isBot = msg.role === "bot";
        return (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-0.5",
              isBot ? "items-start" : "items-end",
            )}
          >
            <span className="text-[10px] font-medium text-slate-400 px-1">
              {isBot ? "Bot" : "Client"}
            </span>
            <div
              className={cn(
                "px-3 py-2 rounded-2xl text-sm max-w-[75%]",
                isBot
                  ? "bg-slate-100 text-slate-800 rounded-tl-sm"
                  : "bg-[#4A24AB] text-white rounded-tr-sm",
              )}
            >
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * CallDetailPanel
 * Props:
 *  - call?: object  — defaults to MOCK_CALL_DETAIL
 */
export default function CallDetailPanel({ call = MOCK_CALL_DETAIL }) {
  return (
    <div className="flex flex-col gap-5">
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 mb-1">
            <Maximize2 size={13} className="text-slate-400" strokeWidth={1.8} />
            <Copy size={13} className="text-slate-400" strokeWidth={1.8} />
          </div>
          <span className="text-xs font-semibold text-[#4A24AB]">
            Call Summary
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            {call.contact}, {call.time}
          </h2>
        </div>
      </div>

      {/* ── Stats + Recording ── */}
      <div className="flex gap-8 items-start">
        {/* Left: stat rows */}
        <div className="flex flex-col gap-2.5 flex-1">
          <StatRow label="Address" value={call.address} />
          <StatRow label="Suburb" value={call.suburb} />
          <StatRow label="Type" value={call.type} />
          <StatRow label="Bot" value={call.bot} />
          <StatRow label="Batch" value={call.batch} />
          <StatRow label="Duration" value={call.duration} />
          <StatRow
            label="Status"
            value={<CallStatusBadge status={call.status} />}
          />
        </div>

        {/* Right: recording player */}
        <div className="flex flex-col gap-1.5 shrink-0 w-64">
          <span className="text-xs font-medium text-slate-500">Recording</span>
          <RecordingPlayer duration={call.recordingDuration} />
        </div>
      </div>

      {/* ── AI Insights ── */}
      <Collapsible title="AI Insights" cardStyle>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-900 w-28 shrink-0">
              Qualified Buyers
            </span>
            <span className="text-sm text-slate-800">
              {call.aiInsights.qualifiedBuyers}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-900 w-28 shrink-0">
              Attending Event
            </span>
            <span className="text-sm text-slate-800">
              {call.aiInsights.attendingEvent}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-900 w-28 shrink-0">
              Interest Level
            </span>
            <InterestBadge level={call.aiInsights.interestLevel} />
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {call.aiInsights.summary.map((line, i) => (
              <p key={i} className="text-[11px] text-gray-500 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ── Call Summary ── */}
      <Collapsible title="Call Summary">
        <p className="text-sm text-slate-700 leading-relaxed">
          {call.callSummary}
        </p>
      </Collapsible>

      {/* ── Transcript ── */}
      <Collapsible title="Transcript">
        <Transcript messages={call.transcript} />
      </Collapsible>
    </div>
  );
}
