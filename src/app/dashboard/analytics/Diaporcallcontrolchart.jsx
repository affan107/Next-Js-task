"use client";

import AnalyticsCard from "./AnalyticsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", property: 420, bot: 310 },
  { name: "Feb", property: 380, bot: 290 },
  { name: "Mar", property: 500, bot: 340 },
  { name: "Apr", property: 460, bot: 380 },
  { name: "May", property: 530, bot: 410 },
  { name: "Jun", property: 490, bot: 360 },
  { name: "Jul", property: 550, bot: 430 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-md rounded-lg px-2.5 py-1.5 text-[10px] space-y-0.5">
        <p className="text-gray-500 mb-1">{label}</p>
        {payload.map((p) => (
          <p
            key={p.dataKey}
            style={{ color: p.fill }}
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
          className="w-2 h-2 rounded-sm inline-block"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-[9px] text-gray-500 capitalize">
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default function DiaporCallControlChart() {
  return (
    <AnalyticsCard
      title="Reason Call Ended"
      value="1,203 Calls"
      chartHeight="h-[130px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, left: -32, bottom: 0 }}
          barSize={5}
          barGap={2}
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
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            wrapperStyle={{ paddingBottom: 0 }}
          />
          <Bar
            dataKey="property"
            name="Property"
            fill="#4B3FD4"
            radius={[2, 2, 0, 0]}
          />
          <Bar dataKey="bot" name="Bot" fill="#C4BEFA" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </AnalyticsCard>
  );
}
