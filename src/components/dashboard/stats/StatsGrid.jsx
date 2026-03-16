"use client";

import StatCard from "./StatCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// ─── Mock chart data helpers ──────────────────────────────────────────────────

const makeBarData = (seed = 1) =>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((name, i) => ({
    name,
    value: Math.floor((Math.sin(i * seed + seed) + 1.5) * 40 + 20),
  }));

const makeLineData = (seed = 1) =>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((name, i) => ({
    name,
    value: Math.floor((Math.cos(i * seed + seed) + 1.5) * 50 + 30),
  }));

// ─── Stat definitions ─────────────────────────────────────────────────────────

const STATS = [
  {
    id: "minutes-property",
    title: "Total Call Minutes By Property",
    value: "6,018 Mins",
    subValue: "Across all properties",
    delta: 4.2,
    deltaLabel: "Apr",
    chartType: "bar",
    chartData: makeBarData(1),
    chartColor: "#4B3FD4",
  },
  {
    id: "minutes-bots",
    title: "Total Call Minutes By Bots",
    value: "6,018 Mins",
    subValue: "Automated bot calls",
    delta: 2.1,
    deltaLabel: "Apr",
    chartType: "bar",
    chartData: makeBarData(2),
    chartColor: "#7C6FE0",
  },
  {
    id: "total-calls",
    title: "Total Number of Calls",
    value: "1,203 Calls",
    subValue: "This month",
    delta: -1.4,
    deltaLabel: "Apr",
    chartType: "line",
    chartData: makeLineData(3),
    chartColor: "#4B3FD4",
  },
  {
    id: "cost-benchmarking",
    title: "Cost Benchmarking By Property",
    value: "$830",
    subValue: "Avg. per property",
    delta: 0.8,
    deltaLabel: "Apr",
    chartType: "bar",
    chartData: makeBarData(4),
    chartColor: "#A89CED",
  },
];

const DATE_RANGES = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "This year" },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "property", label: "Property" },
  { value: "bot", label: "Bot" },
];

/**
 * StatsGrid
 *
 * Props:
 *  - stats: array — override the default stat definitions
 */
export default function StatsGrid({ stats = STATS }) {
  const [dateRange, setDateRange] = useState("30d");
  const [filter, setFilter] = useState("all");

  return (
    <section className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          Summary Statistics
        </h2>

        {/* Global filters */}
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="h-7 w-32 text-xs border-gray-200 rounded-lg focus:ring-[#4B3FD4]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value} className="text-xs">
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="h-7 w-24 text-xs border-gray-200 rounded-lg focus:ring-[#4B3FD4]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FILTER_OPTIONS.map((f) => (
                <SelectItem key={f.value} value={f.value} className="text-xs">
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 4-column stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subValue={stat.subValue}
            delta={stat.delta}
            deltaLabel={stat.deltaLabel}
            chartType={stat.chartType}
            chartData={stat.chartData}
            chartColor={stat.chartColor}
          />
        ))}
      </div>
    </section>
  );
}
