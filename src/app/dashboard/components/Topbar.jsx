"use client";

import { usePathname } from "next/navigation";
import {  ChevronRight} from "lucide-react";
import { cn } from "@/lib/utils";

// Map route segments to readable labels
const segmentLabels = {
  dashboard: "Dashboard",
  properties: "Properties",
  calls: "Calls",
  analytics: "Analytics",
  users: "Users",
  settings: "Settings",
  help: "Help",
};

function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-sm">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const label =
          segmentLabels[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1);
        return (
          <span key={seg} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={13} className="text-gray-300" />}
            <span
              className={cn(
                isLast
                  ? "text-gray-800 font-medium"
                  : "text-gray-400 hover:text-gray-600 cursor-pointer transition-colors",
              )}
            >
              {label}
            </span>
          </span>
        );
      })}
    </nav>
  );
}

export default function Topbar() {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-white border-b border-gray-100 shrink-0 z-10">
      <Breadcrumb />
    </header>
  );
}
