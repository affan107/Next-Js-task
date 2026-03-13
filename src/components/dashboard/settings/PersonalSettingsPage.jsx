"use client";

import { useState, useRef } from "react";
import { Shield, Upload, Eye, EyeOff, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// ── Password Required Modal ───────────────────────────────────────────────────
function PasswordRequiredModal({ open, onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[380px] p-8 flex flex-col gap-5">
        <div className="text-center">
          <h2 className="text-base font-bold text-slate-800">
            Password Required
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your password below. To save changes
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#4A24AB]">Password</label>
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-10 text-sm pr-10 rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {show ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        <Button
          onClick={() => {
            onConfirm?.(password);
            setPassword("");
            onClose();
          }}
          disabled={!password}
          className="h-10 w-full bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md disabled:opacity-40"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// ── Reusable pieces ───────────────────────────────────────────────────────────
function Section({ title, subtitle, children }) {
  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-slate-100">
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

function FieldLabel({ children }) {
  return (
    <label className="text-xs font-medium text-[#4A24AB]">{children}</label>
  );
}

function PasswordInput({ value, onChange, placeholder, hint }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-10 text-sm pr-10 rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      {hint && <p className="text-[10px] text-slate-400">{hint}</p>}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PersonalSettingsPage() {
  const fileRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [name, setName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [repeatPhone, setRepeatPhone] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");
  const [pwdModalOpen, setPwdModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const requirePassword = (action) => {
    setPendingAction(() => action);
    setPwdModalOpen(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarSrc(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Topbar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 shrink-0">
          <span className="text-sm font-medium text-gray-700">
            User Settings
          </span>
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
          <div className="max-w-xl flex flex-col gap-6">
            {/* Profile Picture */}
            <Section
              title="Your Profile Picture"
              subtitle="Please choose a photo to upload as your profile picture."
            >
              <div
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-4 cursor-pointer w-fit"
              >
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#4A24AB] flex items-center justify-center overflow-hidden bg-purple-50 hover:bg-purple-100 transition-colors shrink-0">
                  {avatarSrc ? (
                    <img
                      src={avatarSrc}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <Upload
                      size={18}
                      className="text-[#4A24AB]"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#4A24AB]">
                    Upload a Profile Picture
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Choose a photo to upload as your profile picture.
                  </p>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </Section>

            {/* Your Name */}
            <Section
              title="Your Name"
              subtitle="Update your name to be displayed on your profile."
            >
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Your name</FieldLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="h-10 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
                />
              </div>
              <Button
                onClick={() =>
                  requirePassword(() => console.log("Update name:", name))
                }
                className="h-9 w-fit px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md"
              >
                Update Profile
              </Button>
            </Section>

            {/* Phone Number */}
            <Section
              title="Your Update your Phone Number"
              subtitle="Update your Phone Number to keep your account secure."
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>Your new phone number</FieldLabel>
                  <Input
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Your new phone number"
                    className="h-10 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>Repeat phone number</FieldLabel>
                  <Input
                    value={repeatPhone}
                    onChange={(e) => setRepeatPhone(e.target.value)}
                    placeholder="Repeat phone number"
                    className="h-10 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB]"
                  />
                </div>
              </div>
              <Button
                onClick={() =>
                  requirePassword(() => console.log("Update phone:", newPhone))
                }
                className="h-9 w-fit px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md"
              >
                Update Phone Number
              </Button>
            </Section>

            {/* Password */}
            <Section
              title="Your Update your Password"
              subtitle="Update your password to keep your account secure."
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>Your new password</FieldLabel>
                  <PasswordInput
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="Your new password"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>Repeat password</FieldLabel>
                  <PasswordInput
                    value={repeatPwd}
                    onChange={(e) => setRepeatPwd(e.target.value)}
                    placeholder="Repeat password"
                    hint="Please repeat your new password to confirm it"
                  />
                </div>
              </div>
              <Button
                onClick={() =>
                  requirePassword(() => console.log("Update password"))
                }
                className="h-9 w-fit px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md"
              >
                Update Password
              </Button>
            </Section>

            {/* MFA */}
            <Section
              title="Multi-Factor Authentication"
              subtitle="Set up Multi-Factor Authentication method to further secure your account."
            >
              <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 bg-slate-50">
                <Shield
                  size={18}
                  className="text-[#4A24AB] shrink-0 mt-0.5"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Secure your account with Multi-Factor Authentication
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Set up Multi-Factor Authentication method to further secure
                    your account
                  </p>
                </div>
              </div>
              <Button
                onClick={() => console.log("Setup MFA")}
                className="h-9 w-fit px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md"
              >
                Setup a new Factor
              </Button>
            </Section>

            {/* Danger Zone */}
            <div className="rounded-lg border border-red-200 bg-red-50 p-5 flex flex-col gap-3">
              <div>
                <p className="text-sm font-bold text-red-600">
                  Danger Zone – These actions cannot be undone, please be
                  careful!
                </p>
                <p className="text-xs text-red-500 mt-0.5">
                  Some actions cannot be undone. Please be careful.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600 mb-1">
                  Delete Account
                </p>
                <p className="text-xs text-slate-500 mb-3">
                  This will delete your account and the accounts you own.
                  Furthermore, we will immediately cancel any active
                  subscriptions. This action cannot be undone.
                </p>
                <Button
                  onClick={() =>
                    requirePassword(() => console.log("Delete account"))
                  }
                  className="h-9 px-5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md"
                >
                  Delete your Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password confirm modal */}
      <PasswordRequiredModal
        open={pwdModalOpen}
        onClose={() => setPwdModalOpen(false)}
        onConfirm={(pwd) => {
          console.log("Confirmed with password:", pwd);
          pendingAction?.();
          setPendingAction(null);
        }}
      />
    </>
  );
}
