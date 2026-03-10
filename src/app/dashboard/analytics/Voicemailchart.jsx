"use client";

import AnalyticsCard from "./AnalyticsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", rate: 18 },
  { name: "Feb", rate: 22 },
  { name: "Mar", rate: 19 },
  { name: "Apr", rate: 24 },
  { name: "May", rate: 20 },
  { name: "Jun", rate: 22 },
  { name: "Jul", rate: 25 },
  { name: "Aug", rate: 23 },
];

// Breakdown pills shown below the KPI
const breakdown = [
  { label: "Answered", pct: 55, color: "#4B3FD4" },
  { label: "Voicemail", pct: 22, color: "#A89CED" },
  { label: "Missed", pct: 23, color: "#E5E2FC" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-md rounded-lg px-2.5 py-1.5 text-[10px]">
        <p className="text-gray-500 mb-0.5">{label}</p>
        <p className="font-semibold text-[#4B3FD4]">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function VoicemailChart() {
  return (
    <AnalyticsCard
      title="Voicemail Rate"
      value="22%"
      badge={
        <span className="text-[10px] text-gray-400 font-normal">
          voicemail rate
        </span>
      }
      chartHeight="h-[100px]"
    >
      <div className="flex flex-col gap-2 h-full">
        {/* Stacked progress bar */}
        <div className="flex h-2 w-full rounded-full overflow-hidden gap-0.5">
          {breakdown.map((b) => (
            <div
              key={b.label}
              style={{ width: `${b.pct}%`, backgroundColor: b.color }}
              className="h-full first:rounded-l-full last:rounded-r-full transition-all"
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: b.color }}
              />
              <span className="text-[9px] text-gray-500">
                {b.label} {b.pct}%
              </span>
            </div>
          ))}
        </div>

        {/* Mini bar sparkline */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 2, right: 4, left: -32, bottom: 0 }}
              barSize={7}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" radius={[2, 2, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.name === "Apr" ? "#4B3FD4" : "#C4BEFA"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AnalyticsCard>
  );
}
