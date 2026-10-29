import { cn } from "@/lib/utils";
import { CrossMark } from "./Icon";

/** Small outlined pill with a medical cross that sits above every H2. */
export function Eyebrow({ children, tone = "light", className }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-card border px-3 py-1.5 text-sm font-medium",
        tone === "light" ? "border-line bg-white text-ink" : "border-white/25 bg-white/5 text-white",
        className,
      )}
    >
      <CrossMark className={cn("h-3 w-3", tone === "light" ? "text-primary" : "text-white")} />
      {children}
    </span>
  );
}
