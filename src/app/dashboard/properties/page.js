"use client";

import { useState } from "react";
import PropertiesTopbar from "../../../components/dashboard/properties/PropertiesTopbar";
import PropertiesTable, {
  MOCK_PROPERTIES,
} from "../../../components/dashboard/properties/PropertiesTable";

export default function PropertiesPage() {
  const [query, setQuery] = useState("");

  const filtered = MOCK_PROPERTIES.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.address.toLowerCase().includes(q) ||
      p.suburb.toLowerCase().includes(q) ||
      p.agent.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <PropertiesTopbar
        onSearch={setQuery}
        onNewProperty={() => console.log("new property")}
      />
      <PropertiesTable properties={filtered} />
    </div>
  );
}
