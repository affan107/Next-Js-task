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
  UserCircle,
  Users,
  UserCog,
  CreditCard,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

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

function NavItem({ icon: Icon, label, href, expanded, isActive }) {
  const inner = (
    <Link
      href={href}
      className={cn(
        "text-slate-800 flex items-center gap-3 rounded-lg transition-all duration-150 group/navitem",
        expanded ? "w-full px-3 py-2" : "w-9 h-9 justify-center mx-auto",
        isActive ? "bg-[#F4F3FF]" : "text-slate-800",
      )}
    >
      <Icon
        size={16}
        strokeWidth={isActive ? 2.2 : 1.8}
        className="shrink-0 text-[#4A24AB]"
      />
      {expanded && (
        <span
          className={cn(
            "text-sm leading-none whitespace-nowrap",
            isActive
              ? "font-semibold text-[#4A24AB]"
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

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [activeView, setActiveView] = useState("Sales");
  const [teamMode, setTeamMode] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "relative flex flex-col h-screen max-w-xs pt-5 pb-5 gap-2.5 border-r border-gray-100 bg-slate-200 shrink-0 z-20 overflow-hidden",
          "transition-[width] duration-300 ease-in-out",
          expanded ? "w-64" : "w-20",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-3 pt-4 pb-2",
            !expanded && "flex-col gap-2 items-center",
          )}
        >
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
                className="flex items-center justify-center w-7 h-7 rounded-md text-slate-800  transition-all duration-150 shrink-0"
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

        <div
          className={cn("px-2 mb-2", !expanded && "px-2 flex justify-center")}
        >
          {expanded ? (
            <button className="flex items-center gap-2 w-full rounded-xl hover:bg-slate-300 px-2 py-1.5 transition-all group">
              <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border  flex items-center justify-center">
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
                <span className="text-[10px] text-slate-500 leading-tight">
                  Team name
                </span>
              </div>
              <ChevronDown size={13} className="text-slate-500 shrink-0" />
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

        <nav className="flex flex-col px-2 py-1 space-y-1 overflow-y-auto overflow-x-hidden">
          {navSections.map((section, si) => (
            <div key={section.label}>
              <p
                className={cn(
                  "uppercase text-slate-500 select-none",
                  expanded
                    ? "text-[10px] font-semibold tracking-widest px-2 pt-3 pb-1"
                    : "text-[9px] font-medium text-center py-2 tracking-wide",
                )}
              >
                {section.label}
              </p>

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

          <div className="mt-10 pt-3 pb-4 px-3">
            {expanded ? (
              <div className="flex flex-col gap-3">
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
                            ? "bg-[#4A24AB] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700",
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-800 text-xs font-medium">
                    Agent
                  </span>
                  <button
                    onClick={() => setTeamMode((v) => !v)}
                    className="relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 bg-slate-300"
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200",
                        teamMode ? "left-5.5" : "left-0.5",
                      )}
                    />
                  </button>
                  <span className="text-slate-800 text-xs font-medium">
                    Team
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 select-none mb-0.5">
                    Admin
                  </span>
                  {[
                    {
                      href: "/dashboard/settings/personal",
                      icon: UserCircle,
                      label: "Personal Settings",
                    },
                    {
                      href: "/dashboard/settings/team",
                      icon: Users,
                      label: "Team Settings",
                    },
                    {
                      href: "/dashboard/settings/members",
                      icon: UserCog,
                      label: "Members",
                    },
                    {
                      href: "/dashboard/settings/billing",
                      icon: CreditCard,
                      label: "Billing",
                    },
                    {
                      href: "/dashboard/settings",
                      icon: Settings,
                      label: "Settings",
                    },
                  ].map(({ href, icon: Icon, label }) => {
                    const isActive =
                      pathname === href || pathname.startsWith(href + "/");
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={cn(
                          "flex items-center gap-2.5 px-2 py-2 rounded-lg transition-all",
                          isActive
                            ? "bg-[#EEEDF9] text-[#4B3FD4]"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800",
                        )}
                      >
                        <Icon
                          size={15}
                          strokeWidth={1.8}
                          className={
                            isActive ? "text-[#4B3FD4]" : "text-[#4A24AB]"
                          }
                        />
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isActive
                              ? "text-[#4B3FD4] font-semibold"
                              : "text-gray-600",
                          )}
                        >
                          {label}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <button className="flex items-center gap-2.5 w-full rounded-xl hover:bg-gray-50 px-1 py-1.5 transition-all group">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-[#4A24AB] flex items-center justify-center">
                    <Image
                      src="/johnDoe.png"
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
              <div className="flex flex-col items-center gap-2">
                <p className="uppercase text-[9px] font-medium text-center tracking-wide text-slate-500">
                  View
                </p>
                <div className="w-20 h-28.5 flex flex-col items-center p-1 gap-2">
                  {VIEW_OPTIONS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveView(v)}
                      className={cn(
                        "w-14 h-7 text-xs font-medium py-1 rounded-sm transition-all duration-150",
                        activeView === v
                          ? "bg-[#4A24AB] text-white shadow-sm"
                          : "bg-brand-50 text-slate-700",
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center w-9 h-9 rounded-lg text-[#4A24AB]">
                  <Settings size={16} strokeWidth={1.8} />
                </div>

                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#4A24AB] flex items-center justify-center">
                  <Image
                    src="/johnDoe.png"
                    alt="John Doe"
                    width={36}
                    height={36}
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
