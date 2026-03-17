"use client";

import { MoreHorizontal, Eye, Pencil, Trash2, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * PropertyRowActions
 * Props:
 *  - propertyId: string | number
 *  - onView?: () => void
 *  - onEdit?: () => void
 *  - onDuplicate?: () => void
 *  - onDelete?: () => void
 */
export default function PropertyRowActions({
  propertyId,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-7 h-7 rounded-md text-slate-800">
          <MoreHorizontal size={15} strokeWidth={1.8} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={onView}
          className="text-xs gap-2 cursor-pointer"
        >
          <Eye size={13} /> View detail
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onEdit}
          className="text-xs gap-2 cursor-pointer"
        >
          <Pencil size={13} /> Edit property
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          onClick={onDuplicate}
          className="text-xs gap-2 cursor-pointer"
        >
          <Copy size={13} /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={onDelete}
          className="text-xs gap-2 cursor-pointer text-red-500 focus:text-red-500"
        >
          <Trash2 size={13} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
