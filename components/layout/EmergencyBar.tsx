import { Phone } from "lucide-react";
import { BRANCH_LIST } from "@/lib/site";
import { t } from "@/lib/i18n";
import { SocialIcons } from "@/components/ui/SocialIcons";

/** Top emergency strip (brief 4.2), part of the sticky header. */
export function EmergencyBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container flex min-h-[44px] items-center justify-between gap-3 text-sm">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 py-1.5">
          <span className="inline-flex items-center gap-2 font-semibold">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency-brand opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emergency-brand" />
            </span>
            <span className="hidden sm:inline">{t.emergency247}</span>
            <span className="sm:hidden">24x7 Emergency</span>
          </span>
          {BRANCH_LIST.map((b) => (
            <a
              key={b.id}
              href={b.phoneHref}
              data-branch={b.id}
              className="inline-flex min-h-[36px] items-center gap-1.5 underline-offset-4 hover:underline"
            >
              <Phone className="h-3.5 w-3.5 text-emergency-brand" aria-hidden="true" />
              <span className="text-white/70 md:text-white/70">
                {b.name}
                <span className="hidden md:inline">:</span>
              </span>
              <span className="hidden font-semibold md:inline">{b.phone}</span>
              <span className="sr-only md:hidden">{b.phone}</span>
            </a>
          ))}
        </p>
        <SocialIcons size="sm" className="hidden lg:flex" />
      </div>
    </div>
  );
}
