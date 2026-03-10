"use client";

import AnalyticsCard from "./AnalyticsCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", property: 320, flagging: 210 },
  { name: "Feb", property: 410, flagging: 260 },
  { name: "Mar", property: 380, flagging: 300 },
  { name: "Apr", property: 500, flagging: 340 },
  { name: "May", property: 460, flagging: 310 },
  { name: "Jun", property: 540, flagging: 390 },
  { name: "Jul", property: 510, flagging: 360 },
  { name: "Aug", property: 580, flagging: 420 },
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
            {p.name}: {p.value}
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

export default function UserEngagementChart() {
  return (
    <AnalyticsCard
      title="User Engagement"
      value="15,800 Total Mins"
      chartHeight="h-[130px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 4, right: 4, left: -32, bottom: 0 }}
        >
          <defs>
            <linearGradient id="engPropGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4B3FD4" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4B3FD4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="engFlagGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A89CED" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#A89CED" stopOpacity={0} />
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
          <Area
            type="monotone"
            dataKey="property"
            name="Property"
            stroke="#4B3FD4"
            strokeWidth={2}
            fill="url(#engPropGrad)"
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Area
            type="monotone"
            dataKey="flagging"
            name="Flagging"
            stroke="#A89CED"
            strokeWidth={2}
            fill="url(#engFlagGrad)"
            dot={false}
            activeDot={{ r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
