"use client";

import { useState } from "react";
import BotsTopbar from "../../../components/dashboard/bots/BotsTopbar";
import BotsTable from "../../../components/dashboard/bots/BotsTable";
import BotSummaryPanel from "../../../components/dashboard/bots/BotSummaryPanel";
import { MOCK_BOTS } from "../../../components/dashboard/bots/botsMockData";
import TopbarSlot from "@/components/dashboard/topbar/TopbarSlot";


export default function BotsPage() {
  const [query, setQuery] = useState("");
  const [selectedBot, setSelectedBot] = useState(null);
  const [maximized, setMaximized] = useState(false);


  const filtered = MOCK_BOTS.filter((b) => {
    const q = query.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.stage.toLowerCase().includes(q) ||
      b.activity.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    );
  });

  const handleRowClick = (bot) => {
    // Toggle off if same row clicked
    setSelectedBot((prev) => (prev?.id === bot.id ? null : bot));
  };

  const handleSave = (updatedBot) => {
    setSelectedBot(updatedBot);
    console.log("Saved bot:", updatedBot);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <TopbarSlot>
        <BotsTopbar onSearch={setQuery} />
      </TopbarSlot>

      <div className="flex flex-col md:flex-row gap-4 lg:gap-0 flex-1 min-h-0">
        {/* Table — shrinks when panel is open */}
        {!maximized && (
          <div
            className={
              selectedBot
                ? "flex-[0_0_60%] border-r border-gray-100 overflow-auto"
                : "flex-1 overflow-auto"
            }
          >
            <BotsTable
              bots={filtered}
              selectedId={selectedBot?.id}
              onRowClick={handleRowClick}
              onEdit={(bot) => {
                setSelectedBot(bot);
              }}
            />
          </div>
        )}

        {/* Summary / Edit panel — only shown when a row is selected */}
        {selectedBot && (
          <div className={maximized ? "flex-1 overflow-y-auto" : "flex-[0_0_40%] overflow-y-auto"}>
            <div className="border border-slate-200 rounded-md lg:ml-2 p-5">
              <BotSummaryPanel
                key={selectedBot.id} 
                bot={selectedBot}
                onClose={() => { setSelectedBot(null); setMaximized(false); }}
                onMaximize={() => setMaximized((v) => !v)}
                onSave={handleSave}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
