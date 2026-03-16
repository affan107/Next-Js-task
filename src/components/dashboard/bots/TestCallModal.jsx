"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_OPTIONS, TYPE_OPTIONS } from "./botsMockData";

/**
 * TestCallModal
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onStartCall?: (data) => void
 *  - botName?: string
 */
export default function TestCallModal({ open, onClose, onStartCall, botName }) {
  const [property, setProperty] = useState("35 Jones St");
  const [type, setType] = useState("Test");

  if (!open) return null;

  const handleStart = () => {
    onStartCall?.({ property, type, botName });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[4px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[460px] p-8 flex flex-col gap-5">
        <h2 className="text-sm font-bold text-[#4A24AB]">Test Call</h2>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#4A24AB]">Property</span>
          <Select value={property} onValueChange={setProperty}>
            <SelectTrigger className="h-10 text-sm rounded-md border-[#CBD5E1]">
              <SelectValue placeholder="Select Property" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_OPTIONS.map((p) => (
                <SelectItem key={p} value={p} className="text-sm">
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[#4A24AB]">Type</span>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-10 text-sm rounded-md border-[#CBD5E1]">
              <SelectValue placeholder="Test" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Test" className="text-sm">
                Test
              </SelectItem>
              <SelectItem value="Inbound" className="text-sm">
                Inbound
              </SelectItem>
              <SelectItem value="Outbound" className="text-sm">
                Outbound
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleStart}
          className="h-11 w-full bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-semibold rounded-lg gap-2 mt-1"
        >
          <Phone size={15} strokeWidth={2} />
          Start Call
        </Button>
      </div>
    </div>
  );
}
