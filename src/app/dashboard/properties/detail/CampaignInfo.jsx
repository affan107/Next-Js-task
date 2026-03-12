"use client";

import { useState } from "react";
import {  SquarePen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyStatusBadge from "../PropertyStatusBadge";
import { Button } from "@/components/ui/button";
import {
  EditCampaignModal,
  NewCampaignModal,
} from "./CampaignModal";

export default function CampaignInfo({ property, onCreateCampaign }) {
  const [campaign, setCampaign] = useState("Sale #1");
  const [showEdit, setShowEdit] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-700">
            Campaign Info
          </h3>
          <div className="flex items-center gap-1.5">
            <Button
              onClick={() => setShowNew(true)}
              size="sm"
              className="h-7 px-3 bg-white border-[#4A24AB] rounded gap-1"
            >
              <span className="text-[#4A24AB] text-sm font-medium ">
                Create New Campaign
              </span>
            </Button>
            <Button
              onClick={() => setShowEdit(true)}
              className="w-8 h-7 rounded-md bg-white border-slate-200 text-[#4A24AB]"
            >
              <SquarePen size={13} strokeWidth={1.8} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 items-center">
          <span className="text-sm text-[#4A24AB] font-medium">Campaign</span>
          <Select value={campaign} onValueChange={setCampaign}>
            <SelectTrigger className="h-8 w-45 text-sm font-normal border-[#CBD5E1] rounded">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sale #1" className="text-sm">
                Sale #1
              </SelectItem>
              <SelectItem value="Sale #2" className="text-sm">
                Sale #2
              </SelectItem>
              <SelectItem value="Rental #1" className="text-sm">
                Rental #1
              </SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-[#4A24AB] font-medium">Status</span>
          <PropertyStatusBadge
            className={"w-36 h-6"}
            status={property?.status ?? "Live"}
          />
          <span className="text-sm text-[#4A24AB] font-medium">Link</span>
          <a
            href={property?.link ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-normal text-sm text-slate-800 underline underline-offset-2"
          >
            URL
          </a>
          <span className="text-sm text-[#4A24AB] font-medium">
            Price guide
          </span>
          <span className="text-sm text-slate-800 font-normal">
            {property?.priceGuide ?? "AUD 1,000,000 – 2,000,000"}
          </span>
        </div>
      </div>

      {/* Modals */}
      <EditCampaignModal
        open={showEdit}
        onClose={() => setShowEdit(false)}
        onSchedule={(data) => {
          console.log("Update campaign:", data);
        }}
      />

      <NewCampaignModal
        open={showNew}
        onClose={() => setShowNew(false)}
        onSchedule={(data) => {
          console.log("New campaign:", data);
        }}
      />
    </>
  );
}
