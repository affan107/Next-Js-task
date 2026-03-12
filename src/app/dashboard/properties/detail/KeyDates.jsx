const DATE_LABELS = {
  // listed: "Listed",
  inspection: "Inspection",
  auction: "Auction",
};

/**
 * KeyDates
 * Props:
 *  - dates?: { listed: string, inspection: string, auction: string }
 */
export default function KeyDates({ dates }) {
  const d = dates ?? {
    // listed: "10:00am, Sat 19 Mar-25",
    inspection: "10:00am, Sat 19 Mar-25",
    auction: "11:00am, Tue 15 Mar-25",
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold text-slate-800">Key Dates</h3>

      <div className="flex flex-col gap-2">
        {Object.entries(d).map(([key, value]) => (
          <div key={key} className="flex items-baseline gap-2">
              <span className="text-[11px] text-slate-900">{value}</span>
              <span className="text-sm font-semibold text-[#4A24AB] w-18 shrink-0">
                {DATE_LABELS[key]}
              </span>
            </div>
        ))}
      </div>
    </div>
  );
}
