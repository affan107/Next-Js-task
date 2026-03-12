import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  "Pre-Launched": "bg-[#BFE2FF] text-[#2C96F0]",
  Live: "bg-[#C8FFDC]  text-[#15813D]",
  Closed: "bg-[#FFC5C5]    text-[#B42941]",
  // Completed: "bg-blue-100   text-blue-700",
  // Scheduled: "bg-amber-100  text-amber-700",
  // "In Progress": "bg-indigo-100 text-indigo-700",
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
