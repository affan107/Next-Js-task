"use client";

import AnalyticsCard from "./AnalyticsCard";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", property: 4.2, bot: 3.1 },
  { name: "Feb", property: 5.0, bot: 3.8 },
  { name: "Mar", property: 4.6, bot: 4.2 },
  { name: "Apr", property: 6.1, bot: 4.9 },
  { name: "May", property: 5.4, bot: 3.6 },
  { name: "Jun", property: 6.8, bot: 5.1 },
  { name: "Jul", property: 6.2, bot: 4.7 },
  { name: "Aug", property: 7.0, bot: 5.5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-md rounded-lg px-2.5 py-1.5 text-[10px] space-y-0.5">
        <p className="text-gray-500 mb-1">{label}</p>
        {payload.map((p) => (
          <p
            key={p.dataKey}
            style={{ color: p.stroke }}
            className="font-semibold"
          >
            {p.name}: {p.value} mins
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="flex items-center gap-3 justify-end pr-1">
    {payload?.map((entry) => (
      <div key={entry.value} className="flex items-center gap-1">
        <span
          className="w-2 h-0.5 inline-block rounded"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-[9px] text-gray-500 capitalize">
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default function AvgCallDurationChart() {
  return (
    <AnalyticsCard
      title="Average Call Duration by Batch"
      value="6,018 Mins"
      chartHeight="h-[130px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 4, left: -32, bottom: 0 }}
        >
          <defs>
            <linearGradient id="propGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4B3FD4" stopOpacity={0.15} />
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
          <Legend content={<CustomLegend />} />
          <Line
            type="monotone"
            dataKey="property"
            name="Property"
            stroke="#4B3FD4"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="bot"
            name="Bot"
            stroke="#C4BEFA"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
            strokeDasharray="4 3"
          />
        </LineChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
