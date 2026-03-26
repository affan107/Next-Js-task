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
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  UserCircle,
  Users,
  UserCog,
  CreditCard,
  Menu,
  X,
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

const SETTINGS_SUB_NAV = [
  { href: "/dashboard/settings/personal", icon: UserCircle, label: "User Settings" },
  { href: "/dashboard/settings/team", icon: Users, label: "Team Settings" },
  { href: "/dashboard/settings/members", icon: UserCog, label: "Members" },
  { href: "/dashboard/settings/billing", icon: CreditCard, label: "Billing" },
];

const VIEW_OPTIONS = ["Sales", "Rentals", "All"];

function isNavActive(href, pathname) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavItem({ icon: Icon, label, href, expanded, isActive, onClick }) {
  const inner = (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg transition-all duration-150",
        expanded ? "w-full px-3 py-2" : "w-9 h-9 justify-center mx-auto",
        isActive ? "bg-[#F4F3FF]" : "hover:bg-slate-100",
      )}
    >
      <Icon
        size={16}
        strokeWidth={isActive ? 2.2 : 1.8}
        className="shrink-0 text-[#4A24AB]"
      />
      {expanded && (
        <span className={cn(
          "text-sm leading-none whitespace-nowrap",
          isActive ? "font-semibold text-[#4A24AB]" : "font-medium text-gray-600",
        )}>
          {label}
        </span>
      )}
    </Link>
  );

  if (!expanded) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{inner}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs">{label}</TooltipContent>
      </Tooltip>
    );
  }
  return inner;
}

