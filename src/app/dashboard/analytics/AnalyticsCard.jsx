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
import { cn } from "@/lib/utils";

const MONTH_OPTIONS = [
  { value: "jan", label: "Jan" },
  { value: "feb", label: "Feb" },
  { value: "mar", label: "Mar" },
  { value: "apr", label: "Apr" },
  { value: "may", label: "May" },
  { value: "jun", label: "Jun" },
];

/**
 * AnalyticsCard — shared wrapper for every analytics chart
 *
 * Props:
 *  - title: string
 *  - subtitle?: string             — small grey text under title
 *  - value?: string                — large KPI number (e.g. "1,203 Calls")
 *  - badge?: ReactNode             — e.g. a coloured pill next to the value
 *  - defaultMonth?: string
 *  - showFilter?: boolean
 *  - headerRight?: ReactNode       — extra content in top-right (besides select)
 *  - children: ReactNode           — the chart itself
 *  - className?: string
 *  - chartHeight?: string          — tailwind height class, default "h-[140px]"
 */
export default function AnalyticsCard({
  title,
  subtitle,
  value,
  badge,
  defaultMonth = "apr",
  showFilter = true,
  headerRight,
  children,
  className,
  chartHeight = "h-[140px]",
}) {
  const [month, setMonth] = useState(defaultMonth);

  return (
    <Card
      className={cn(
        "bg-slate-50 rounded-xl border-0 shadow-sm p-4 flex flex-col gap-3",
        className,
      )}
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-xs font-semibold text-slate-800 leading-tight truncate">
            {title}
          </p>
          {subtitle && (
            <p className="text-[10px] text-gray-400 leading-tight">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {headerRight}
          {showFilter && (
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="h-6 w-16 text-[10px] border-gray-200 rounded-md px-2 focus:ring-[#4B3FD4]">
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
          )}
        </div>
      </div>

      {/* ── KPI value + badge ── */}
      {(value || badge) && (
        <div className="flex items-center gap-2">
          {value && (
            <span className="text-lg font-bold text-gray-900 leading-none">
              {value}
            </span>
          )}
          {badge}
        </div>
      )}

      {/* ── Chart area ── */}
      <div className={cn("w-full", chartHeight)}>{children}</div>
    </Card>
  );
}
