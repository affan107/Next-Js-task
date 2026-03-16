"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import PropertiesTopbar from "../../../../components/dashboard/properties/PropertiesTopbar";
import PropertiesTable, {
  MOCK_PROPERTIES,
} from "../../../../components/dashboard/properties/PropertiesTable";
import PropertyDescription from "../../../../components/dashboard/properties/detail/PropertyDescription";
import CampaignInfo from "../../../../components/dashboard/properties/detail/CampaignInfo";
import KeyDates from "../../../../components/dashboard/properties/detail/KeyDates";
import AIInsightsCard from "../../../../components/dashboard/properties/detail/AIInsightsCard";
import { CallsTable } from "../../../../components/dashboard/properties/detail/CallsTable.jsx";
import { BatchesTable } from "../../../../components/dashboard/properties/detail/BatchesTable.jsx";
import { Separator } from "@/components/ui/separator";
import PropertyDescriptionForm from "../../../../components/dashboard/properties/detail/PropertyDescriptionForm";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState(Number(id) || 1);
  const [editingDescription, setEditingDescription] = useState(false);

  const property =
    MOCK_PROPERTIES.find((p) => p.id === selectedId) ?? MOCK_PROPERTIES[0];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
      <PropertiesTopbar onNewProperty={() => console.log("new property")} />
      <div className="flex flex-1 min-h-0 gap-6 px-6">
        {/* Left panel - 30% */}
        <div className="flex-[0_0_30%] border-r border-gray-100 flex flex-col overflow-x-auto">
          <PropertiesTable
            properties={MOCK_PROPERTIES}
            selectedId={selectedId}
            onRowClick={(p) => {
              setSelectedId(p.id);
              setEditingDescription(false);
            }}
          />
        </div>

        {/* Right panel - 70% */}
        <div className="flex-[0_0_70%] overflow-y-auto">
          <div className="border border-slate-300 rounded-md p-6 flex flex-col gap-6">
            {editingDescription ? (
              <PropertyDescriptionForm
                property={property}
                onSave={(data) => {
                  console.log("Save:", data);
                  setEditingDescription(false);
                }}
                onCancel={() => setEditingDescription(false)}
              />
            ) : (
              <PropertyDescription
                property={property}
                onEdit={() => setEditingDescription(true)}
              />
            )}
            <Separator />
            <CampaignInfo property={property} />
            <Separator />
            <KeyDates />
            <Separator />
            <AIInsightsCard />
            <BatchesTable />
            <CallsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
