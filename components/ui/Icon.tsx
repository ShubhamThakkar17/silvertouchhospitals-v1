import {
  Baby,
  Bone,
  Brain,
  ClipboardPlus,
  Droplet,
  Ear,
  PersonStanding,
  Scissors,
  Siren,
  Stethoscope,
  Syringe,
  Thermometer,
  Weight,
  type LucideProps,
} from "lucide-react";

/** Line icons in the lucide style for organs lucide does not cover. */
function Custom({ paths, ...props }: Omit<LucideProps, "d"> & { paths: string[] }) {
  const { size = 24, strokeWidth = 1.75, className, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {paths.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}

const CUSTOM: Record<string, string[]> = {
  tooth: [
    "M7 3c-2 0-3.5 1.6-3.5 4 0 2 .8 3.4 1.3 5 .5 1.8.7 4 1.2 6.2.4 1.6 1 2.8 2 2.8s1.4-1.5 1.7-3.3c.3-1.6.6-3.2 2.3-3.2s2 1.6 2.3 3.2c.3 1.8.7 3.3 1.7 3.3s1.6-1.2 2-2.8c.5-2.2.7-4.4 1.2-6.2.5-1.6 1.3-3 1.3-5 0-2.4-1.5-4-3.5-4-1.8 0-2.7 1-5 1S8.8 3 7 3Z",
  ],
  lungs: [
    "M12 3v8.5",
    "M12 11.5c-.8 1-1.8 1.6-2.8 1.8",
    "M12 11.5c.8 1 1.8 1.6 2.8 1.8",
    "M8.4 6.5C5.8 6.5 3 10.6 3 16.2 3 18.8 4 20 5.6 20c2.4 0 3.9-1.6 3.9-5V8c0-.9-.4-1.5-1.1-1.5Z",
    "M15.6 6.5c2.6 0 5.4 4.1 5.4 9.7 0 2.6-1 3.8-2.6 3.8-2.4 0-3.9-1.6-3.9-5V8c0-.9.4-1.5 1.1-1.5Z",
  ],
  kidney: [
    "M9 3C5.5 3 3.5 6.5 3.5 11.5S5.5 21 9 21c2.2 0 3.2-1.6 3.2-3.4 0-1.6-1.2-2.4-1.2-4.1 0-1.6 1.2-2.4 1.2-4.2C12.2 5.4 11 3 9 3Z",
    "M12 12h3.5c1 0 1.5.7 1.5 1.5V21",
    "M17.5 4.5c1.9.9 3 3.4 3 6.5",
  ],
  stomach: [
    "M10 3v3.2c0 1.6-1 2.4-2.6 2.9C5.1 9.8 4 12 4 14.6 4 18.5 7 21 11 21c5 0 9-3.4 9-8.4 0-3-1.9-5.1-4.4-5.1-2 0-3.1 1.4-3.1 3 0 1.2-.9 2-2 2",
  ],
  spine: [
    "M9.5 2.5h5a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z",
    "M9 8.5h6a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z",
    "M9.5 14.5h5a1 1 0 0 1 1 1V17a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1Z",
    "M10.5 20.5h3",
    "M12 6v2.5M12 12v2.5M12 18v2.5",
  ],
};

const LUCIDE = {
  bone: Bone,
  "person-standing": PersonStanding,
  scissors: Scissors,
  weight: Weight,
  stethoscope: Stethoscope,
  droplet: Droplet,
  brain: Brain,
  syringe: Syringe,
  thermometer: Thermometer,
  siren: Siren,
  clipboard: ClipboardPlus,
  ear: Ear,
  baby: Baby,
} as const;

export type IconName = keyof typeof LUCIDE | "tooth" | "lungs" | "kidney" | "stomach" | "spine";

export function Icon({ name, ...props }: LucideProps & { name: IconName }) {
  if (name in CUSTOM) return <Custom paths={CUSTOM[name]} {...props} />;
  const L = LUCIDE[name as keyof typeof LUCIDE];
  return <L strokeWidth={1.75} aria-hidden="true" {...props} />;
}

/** Medical cross used in eyebrow chips. */
export function CrossMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M6 1.5h4v4.5h4.5v4H10v4.5H6V10H1.5V6H6z" fill="currentColor" />
    </svg>
  );
}
