"use client";

import AnalyticsCard from "./AnalyticsCard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Property A", value: 38 },
  { name: "Property B", value: 27 },
  { name: "Property C", value: 20 },
  { name: "Property D", value: 15 },
];

const COLORS = ["#4B3FD4", "#7C6FE0", "#A89CED", "#D6D2F8"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-md rounded-lg px-2.5 py-1.5 text-[10px]">
        <p className="font-semibold text-gray-700">{payload[0].name}</p>
        <p className="text-[#4B3FD4]">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ProductUsageChart() {
  return (
    <AnalyticsCard
      title="Product Usage"
      value="15,800 Total Mins"
      chartHeight="h-[140px]"
    >
      <div className="flex items-center gap-3 h-full">
        {/* Donut */}
        <div className="relative h-full w-[120px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="52%"
                outerRadius="78%"
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] font-bold text-gray-800">100%</span>
            <span className="text-[8px] text-gray-400">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          {data.map((entry, index) => (
            <div
              key={entry.name}
              className="flex items-center justify-between gap-1"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-[10px] text-gray-600 truncate">
                  {entry.name}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-gray-800 shrink-0">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnalyticsCard>
  );
}
