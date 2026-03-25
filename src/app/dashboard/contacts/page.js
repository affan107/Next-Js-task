"use client";

import { useState } from "react";
import { Search, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactsTable from "../../../components/dashboard/contacts/ContactsTable";
import ContactSummaryPanel from "../../../components/dashboard/contacts/ContactSummaryPanel";
import { MOCK_CONTACTS } from "../../../components/dashboard/contacts/contactsMockData";
import TopbarSlot from "@/components/dashboard/topbar/TopbarSlot";

function ContactsTopbar({ onSearch, onNewContact }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="flex flex-wrap w-full items-center gap-3 mr-2">
      <div className="w-100 h-10 border-[#EBEAFD] flex items-center gap-2 px-3 rounded-lg border bg-gray-50">
        <Search size={13} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          placeholder="Type a command or search..."
          onChange={handleChange}
          className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
        />
      </div>

      <Button
        onClick={onNewContact}
        className="h-10 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-medium rounded-md shrink-0"
      >
        New Contact
      </Button>
    </div>
  );
}

export default function ContactsPage() {
  const [query, setQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [maximized, setMaximized] = useState(false);

  const filtered = MOCK_CONTACTS.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.properties.toLowerCase().includes(q)
    );
  });

  const handleRowClick = (contact) => {
    setSelectedContact((prev) => (prev?.id === contact.id ? null : contact));
  };

  const handleSave = (updated) => {
    setSelectedContact(updated);
    console.log("Saved contact:", updated);
  };

  return (
    <>
    <TopbarSlot>
      <ContactsTopbar
        onSearch={setQuery}
        onNewContact={() => console.log("New contact")}
      />
      </TopbarSlot>

      <div className="flex flex-1 min-h-0">
        {!maximized && (
        <div
          className={
            selectedContact
              ? "flex-[0_0_45%] border-r border-gray-100 overflow-auto"
              : "flex-1 overflow-auto"
          }
        >
          <ContactsTable
            contacts={filtered}
            selectedId={selectedContact?.id}
            onRowClick={handleRowClick}
            compact={false}
          />
        </div>
        )}

        {selectedContact && (
          <div className={maximized ? "flex-1 overflow-y-auto" : "flex-[0_0_55%] overflow-y-auto"}>
            <div className="border border-slate-200 rounded-md ml-2 p-5">
              <ContactSummaryPanel
                key={selectedContact.id} 
                contact={selectedContact}
                onMaximize={() => setMaximized((v) => !v)}
                onClose={() => { setSelectedContact(null); setMaximized(false); }}         
                onSave={handleSave}
              />
            </div>
          </div>
        )}
      </div>
    
    </>
  );
}
