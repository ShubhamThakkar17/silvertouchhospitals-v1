import { SOCIALS } from "@/lib/site";
import { cn } from "@/lib/utils";

const PATHS: Record<string, React.ReactNode> = {
  Facebook: (
    <path
      fill="currentColor"
      d="M9.1 23.7v-8H6.6V12h2.5v-1.6c0-4.1 1.8-6 5.9-6 .4 0 1 .1 1.5.1.4.1.8.1 1.1.2V8l-.7-.1h-.7c-.7 0-1.3.1-1.7.3-.3.2-.5.4-.7.6-.3.4-.4 1-.4 1.8V12h3.9l-.4 2.1-.3 1.6H13.4V24C19.4 23.2 24 18.2 24 12 24 5.4 18.6 0 12 0S0 5.4 0 12c0 5.6 3.9 10.4 9.1 11.7Z"
    />
  ),
  Instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </g>
  ),
  "X (Twitter)": (
    <path
      fill="currentColor"
      d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9Zm-1.3 19.5h2L6.5 3.2H4.3Z"
    />
  ),
  LinkedIn: (
    <path
      fill="currentColor"
      d="M20.4 20.5h-3.5v-5.6c0-1.3 0-3-1.9-3-1.8 0-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1Zm1.8 13.1H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z"
    />
  ),
};

export function SocialIcons({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Silver Touch Hospitals on ${s.name}`}
            className={cn(
              "grid place-items-center rounded-full transition-colors hover:bg-white/15",
              size === "sm" ? "h-9 w-9" : "h-11 w-11",
            )}
          >
            <svg viewBox="0 0 24 24" className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} aria-hidden="true">
              {PATHS[s.name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
