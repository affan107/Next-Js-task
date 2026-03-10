"use client";

import AnalyticsCard from "./AnalyticsCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", value: 62 },
  { name: "Feb", value: 70 },
  { name: "Mar", value: 65 },
  { name: "Apr", value: 78 },
  { name: "May", value: 74 },
  { name: "Jun", value: 80 },
  { name: "Jul", value: 76 },
  { name: "Aug", value: 83 },
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

export default function CallBusinessRateChart() {
  return (
    <AnalyticsCard
      title="Call Business Rate"
      value="78% Success Rate"
      badge={
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
          Good
        </span>
      }
      chartHeight="h-[130px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 4, left: -32, bottom: 0 }}
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
          <YAxis
            tick={{ fontSize: 9, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            domain={[40, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4B3FD4"
            strokeWidth={2}
            dot={{ r: 3, fill: "#4B3FD4", strokeWidth: 0 }}
            activeDot={{ r: 4, fill: "#4B3FD4" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