function SidebarBody({ expanded, setExpanded, onNavClick }) {
  const pathname = usePathname();
  const [activeView, setActiveView] = useState("Sales");
  const [teamMode, setTeamMode] = useState(false);
  const isOnSettingsRoute = pathname.startsWith("/dashboard/settings");
  const [settingsOpen, setSettingsOpen] = useState(isOnSettingsRoute);
  const settingsActive = isOnSettingsRoute;

  return (
    <>
      {/* Logo + collapse toggle */}
      <div className={cn(
        "flex items-center justify-between px-3 pt-4 pb-2",
        !expanded && "flex-col gap-2 items-center",
      )}>
        <Link href="/dashboard" onClick={onNavClick} className="flex items-center gap-0.5 select-none shrink-0">
          {expanded ? (
            <>
              <span className="text-xl font-bold bg-linear-to-r from-[#240EB3] to-[#24A5ED] bg-clip-text text-transparent leading-none">vox</span>
              <span className="text-xl font-normal text-[#9B9B9B] leading-none">works</span>
            </>
          ) : (
            <div className="flex items-center justify-center mb-6 px-2">
              <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain" />
            </div>
          )}
        </Link>

        {/* Hide the collapse toggle inside the mobile drawer — close button handles it */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="hidden md:flex items-center justify-center w-7 h-7 rounded-md text-slate-800 transition-all duration-150 shrink-0"
            >
              {expanded ? <PanelLeftClose size={15} strokeWidth={1.8} /> : <PanelLeftOpen size={15} strokeWidth={1.8} />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">{expanded ? "Collapse" : "Expand"}</TooltipContent>
        </Tooltip>
      </div>

      {/* ── Team picker ── */}
      <div className={cn("px-2 mb-2", !expanded && "px-2 flex justify-center")}>
        {expanded ? (
          <button className="flex items-center gap-2 w-full rounded-xl hover:bg-slate-300 px-2 py-1.5 transition-all group">
            <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border flex items-center justify-center">
              <Image src="/team.jpg" alt="Team" width={36} height={36} className="object-contained" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </div>
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-xs font-semibold text-gray-800 leading-tight">Team</span>
              <span className="text-[10px] text-slate-500 leading-tight">Team name</span>
            </div>
            <ChevronDown size={13} className="text-slate-500 shrink-0" />
          </button>
        ) : (
          <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
            <Image src="/team.jpg" alt="Team" width={36} height={36} className="object-contained" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex flex-col px-2 py-1 space-y-1 overflow-y-auto overflow-x-hidden">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className={cn(
              "uppercase text-slate-500 select-none",
              expanded ? "text-[10px] font-semibold tracking-widest px-2 pt-3 pb-1" : "text-[9px] font-medium text-center py-2 tracking-wide",
            )}>
              {section.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map(({ icon, label, href }) => (
                <NavItem
                  key={href}
                  icon={icon}
                  label={label}
                  href={href}
                  expanded={expanded}
                  isActive={isNavActive(href, pathname)}
                  onClick={onNavClick}
                />
              ))}
            </div>
          </div>
        ))}

        {/* ── Bottom section ── */}
        <div className="mt-10 pt-3 pb-4 px-3">
          {expanded ? (
            <div className="flex flex-col gap-3">

              {/* View pill */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 select-none">View</span>
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
                  {VIEW_OPTIONS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setActiveView(v)}
                      className={cn(
                        "flex-1 text-xs font-medium py-1.5 rounded-md transition-all duration-150",
                        activeView === v ? "bg-[#4A24AB] text-white shadow-sm" : "text-gray-500 hover:text-gray-700",
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Agent / Team toggle */}
              <div className="flex items-center gap-2">
                <span className="text-slate-800 text-xs font-medium">Agent</span>
                <button
                  onClick={() => setTeamMode((v) => !v)}
                  className={cn(
                    "relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0",
                    teamMode ? "bg-green-500" : "bg-slate-300",
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200",
                    teamMode ? "left-5.5" : "left-0.5",
                  )} />
                </button>
                <span className="text-slate-800 text-xs font-medium">Team</span>
              </div>

              {/* Admin / Settings */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 select-none mb-0.5">Admin</span>

                <button
                  onClick={() => setSettingsOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-2.5 px-2 py-2 rounded-lg transition-all w-full text-left",
                    settingsActive ? "bg-[#EEEDF9] text-[#4B3FD4]" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800",
                  )}
                >
                  <Settings
                    size={15}
                    strokeWidth={1.8}
                    className={settingsActive ? "text-[#4B3FD4]" : "text-[#4A24AB]"}
                  />
                  <span className={cn(
                    "text-sm font-medium flex-1",
                    settingsActive ? "text-[#4B3FD4] font-semibold" : "text-gray-600",
                  )}>
                    Settings
                  </span>
                  <ChevronRight
                    size={13}
                    strokeWidth={2}
                    className={cn(
                      "text-gray-400 transition-transform duration-200 shrink-0",
                      settingsOpen && "rotate-90",
                    )}
                  />
                </button>

                {settingsOpen && (
                  <div className="flex flex-col gap-0.5 mt-0.5 pl-3 border-l-2 border-[#EEEDF9] ml-4">
                    {SETTINGS_SUB_NAV.map(({ href, icon: Icon, label }) => {
                      const active = pathname === href || pathname.startsWith(href + "/");
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={onNavClick}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all text-left",
                            active ? "bg-[#EEEDF9] text-[#4B3FD4]" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800",
                          )}
                        >
                          <Icon size={13} strokeWidth={1.8} className={active ? "text-[#4B3FD4]" : "text-[#4A24AB]"} />
                          <span className={cn(
                            "text-xs font-medium whitespace-nowrap",
                            active ? "text-[#4B3FD4] font-semibold" : "text-gray-600",
                          )}>
                            {label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* User row */}
              <button className="flex items-center gap-2.5 w-full rounded-xl hover:bg-gray-50 px-1 py-1.5 transition-all group">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-[#4A24AB] flex items-center justify-center">
                  <Image src="/johnDoe.png" alt="John Doe" width={36} height={36} className="object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span className="text-xs font-semibold text-gray-800 leading-tight">John Doe</span>
                  <span className="text-[10px] text-gray-400 leading-tight truncate w-full text-left">John.doe@domain.com</span>
                </div>
                <ChevronDown size={13} className="text-gray-400 group-hover:text-gray-600 shrink-0" />
              </button>

            </div>
          ) : (
            /* ── Collapsed bottom ── */
            <div className="flex flex-col items-center gap-2">
              <p className="uppercase text-[9px] font-medium text-center tracking-wide text-slate-500">View</p>
              <div className="flex flex-col items-center p-1 gap-2">
                {VIEW_OPTIONS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveView(v)}
                    className={cn(
                      "w-14 h-7 text-xs font-medium py-1 rounded-sm transition-all duration-150",
                      activeView === v ? "bg-[#4A24AB] text-white shadow-sm" : "bg-slate-100 text-slate-700",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSettingsOpen((v) => !v)}
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
                      settingsActive ? "bg-[#EEEDF9]" : "hover:bg-gray-100",
                    )}
                  >
                    <Settings
                      size={15}
                      strokeWidth={1.8}
                      className={settingsActive ? "text-[#4B3FD4]" : "text-[#4A24AB]"}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs p-0 overflow-hidden rounded-lg shadow-lg border border-slate-100 bg-[#FAFAFA]">
                  <div className="flex flex-col py-1 min-w-40">
                    {SETTINGS_SUB_NAV.map(({ href, icon: Icon, label }) => {
                      const active = pathname === href || pathname.startsWith(href + "/");
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={onNavClick}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2 transition-colors",
                            active ? "bg-[#EEEDF9] text-[#4B3FD4]" : "text-gray-600 hover:bg-slate-50",
                          )}
                        >
                          <Icon size={13} strokeWidth={1.8} className={active ? "text-[#4B3FD4]" : "text-[#4A24AB]"} />
                          <span className={cn("text-xs font-medium", active && "font-semibold")}>{label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </TooltipContent>
              </Tooltip>

              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#4A24AB] flex items-center justify-center">
                <Image src="/johnDoe.png" alt="John Doe" width={36} height={36} className="object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>

      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="md:hidden fixed top-1 right-4 z-40 flex items-center justify-center w-8 h-8 rounded-md text-[#4A24AB]"
      >
        <Menu size={20} strokeWidth={1.8} />
      </button>

      {/* Desktop sidebar */}
      <aside className={cn(
        "relative flex-col h-screen max-w-xs pt-5 pb-5 gap-2.5 border-r border-slate-200 bg-[#FAFAFA] shrink-0 z-20 overflow-hidden",
        "hidden md:flex",
        "transition-[width] duration-300 ease-in-out",
        expanded ? "w-64" : "w-20",
      )}>
        <SidebarBody expanded={expanded} setExpanded={setExpanded} onNavClick={undefined} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={cn(
        "md:hidden fixed top-0 right-0 z-50 h-full w-72 bg-[#FAFAFA] border-l border-slate-200 flex flex-col pt-5 pb-5 gap-2.5 overflow-hidden",
        "transition-transform duration-300 ease-in-out",
        mobileOpen ? "translate-x-0" : "translate-x-full",
      )}>
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
          className="absolute top-4 right-3 flex items-center justify-center w-7 h-7 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <X size={16} strokeWidth={1.8} />
        </button>

        <SidebarBody
          expanded={true}
          setExpanded={() => { }}   
          onNavClick={() => setMobileOpen(false)} 
        />
      </div>

    </TooltipProvider>
  );
}