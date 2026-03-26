"use client";

import { useState } from "react";
import { Search, AlignJustify, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ListsTable from "../../../components/dashboard/lists/ListsTable";
import ListSummaryPanel from "../../../components/dashboard/lists/ListsPanelSummary";
import {
  AddFromPropertiesModal,
  AddFromExistingListModal,
  UploadOptionModal,
  UploadFileModal,
} from "../../../components/dashboard/lists/ListModals";
import { MOCK_LISTS } from "../../../components/dashboard/lists/listsMockData";
import TopbarSlot from "@/components/dashboard/topbar/TopbarSlot";

const PROPERTY_FILTERS = [
  "all",
  "35 Jones St",
  "5 Pine Ln",
  "10 Bird St",
  "21 Thompson St",
];

function ListsTopbar({
  propertyFilter,
  onPropertyFilter,
  onSearch,
  onNewList,
}) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-wrap w-full items-center gap-3">
      <div className="w-80 h-10 border-[#4A24AB] flex items-center gap-2 px-3 rounded-lg border bg-gray-50">
        <Search size={13} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={query}
          placeholder="Type a command or search..."
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-10 px-4 text-sm font-medium bg-[#F1F5F9] rounded-md gap-1.5 text-slate-700"
          >
            Property: {propertyFilter}
            <ChevronDown size={12} strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {PROPERTY_FILTERS.map((f) => (
            <DropdownMenuItem
              key={f}
              onClick={() => onPropertyFilter?.(f)}
              className="text-xs cursor-pointer capitalize"
            >
              {f === "all" ? "All properties" : f}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* New List — dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-10 px-4 bg-[#4A24AB] hover:bg-[#3b1d8a] text-white text-sm font-medium rounded-md gap-1.5 mr-1">
            New List
            <ChevronDown size={12} strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => onNewList?.("property")}
            className="text-xs cursor-pointer"
          >
            From Property
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onNewList?.("existing")}
            className="text-xs cursor-pointer"
          >
            From Existing List
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onNewList?.("file")}
            className="text-xs cursor-pointer"
          >
            From File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function ListsPage() {
  const [query, setQuery] = useState("");
  const [propFilter, setPropFilter] = useState("all");
  const [selectedList, setSelectedList] = useState(null);
  const [maximized, setMaximized] = useState(false);


  // New List modals
  const [newFromPropOpen, setNewFromPropOpen] = useState(false);
  const [newFromExistingOpen, setNewFromExistingOpen] = useState(false);
  const [uploadOptionOpen, setUploadOptionOpen] = useState(false);
  const [uploadFileOpen, setUploadFileOpen] = useState(false);

  const handleNewList = (type) => {
    if (type === "property") setNewFromPropOpen(true);
    else if (type === "existing") setNewFromExistingOpen(true);
    else if (type === "file") setUploadOptionOpen(true);
  };

  const filtered = MOCK_LISTS.filter((l) => {
    const q = query.toLowerCase();
    const matchesQuery =
      l.name.toLowerCase().includes(q) ||
      l.properties.some((p) => p.toLowerCase().includes(q));
    const matchesProp =
      propFilter === "all" ||
      l.properties.some((p) =>
        p.toLowerCase().includes(propFilter.toLowerCase()),
      );
    return matchesQuery && matchesProp;
  });

  return (
    <>
      <TopbarSlot>
        <ListsTopbar
          propertyFilter={propFilter}
          onPropertyFilter={setPropFilter}
          onSearch={setQuery}
          onNewList={handleNewList}
        />
      </TopbarSlot>

      <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-1 flex-col md:flex-row md:gap-4 lg:gap-0 min-h-0">
          {/* Table — 40% when panel open, full width when closed */}
          {!maximized && (
            <div
              className={
                selectedList
                  ? "flex-[0_0_40%] border-r border-gray-100 overflow-auto"
                  : "flex-1 overflow-auto"
              }
            >
              <ListsTable
                lists={filtered}
                selectedId={selectedList?.id}
                onRowClick={(list) =>
                  setSelectedList((prev) => (prev?.id === list.id ? null : list))
                }
                compact={false}
              />
            </div>
          )}

          {/* Summary panel — only when a row is selected */}
          {selectedList && (
            <div className={maximized ? "flex-1 overflow-y-auto" : "flex-[0_0_60%] overflow-y-auto"}>
              <div className="border border-slate-200 rounded-md lg:ml-2 p-5">
                <ListSummaryPanel
                  key={selectedList.id}
                  list={selectedList}
                  onMaximize={() => setMaximized((v) => !v)}
                  onClose={() => { setSelectedList(null); setMaximized(false); }}
                  onSave={(updated) => {
                    setSelectedList(updated);
                    console.log("Saved list:", updated);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Top-level "New List" modals */}
        <AddFromPropertiesModal
          open={newFromPropOpen}
          onClose={() => setNewFromPropOpen(false)}
          onAdd={(props) => console.log("New list from props:", props)}
        />
        <AddFromExistingListModal
          open={newFromExistingOpen}
          onClose={() => setNewFromExistingOpen(false)}
          onAdd={(lists) => console.log("New list from existing:", lists)}
        />
        <UploadOptionModal
          open={uploadOptionOpen}
          onClose={() => setUploadOptionOpen(false)}
          onUploadFile={() => setUploadFileOpen(true)}
        />
        <UploadFileModal
          open={uploadFileOpen}
          onClose={() => setUploadFileOpen(false)}
          onFileSelected={(f) => console.log("File:", f)}
        />
      </div>
    </>
  );
}
