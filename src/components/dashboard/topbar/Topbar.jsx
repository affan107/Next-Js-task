"use client";

import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  AlignJustify,
  PhoneCall,
  Bot,
  ContactRound,
  List,
  Building2,
  Settings,
  UserCircle,
  Users,
  UserCog,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useTopbar } from "@/context/TopbarContext";

const SEGMENT_LABELS = {
  dashboard: "Dashboard", batches: "Batches", calls: "Calls",
  bots: "Bots", contacts: "Contacts", lists: "Lists",
  properties: "Properties", settings: "Settings",
  personal: "User Settings", team: "Team Settings",
  members: "Members", billing: "Billing",
};

const NAV_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
  { icon: AlignJustify, label: "Batches", href: "/dashboard/batches" },
  { icon: PhoneCall, label: "Calls", href: "/dashboard/calls" },
  { icon: Bot, label: "Bots", href: "/dashboard/bots" },
  { icon: ContactRound, label: "Contacts", href: "/dashboard/contacts" },
  { icon: List, label: "Lists", href: "/dashboard/lists" },
  { icon: Building2, label: "Properties", href: "/dashboard/properties" },
  { icon: UserCircle, label: "User Settings", href: "/dashboard/settings/personal" },
  { icon: Users, label: "Team Settings", href: "/dashboard/settings/team" },
  { icon: UserCog, label: "Members", href: "/dashboard/settings/members" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/settings/billing" },
];

// const isId = (seg) => /^\d+$/.test(seg) || /^[a-f0-9-]{20,}$/i.test(seg);
// function getLabel(seg) {
//   if (SEGMENT_LABELS[seg]) return SEGMENT_LABELS[seg];
//   if (isId(seg)) return `#${seg}`;
//   return seg.charAt(0).toUpperCase() + seg.slice(1);
// }

function ActiveTabHeading({ pathname }) {
  const match = [...NAV_ITEMS]
    .reverse()
    .find((item) =>
      item.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname === item.href || pathname.startsWith(item.href + "/")
    );

  if (!match) return null;
  const Icon = match.icon;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-7 h-7 rounded-lg ">
        <Icon size={14} strokeWidth={2} className="text-[#4A24AB]" />
      </div>
      <span className="text-sm font-semibold text-slate-800">{match.label}</span>
    </div>
  );
}

export default function Topbar() {
  const pathname = usePathname();
  const { topbarContent } = useTopbar();

  return (
    <header className="flex flex-wrap items-center gap-2 px-4 py-2 bg-white border border-slate-200">
      <ActiveTabHeading pathname={pathname} />

      {topbarContent && (
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto md:ml-auto">
          {topbarContent}
        </div>
      )}
    </header>
  );
}