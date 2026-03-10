"use client";

import { useState } from "react";
import Link from "next/link";
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
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ─── Nav structure ────────────────────────────────────────────────────────────
const navSections = [
  {
    label: "AI Calling",
    items: [
      { icon: LayoutGrid, label: "Dashboard", href: "/dashboard" },
      { icon: AlignJustify, label: "Batches", href: "/dashboard/batches" },
      { icon: PhoneCall, label: "Calls", href: "/dashboard/calls" },
      { icon: Bot, label: "Bots", href: "/dashboard/bots" },
    ],
  },
  {
    label: "Contacts",
    items: [
      { icon: ContactRound, label: "Contacts", href: "/dashboard/contacts" },
      { icon: List, label: "Lists", href: "/dashboard/lists" },
    ],
  },
  {
    label: "Real Estate",
    items: [
      { icon: Building2, label: "Properties", href: "/dashboard/properties" },
    ],
  },
];

const VIEW_OPTIONS = ["Sales", "Rentals", "All"];

// ─── Reusable NavItem ─────────────────────────────────────────────────────────
function NavItem({ icon: Icon, label, href, expanded, isActive }) {
  const inner = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg transition-all duration-150 group/navitem",
        expanded ? "w-full px-3 py-2" : "w-9 h-9 justify-center mx-auto",
        isActive
          ? "bg-[#EEEDF9] text-[#4B3FD4]"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
      )}
    >
      <Icon
        size={16}
        strokeWidth={isActive ? 2.2 : 1.8}
        className={cn(
          "shrink-0 transition-colors",
          isActive
            ? "text-[#4B3FD4]"
            : "text-gray-400 group-hover/navitem:text-gray-600",
        )}
      />
      {expanded && (
        <span
          className={cn(
            "text-sm leading-none whitespace-nowrap",
            isActive
              ? "font-semibold text-[#4B3FD4]"
              : "font-medium text-gray-600",
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );

  if (!expanded) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{inner}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
  return inner;
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────
export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [activeView, setActiveView] = useState("Sales");
  const [teamMode, setTeamMode] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "relative flex flex-col h-screen bg-slate-200 border-r border-gray-100 shrink-0 z-20 overflow-hidden",
          "transition-all duration-300 ease-in-out",
          expanded ? "w-[255px]" : "w-[85px]",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-3 pt-4 pb-2",
            !expanded && "flex-col gap-2 items-center",
          )}
        >
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-0.5 select-none shrink-0"
          >
            {expanded ? (
              <>
                <span className="text-xl font-bold bg-gradient-to-r from-[#240EB3] to-[#24A5ED] bg-clip-text text-transparent leading-none">
                  vox
                </span>
                <span className="text-xl font-normal text-[#9B9B9B] leading-none">
                  works
                </span>
              </>
            ) : (
              <div className="flex items-center justify-center mb-6 px-2">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            )}
          </Link>

          {/* Panel toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center justify-center w-7 h-7 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all duration-150 shrink-0"
              >
                {expanded ? (
                  <PanelLeftClose size={15} strokeWidth={1.8} />
                ) : (
                  <PanelLeftOpen size={15} strokeWidth={1.8} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {expanded ? "Collapse" : "Expand"}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* ── Team selector ───────────────────────────────── */}
        <div
          className={cn("px-2 mb-2", !expanded && "px-2 flex justify-center")}
        >
          {expanded ? (
            <button className="flex items-center gap-2 w-full rounded-xl hover:bg-slate-300 px-2 py-1.5 transition-all group">
              {/* Team image */}
              <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                <Image
                  src="/team.jpg"
                  alt="Team"
                  width={36}
                  height={36}
                  className="object-contained"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="text-xs font-semibold text-gray-800 leading-tight">
                  Team
                </span>
                <span className="text-[10px] text-gray-400 leading-tight">
                  Team name
                </span>
              </div>
              <ChevronDown size={13} className="text-gray-400 shrink-0" />
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
              <Image
                src="/team.jpg"
                alt="Team"
                width={36}
                height={36}
                className="object-contained"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════
            SCROLLABLE NAV
        ══════════════════════════════════════════════════ */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-1 space-y-1">
          {navSections.map((section, si) => (
            <div key={section.label}>
              {/* Section label (expanded) or thin divider (collapsed) */}
              {expanded ? (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-2 pt-3 pb-1 select-none">
                  {section.label}
                </p>
              ) : (
                si > 0 && <div className="w-6 h-px bg-gray-200 mx-auto my-2" />
              )}

              <div className="flex flex-col gap-0.5">
                {section.items.map(({ icon, label, href }) => {
                  const isActive =
                    pathname === href || pathname.startsWith(href + "/");
                  return (
                    <NavItem
                      key={href}
                      icon={icon}
                      label={label}
                      href={href}
                      expanded={expanded}
                      isActive={isActive}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ══════════════════════════════════════════════════
            BOTTOM — View / Admin / User
        ══════════════════════════════════════════════════ */}
        <div className="border-t border-gray-100 pt-3 pb-4 px-3">
          {expanded ? (
            <div className="flex flex-col gap-3">
              {/* ── View toggle ── */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 select-none">
                  View
                </span>
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
                  {VIEW_OPTIONS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveView(v)}
                      className={cn(
                        "flex-1 text-xs font-medium py-1.5 rounded-md transition-all duration-150",
                        activeView === v
                          ? "bg-[#4B3FD4] text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-700",
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Agent / Team pill toggle ── */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    !teamMode ? "text-gray-800" : "text-gray-400",
                  )}
                >
                  Agent
                </span>
                <button
                  onClick={() => setTeamMode((v) => !v)}
                  className={cn(
                    "relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0",
                    teamMode ? "bg-[#4B3FD4]" : "bg-gray-200",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200",
                      teamMode ? "left-[22px]" : "left-0.5",
                    )}
                  />
                </button>
                <span
                  className={cn(
                    "text-xs font-medium",
                    teamMode ? "text-gray-800" : "text-gray-400",
                  )}
                >
                  Team
                </span>
              </div>

              {/* ── Admin ── */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 select-none mb-0.5">
                  Admin
                </span>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all"
                >
                  <Settings
                    size={15}
                    strokeWidth={1.8}
                    className="text-gray-400 shrink-0"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    Settings
                  </span>
                </Link>
              </div>

              {/* ── User row ── */}
              <button className="flex items-center gap-2.5 w-full rounded-xl hover:bg-gray-50 px-1 py-1.5 transition-all group">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-[#4B3FD4] flex items-center justify-center">
                  <Image
                    src="/user-avatar.jpg"
                    alt="John Doe"
                    width={36}
                    height={36}
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span className="text-xs font-semibold text-gray-800 leading-tight">
                    John Doe
                  </span>
                  <span className="text-[10px] text-gray-400 leading-tight truncate w-full text-left">
                    John.doe@domain.com
                  </span>
                </div>
                <ChevronDown
                  size={13}
                  className="text-gray-400 group-hover:text-gray-600 shrink-0"
                />
              </button>
            </div>
          ) : (
            /* ── Collapsed bottom ───────────────────────── */
            <div className="flex flex-col items-center gap-2">
              {/* Active view dots */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-1 py-1 cursor-default">
                    {VIEW_OPTIONS.map((v) => (
                      <button
                        key={v}
                        onClick={() => setActiveView(v)}
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all duration-150",
                          activeView === v
                            ? "bg-[#4B3FD4] scale-125"
                            : "bg-gray-300 hover:bg-gray-400",
                        )}
                      />
                    ))}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  View: {activeView}
                </TooltipContent>
              </Tooltip>

              {/* Settings */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
                  >
                    <Settings size={16} strokeWidth={1.8} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  Settings
                </TooltipContent>
              </Tooltip>

              {/* User avatar */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 hover:border-[#4B3FD4] transition-all bg-[#4B3FD4] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">JD</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  John Doe · John.doe@domain.com
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
