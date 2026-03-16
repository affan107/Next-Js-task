"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const SEGMENT_LABELS = {
  dashboard: "Dashboard",
  batches: "Batches",
  calls: "Calls",
  bots: "Bots",
  contacts: "Contacts",
  lists: "Lists",
  properties: "Properties",
  settings: "Settings",
  personal: "Personal Settings",
  team: "Team Settings",
  members: "Members",
  billing: "Billing",
  detail: "Detail",
  analytics: "Analytics",
};

// Numeric ids and UUID-like strings → show as "#1", "#abc123…"
const isId = (seg) => /^\d+$/.test(seg) || /^[a-f0-9-]{20,}$/i.test(seg);

function getLabel(seg) {
  if (SEGMENT_LABELS[seg]) return SEGMENT_LABELS[seg];
  if (isId(seg)) return `#${seg}`;
  return seg.charAt(0).toUpperCase() + seg.slice(1);
}

function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => ({
    label: getLabel(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <nav className="flex items-center gap-1 text-sm">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={13} className="text-gray-300" />}
          {crumb.isLast ? (
            <span className="text-gray-800 font-medium">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
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
