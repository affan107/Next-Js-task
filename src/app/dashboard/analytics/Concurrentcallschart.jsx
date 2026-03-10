"use client";

import AnalyticsCard from "./AnalyticsCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const data = [
  { name: "Jan", calls: 12 },
  { name: "Feb", calls: 18 },
  { name: "Mar", calls: 14 },
  { name: "Apr", calls: 22 },
  { name: "May", calls: 19 },
  { name: "Jun", calls: 28 },
  { name: "Jul", calls: 24 },
  { name: "Aug", calls: 31 },
];

const AVG = Math.round(data.reduce((s, d) => s + d.calls, 0) / data.length);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-md rounded-lg px-2.5 py-1.5 text-[10px]">
        <p className="text-gray-500 mb-0.5">{label}</p>
        <p className="font-semibold text-[#4B3FD4]">{payload[0].value} calls</p>
      </div>
    );
  }
  return null;
};

export default function ConcurrentCallsChart() {
  return (
    <AnalyticsCard
      title="Number of Concurrent Calls"
      value="1,203 Calls"
      badge={<span className="text-[10px] text-gray-400">avg {AVG}/mo</span>}
      chartHeight="h-[130px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, left: -32, bottom: 0 }}
        >
          <defs>
            <linearGradient id="concurrentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4B3FD4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#4B3FD4" stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <YAxis
            tick={{ fontSize: 9, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={AVG}
            stroke="#C4BEFA"
            strokeDasharray="4 3"
            strokeWidth={1}
          />
          <Area
            type="monotone"
            dataKey="calls"
            stroke="#4B3FD4"
            strokeWidth={2}
            fill="url(#concurrentGrad)"
            dot={false}
            activeDot={{ r: 3, fill: "#4B3FD4" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
