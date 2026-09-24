// Visible stand-ins for content that has to come from the business: real
// photos, confirmed prices, contract terms. Deliberately loud (amber, dashed)
// so nothing unconfirmed can ship looking finished. Search the repo for
// "<Ph" to find every one still to fill.

export function Ph({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-dashed border-amber-500 bg-amber-50 px-1.5 py-0.5 text-amber-800">
      {children}
    </span>
  );
}

export function PhImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`grid place-items-center border-2 border-dashed border-amber-400 bg-amber-50 p-4 text-center text-[13px] font-medium text-amber-800 ${className}`}
    >
      {label}
    </div>
  );
}
