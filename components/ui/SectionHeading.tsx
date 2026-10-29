import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag id={id} className={cn("mt-5 text-h2", tone === "dark" && "text-white")}>
        {title}
      </Tag>
      {intro && <p className={cn("mt-5 text-lead", tone === "dark" ? "text-white/75" : "text-body")}>{intro}</p>}
    </div>
  );
}
