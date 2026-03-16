"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CalendarPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AlignJustify, PhoneCall, ContactRound} from "lucide-react";

/**
 * PropertyCard
 *
 * Props:
 *  - image: string (src)
 *  - headline: string
 *  - description: string
 *  - onCreateEvent: () => void
 *  - onJump: () => void
 *  - className: string (optional)
 */
export default function PropertyCard({
  image = "/house.png",
  headline = "Headline",
  description = "Please click to read more about this property. Maecenas condimentum tincidunt.",
  onCreateEvent,
  onJump,
  className,
}) {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-xl border-0 shadow-sm transition-shadow duration-200 bg-white ",
      )}
    >
      {/* Image*/}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image src={image} alt={headline} fill className="object-contained" />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 gap-2">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-1">
          {headline}
        </h3>
        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1.5 mt-1">
          <Button
            size="sm"
            onClick={onCreateEvent}
            className="flex-1 h-7 text-sm font-medium bg-[#4A24AB] text-[#FFFFFF] rounded-sm px-2"
          >
            Create Batch
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                onClick={onJump}
                className="flex-1 h-7 text-sm font-medium border-2 border-[#4A24AB] bg-white text-[#4A24AB] rounded-sm px-2"
              >
                Jump to
                <ArrowRight size={11} className="ml-1 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-1">
              <DropdownMenuItem className="text-sm font-medium">
                <AlignJustify className="text-[#4A24AB]" />
                Batches
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm font-medium">
                <PhoneCall className="text-[#4A24AB]" />
                Calls
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm font-medium">
                <ContactRound className="text-[#4A24AB]" />
                Contacts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
