"use client";

import { useState } from "react";
import { Search, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactsTable from "../../../components/dashboard/contacts/ContactsTable";
import ContactSummaryPanel from "../../../components/dashboard/contacts/ContactSummaryPanel";
import { MOCK_CONTACTS } from "../../../components/dashboard/contacts/contactsMockData";

function ContactsTopbar({ onSearch, onNewContact }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="ml-auto mb-3 flex items-center gap-3 mr-2">
      {/* <div className="flex items-center gap-2 shrink-0">
        <AlignJustify size={14} className="text-gray-400" strokeWidth={1.8} />
        <span className="text-sm font-medium text-gray-700">Contacts</span>
      </div> */}

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

// ── Main page ─────────────────────────────────────────────────────────────────
/**
 * ContactsPage
 *
 * Row click → sets selectedContact → ContactSummaryPanel renders with that
 * contact's data. key={selectedContact.id} on the panel ensures form state
 * is always reset cleanly when switching rows.
 */
export default function ContactsPage() {
  const [query, setQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

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
    // TODO: PATCH to API
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <ContactsTopbar
        onSearch={setQuery}
        onNewContact={() => console.log("New contact")}
      />

      <div className="flex flex-1 min-h-0">
        {/* ── Table ── shrinks when panel open */}
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
            compact={!!selectedContact}
          />
        </div>

        {/* ── Summary Panel — only when a row is selected ── */}
        {selectedContact && (
          <div className="flex-[0_0_55%] overflow-y-auto">
            <div className="border border-slate-200 rounded-md m-4 p-5">
              <ContactSummaryPanel
                key={selectedContact.id} // ← clean remount on row change
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
                onSave={handleSave}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
