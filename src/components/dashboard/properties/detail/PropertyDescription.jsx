"use client";

import { SquarePen, ChevronDown, PanelLeftOpen, Maximize2, Minimize2 } from "lucide-react";

export default function PropertyDescription({ property, onEdit, onMaximize, maximized, onClose }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onMaximize}
            title={maximized ? "Restore" : "Maximize"}
            
          >
            {maximized
              ? <Minimize2 size={14} strokeWidth={1.8} />
              : <Maximize2 size={14} strokeWidth={1.8} />
            }
          </button>
          <button title="Close panel"  onClick={onClose}>
            <PanelLeftOpen size={15} strokeWidth={1.8} />
          </button>
         
          <span className="text-xl font-semibold text-slate-700">
            Property Description
          </span>
          <ChevronDown size={15} className="text-black" />
        </div>
        <button
          onClick={onEdit}
          className="flex items-center justify-center w-10 h-10 rounded-md text-[#4A24AB]"
        >
          <SquarePen size={15} strokeWidth={1.8} />
        </button>
      </div>

      <div>
        <p className="text-sm font-medium text-[#4A24AB] mb-1">Property Name</p>
        <h1 className="text-xl font-semibold text-slate-700">
          {property?.address ?? "35 Jones St"}, {property?.suburb ?? "Balmain"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-[#4A24AB]">Agent</p>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-sm  text-slate-800 border border-slate-300 rounded-full">
            {property?.agent ?? "John Mcmahon"}
          </span>

          <span className="px-3 py-1 text-sm  text-slate-800 border border-slate-300 rounded-full">
            {property?.coAgent ?? "Emily Rose"}
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm font-medium text-[#4A24AB] mb-0.5">Description</p>
        <p className="text-sm font-normal text-slate-900 ">
          {property?.description ??
            "A 4-and 5-bath mansion in the heart of balmain."}
        </p>
      </div>
    </div>
  );
}
