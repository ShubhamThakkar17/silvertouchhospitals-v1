import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PillVariant = "primary" | "white" | "outline" | "outline-dark" | "emergency" | "ghost";

const BASE =
  "group/pill inline-flex min-h-[48px] items-center justify-between gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[1rem] font-medium transition-colors duration-200";

const VARIANTS: Record<PillVariant, { root: string; disc: string }> = {
  primary: { root: "bg-primary text-white hover:bg-primary-dark", disc: "bg-white text-primary" },
  white: { root: "bg-white text-ink hover:bg-surface", disc: "bg-primary text-white" },
  outline: { root: "border border-line bg-white text-ink hover:border-ink", disc: "bg-ink text-white" },
  "outline-dark": { root: "border border-white/30 text-white hover:bg-white/10", disc: "bg-white text-ink" },
  emergency: { root: "bg-emergency text-white hover:bg-emergency-dark", disc: "bg-white text-emergency" },
  ghost: { root: "bg-surface text-ink hover:bg-line/60", disc: "bg-primary text-white" },
};

export function pillClasses(variant: PillVariant = "primary", className?: string) {
  return cn(BASE, VARIANTS[variant].root, className);
}

export function ArrowDisc({ variant = "primary", icon }: { variant?: PillVariant; icon?: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover/pill:rotate-45",
        VARIANTS[variant].disc,
      )}
    >
      {icon ?? <ArrowUpRight className="h-4 w-4" strokeWidth={2} />}
    </span>
  );
}

type Common = { variant?: PillVariant; className?: string; children: React.ReactNode; icon?: React.ReactNode };

/** Pill link with the Hospic-style arrow disc. External/tel/mailto links use <a>. */
export function PillLink({
  href,
  variant = "primary",
  className,
  children,
  icon,
  ...rest
}: Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const inner = (
    <>
      <span>{children}</span>
      <ArrowDisc variant={variant} icon={icon} />
    </>
  );
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={pillClasses(variant, className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={pillClasses(variant, className)} {...rest}>
      {inner}
    </Link>
  );
}

export function PillButton({
  variant = "primary",
  className,
  children,
  icon,
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={pillClasses(variant, className)} {...rest}>
      <span>{children}</span>
      <ArrowDisc variant={variant} icon={icon} />
    </button>
  );
}
