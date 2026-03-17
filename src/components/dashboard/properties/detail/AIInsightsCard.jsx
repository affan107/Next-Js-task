import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";


function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 group w-fit"
      >
        <span className="text-xl font-semibold text-slate-800">{title}</span>
        {open ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
      </button>
      {open && children}
    </div>
  );
}

export default function AIInsightsCard({ insights }) {
  const data = insights ?? {
    qualifiedBuyers: 15,
    attendingEvent: 30,
    topBuyers: 5,
    voicemailRate: "10%",
    avgCallDuration: "1:30 mins",
    summary1: "3 batch calls have been placed.",
    summary2: "The most recent batch call found 3 new qualified buyers.",
  };

  const stats = [
    { label: "Qualified Buyers", value: data.qualifiedBuyers },
    { label: "Attending Event", value: data.attendingEvent },
    { label: "Top Buyers", value: data.topBuyers },
    { label: "Voicemail Rate", value: data.voicemailRate },
    { label: "Average Call Durable", value: data.avgCallDuration },
  ];

  return (
    <div className="rounded-lg border border-[#6B3FE8] bg-[#F4F3FF] p-4 flex flex-col gap-3">
     
      <CollapsibleSection title="AI Insights">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex  gap-10">
            <span className="text-sm font-medium text-slate-900">{label}</span>
            <span className="text-sm font-normal text-slate-800">
              {value}
            </span>
          </div>
        ))}
        <p className="text-xs text-slate-900 leading-relaxed">
          {data.summary1} <br />
          {data.summary2}
        </p>
      </CollapsibleSection>
    </div>
  );
}
