import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  "Pre-Launched": "bg-[#BFE2FF] text-[#2C96F0]",
  Live: "bg-[#C8FFDC]  text-[#15813D]",
  Closed: "bg-[#FFC5C5]    text-[#B42941]",
  Completed: "bg-[#C8FFDC]   text-[#15813D]",
  Scheduled: "bg-[#DAD7FD]  text-[#5C2DD4]",
  "In Progress": "bg-[#BFE2FF] text-[#2C96F0]",
};

/**
 * PropertyStatusBadge
 * Props:
 *  - status: "Pre-Launched" | "Live" | "Closed" | "Completed" | "Scheduled" | "In Progress"
 *  - className?: string
 */
export default function PropertyStatusBadge({ status, className }) {
  const styles =
    STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600 border-gray-200";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border whitespace-nowrap",
        styles,
        className,
      )}
    >
      {status}
    </span>
  );
}
