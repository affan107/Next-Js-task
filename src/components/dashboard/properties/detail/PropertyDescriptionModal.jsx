"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ChevronDown, PanelLeftOpen, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MOCK_AGENTS = [
  "John Mcmahon",
  "Barbara Darcean",
  "Ryan Steffani",
  "Sofia Vargas",
  "David Beckham",
  "Emma Stone",
];

export default function PropertyDescriptionModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    address: "",
    suburb: "",
    agent: "",
    description: "",
    image: null,
  });
  const [imageName, setImageName] = useState(null);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e?.target?.value ?? e }));

  const handleSave = () => {
    console.log("Saved:", form);
    setOpen(false);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      setForm((prev) => ({ ...prev, image: file }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-32 h-10 px-4 bg-[#4A24AB] text-white text-xs font-medium rounded-md shrink-0 gap-1 mr-1">
          <Plus size={13} strokeWidth={2.5} />
          New Property
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl p-0 gap-0 rounded-2xl overflow-hidden border-0">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-slate-700">
              Property Description
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="grid grid-cols-[90px_1fr] items-center gap-3">
            <span className="text-sm font-medium text-[#4A24AB]">Address</span>
            <Input
              value={form.address}
              onChange={set("address")}
              placeholder="Address Here"
              className="h-9 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB] placeholder:text-[#94A3B8]"
            />
          </div>

          {/* Suburb */}
          <div className="grid grid-cols-[90px_1fr] items-center gap-3">
            <span className="text-sm font-medium text-[#4A24AB]">Suburb</span>
            <Input
              value={form.suburb}
              onChange={set("suburb")}
              placeholder="Suburb Here"
              className="h-9 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB] placeholder:text-[#94A3B8]"
            />
          </div>
          <div className="grid grid-cols-[90px_1fr] items-center gap-3">
            <span className="text-sm font-medium text-[#4A24AB]">Agent</span>
            <Select value={form.agent} onValueChange={set("agent")}>
              <SelectTrigger className="w-full h-9 text-sm rounded-md border-[#CBD5E1] focus:ring-[#4A24AB] text-[#94A3B8]">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_AGENTS.map((a) => (
                  <SelectItem key={a} value={a} className="text-sm">
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-[#4A24AB]">
              Description
            </span>
            <Textarea
              value={form.description}
              onChange={set("description")}
              placeholder="Description Here"
              rows={4}
              className="w-85 h-18 text-sm rounded-md border-[#CBD5E1] focus-visible:ring-[#4A24AB] placeholder:text-[#94A3B8]"
            />
          </div>

          {/* Upload Property Image */}
          <div className="flex items-center gap-2">
            <label className="flex items-center justify-center gap-2 w-50 h-10 py-3.5  rounded-md bg-[#4A24AB]">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
              <Upload
                size={15}
                className="text-white shrink-0"
                strokeWidth={2}
              />
              <span className="text-sm font-semibold text-white">
                {imageName ?? "Upload Property Image"}
              </span>
            </label>
            <Button
              onClick={handleSave}
              size="sm"
              className="h-10 w-16 bg-[#4A24AB] text-white text-sm font-medium rounded-md"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
