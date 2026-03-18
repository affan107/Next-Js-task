"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free_trial",
    name: "FREE TRIAL",
    tagline: "The perfect plan to get started",
    price: "A$0.00",
    billing: "Billed monthly",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    details: [{ label: "Base Plan (Billed monthly)", price: "A$0.00" }],
    summaryTitle: "Starter",
    summaryBilling: "Billed monthly",
    summaryTagline: "The perfect plan to get started",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "The perfect plan for professionals",
    price: "A$0.30",
    billing: "Billed monthly",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    details: [{ label: "Base Plan (Billed monthly)", price: "A$0.30" }],
    summaryTitle: "Professional",
    summaryBilling: "Billed monthly",
    summaryTagline: "The perfect plan for professionals",
  },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("free_trial");
  const active = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[0];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 border border-slate-100 shrink-0">
        <CreditCard size={14} className="text-[#6B3FE8]" strokeWidth={1.8} />
        <span className="text-sm font-medium text-slate-700">Billing</span>
        <div className="ml-auto w-72 h-9 flex items-center gap-2 px-3 rounded-lg border border-slate-200 bg-gray-50">
          <Search size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search..."
            className="bg-transparent text-sm placeholder:text-gray-400 outline-none w-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-2xl flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold text-[#4A24AB]">Manage your Team Plan</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose a plan that fits your team&apos;s needs. You can upgrade or downgrade your plan at any time.
            </p>
          </div>

          <div className="flex gap-8 mt-2">
            {/* Left: plan picker */}
            <div className="flex flex-col gap-2 w-64 shrink-0">
              <p className="text-xs font-semibold text-slate-700 mb-1">Pick your preferred plan</p>
              {PLANS.map((plan) => {
                const isActive = selectedPlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3 rounded-xl border transition-all text-left",
                      isActive
                        ? "border-[#4A24AB] bg-[#F4F3FF]"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                      isActive ? "border-[#4A24AB]" : "border-slate-300"
                    )}>
                      {isActive && <div className="w-2 h-2 rounded-full bg-[#4A24AB]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 leading-snug">{plan.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{plan.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-slate-900">
                        {plan.price}
                        <span className="text-[10px] font-normal text-slate-500 ml-0.5">Per minute</span>
                      </p>
                      <p className="text-[10px] text-slate-400">{plan.billing}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: plan detail */}
            <div className="flex-1 border-l border-slate-100 pl-8">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-sm font-bold text-[#4A24AB]">{active.summaryTitle}</span>
                <span className="text-xs text-slate-400">/</span>
                <span className="text-xs text-slate-500">{active.summaryBilling}</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">{active.summaryTagline}</p>

              <p className="text-xs font-bold text-slate-700 mb-2">Details</p>
              {active.details.map((d, i) => (
                <div key={i} className="flex items-center gap-2 mb-1">
                  <CreditCard size={12} className="text-slate-400 shrink-0" strokeWidth={1.5} />
                  <span className="text-xs text-slate-600">
                    {d.label} – <span className="font-semibold">{d.price}</span>
                  </span>
                </div>
              ))}

              <p className="text-xs font-bold text-slate-700 mt-4 mb-2">Features</p>
              <div className="flex flex-col gap-1.5">
                {active.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#15813D] shrink-0" strokeWidth={2} />
                    <span className="text-xs text-slate-700">{f}</span>
                  </div>
                ))}
              </div>

              {selectedPlan !== "free_trial" && (
                <button className="mt-5 h-9 px-5 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-md transition-colors">
                  Upgrade to {active.summaryTitle}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}