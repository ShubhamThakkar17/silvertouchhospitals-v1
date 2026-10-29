import { SHOW_CONFIRM } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Marks content the hospital still has to confirm. Visible on dev/staging
 * builds; on production it renders `fallback` (or nothing).
 */
export function Confirm({ note, fallback = null, className }: { note: string; fallback?: React.ReactNode; className?: string }) {
  if (!SHOW_CONFIRM) return <>{fallback}</>;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-dashed border-amber-500 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800",
        className,
      )}
      title="Waiting on hospital confirmation (see CONFIRM.md)"
    >
      [CONFIRM] {note}
    </span>
  );
}
