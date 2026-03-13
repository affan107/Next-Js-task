"use client";

import { useState, useRef } from "react";
import { Search, Upload, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ROLE_STYLES = {
  Owner: "bg-slate-700 text-white",
  "Primary Owner": "bg-[#F59E0B] text-white",
  Member: "bg-[#4A24AB] text-white",
};

function RoleBadge({ role }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap",
        ROLE_STYLES[role] ?? "bg-gray-100 text-gray-600",
      )}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const style =
    status === "Active"
      ? "bg-[#C8FFDC] text-[#15813D] border-[#C8FFDC]"
      : "bg-gray-100 text-gray-500 border-gray-200";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold border whitespace-nowrap",
        style,
      )}
    >
      {status}
    </span>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-[#4A24AB]">{title}</h3>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-slate-100 my-2" />;
}

const MOCK_MEMBERS = [
  {
    id: 1,
    initials: "CN",
    name: "test",
    label: "You",
    email: "test@makerkit.dev",
    roles: ["Owner", "Primary Owner"],
  },
  {
    id: 2,
    initials: "M",
    name: "member",
    label: null,
    email: "member@makerkit.dev",
    roles: ["Member"],
  },
];

const MOCK_INVITES = [
  {
    id: 1,
    initials: "CN",
    email: "invited@makerkit.dev",
    role: "Member",
    invitedAt: "1/25/2025",
    expiresAt: "1/10/2025",
    status: "Active",
  },
];

export default function TeamSettingsPage() {
  const [teamName, setTeamName] = useState("");
  const [phone, setPhone] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [inviteSearch, setInviteSearch] = useState("");
  const fileRef = useRef(null);

  const filteredMembers = MOCK_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Topbar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 shrink-0">
        <span className="text-sm font-medium text-gray-700">Team Settings</span>
        <div className="ml-auto w-72 h-9 flex items-center gap-2 px-3 rounded-lg border border-slate-200 bg-gray-50">
          <Search size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search..."
            className="bg-transparent text-sm placeholder:text-gray-400 outline-none w-full"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-xl flex flex-col gap-8">
          {/* Team Logo */}
          <Section
            title="Team Logo"
            subtitle="Update your team's logo to make it easier to identify."
          >
            <div className="flex items-center gap-4">
              <div
                onClick={() => fileRef.current?.click()}
                className="w-16 h-16 rounded-full border-2 border-dashed border-[#4A24AB] flex items-center justify-center cursor-pointer hover:bg-purple-50 transition-colors shrink-0"
              >
                <Upload
                  size={18}
                  className="text-[#4A24AB]"
                  strokeWidth={1.5}
                />
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#4A24AB]">
                  Upload a Team&apos;s Profile
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose a photo to upload as your team profile picture.
                </p>
              </div>
            </div>
          </Section>

          <Divider />

          {/* Team Name */}
          <Section title="Team Name" subtitle="Update your team's name.">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#4A24AB]">
                Team name
              </label>
              <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team Name"
                className="h-10 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
              />
            </div>
            <Button
              onClick={() => console.log("Update team:", teamName)}
              className="h-9 w-fit px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md mt-1"
            >
              Update team
            </Button>
          </Section>

          <Divider />

          {/* Outbound Phone */}
          <Section
            title="Team Outbound Phone Number"
            subtitle="Update your Team Outbound Phone Number."
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#4A24AB]">
                Team Outbound Phone Number
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+011234567890"
                className="h-10 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
              />
            </div>
            <Button
              onClick={() => console.log("Update phone:", phone)}
              className="h-9 w-fit px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md mt-1"
            >
              Update Outbound Phone Number
            </Button>
          </Section>

          <Divider />

          {/* Team Members */}
          <Section
            title="Team Members"
            subtitle="Here you can manage the members of your team."
          >
            <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 h-9 bg-gray-50">
              <Search size={13} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search Member"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="bg-transparent text-sm placeholder:text-gray-400 outline-none w-full"
              />
            </div>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="min-w-full text-xs border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-100">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500">
                      Name
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500">
                      Email
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#EDE9FE] text-[#4A24AB] flex items-center justify-center text-[10px] font-bold shrink-0">
                            {m.initials}
                          </div>
                          <span className="text-xs font-medium text-slate-800">
                            {m.name}
                          </span>
                          {m.label && (
                            <span className="text-[10px] text-slate-400 italic">
                              {m.label}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {m.email}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {m.roles.map((r) => (
                            <RoleBadge key={r} role={r} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Divider />

          {/* Pending Invites */}
          <Section
            title="Pending Invites"
            subtitle="Here you can manage the pending invitations to your team."
          >
            <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 h-9 bg-gray-50">
              <Search size={13} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search Invitees"
                value={inviteSearch}
                onChange={(e) => setInviteSearch(e.target.value)}
                className="bg-transparent text-sm placeholder:text-gray-400 outline-none w-full"
              />
            </div>
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="min-w-full text-xs border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-100">
                    {[
                      "Email",
                      "Role",
                      "Invited at",
                      "Expires at",
                      "Status",
                      "",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_INVITES.filter((inv) =>
                    inv.email
                      .toLowerCase()
                      .includes(inviteSearch.toLowerCase()),
                  ).map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#EDE9FE] text-[#4A24AB] flex items-center justify-center text-[10px] font-bold shrink-0">
                            {inv.initials}
                          </div>
                          <span className="text-xs text-slate-600">
                            {inv.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <RoleBadge role={inv.role} />
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                        {inv.invitedAt}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                        {inv.expiresAt}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={inv.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-gray-400 hover:text-gray-700">
                          <MoreHorizontal size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Divider />

          {/* Danger Zone */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 flex flex-col gap-3">
            <div>
              <p className="text-sm font-bold text-red-600">
                Danger Zone – These actions cannot be undone, please be careful!
              </p>
              <p className="text-xs text-red-500 mt-0.5">
                This section contains actions that are irreversible.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-red-600 mb-1">
                Delete Team
              </p>
              <p className="text-xs text-slate-500 mb-3">
                This action cannot be undone. All data associated with this team
                will be deleted.
              </p>
              <Button
                onClick={() => console.log("Delete team")}
                className="h-9 px-5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md"
              >
                Delete Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
