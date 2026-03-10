"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTH_OPTIONS = [
  { value: "january", label: "Jan" },
  { value: "february", label: "Feb" },
  { value: "march", label: "Mar" },
  { value: "april", label: "Apr" },
  { value: "may", label: "May" },
  { value: "june", label: "Jun" },
  { value: "july", label: "July" },
  { value: "august", label: "Aug" },
  { value: "septemeber", label: "Sep" },
  { value: "october", label: "Oct" },
  { value: "november", label: "Nov" },
  { value: "december", label: "Dec" },
];

/**
 * StatCard
 *
 * Props:
 *  - title: string                       — card heading
 *  - value: string                       — big number e.g. "6,018 Mins"
 *  - subValue?: string                   — secondary label below value
 *  - delta?: number                      — percentage change, e.g. 4.2 or -1.8
 *  - deltaLabel?: string                 — e.g. "Apr ↑"
 *  - chartType?: "bar" | "line" | "area" — default "bar"
 *  - chartData?: Array<{name, value}>
 *  - chartColor?: string                 — hex color for the chart
 *  - defaultMonth?: string
 *  - className?: string
 */
export default function StatCard({
  title = "Total Call Minutes",
  value = "0",
  subValue,
  delta,
  deltaLabel,
  chartType = "bar",
  chartData = [],
  chartColor = "#FFFFF",
  defaultMonth = "april",
  className,
}) {
  const [month, setMonth] = useState(defaultMonth);

  const isPositive = delta > 0;
  const isNeutral = delta === 0 || delta == null;

  const DeltaIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  const deltaColor = isNeutral
    ? "text-gray-400"
    : isPositive
      ? "text-emerald-500"
      : "text-red-400";

  return (
    <Card
      className={cn(
        "bg-slate-50 rounded-xl border-0 shadow-sm p-4 flex flex-col gap-3",
        className,
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-gray-500 leading-tight">
          {title}
        </p>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="h-6 w-16 text-sm border-gray-200 rounded-md px-2 shrink-0 focus:ring-[#4B3FD4]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTH_OPTIONS.map((m) => (
              <SelectItem key={m.value} value={m.value} className="text-xs">
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Value */}
      <div className="space-y-0.5">
        <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
        {subValue && <p className="text-[11px] text-gray-400">{subValue}</p>}
        {delta != null && (
          <div className={cn("flex items-center gap-1 mt-1", deltaColor)}>
            <DeltaIcon size={12} strokeWidth={2} />
            <span className="text-[11px] font-medium">
              {isPositive ? "+" : ""}
              {delta}% {deltaLabel ?? ""}
            </span>
          </div>
        )}
      </div>

      {/* Mini chart */}
      {chartData.length > 0 && (
        <div className="h-[64px] w-full -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
              >
                <YAxis hide />
                <XAxis dataKey="name" hide />
                <Tooltip
                  contentStyle={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 6,
                  }}
                  itemStyle={{ color: chartColor }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3 }}
                />
              </LineChart>
            ) : chartType === "area" ? (
              <AreaChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`areaGrad-${title}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={chartColor}
                      stopOpacity={0.25}
                    />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis hide />
                <XAxis dataKey="name" hide />
                <Tooltip
                  contentStyle={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 6,
                  }}
                  itemStyle={{ color: chartColor }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  fill={`url(#areaGrad-${title})`}
                  dot={false}
                />
              </AreaChart>
            ) : (
              /* default: bar */
              <BarChart
                data={chartData}
                margin={{ top: 4, right: 4, left: -28, bottom: 0 }}
                barSize={6}
              >
                <YAxis hide />
                <XAxis dataKey="name" hide />
                <Tooltip
                  contentStyle={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 6,
                  }}
                  itemStyle={{ color: chartColor }}
                />
                <Bar dataKey="value" fill={chartColor} radius={[2, 2, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
