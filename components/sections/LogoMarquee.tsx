import Image from "next/image";
import { EMPANELMENTS, INSURERS } from "@/content/insurers";
import { img } from "@/lib/media";

/** Greyscale insurer/empanelment marquee, colour on hover, pauses on hover (brief 4.7). */
export function LogoMarquee({ title = "Cashless Facility Available" }: { title?: string }) {
  const logos = [...EMPANELMENTS, ...INSURERS];
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={hidden || undefined}>
      {logos.map((l) => {
        const i = img(l.image);
        return (
          <li key={l.name} className="grid h-24 w-44 shrink-0 place-items-center rounded-card border border-line bg-white px-5">
            <Image
              src={i.src}
              width={i.width}
              height={i.height}
              alt={hidden ? "" : l.name}
              className="max-h-16 w-auto object-contain grayscale transition duration-300 hover:grayscale-0"
            />
          </li>
        );
      })}
    </ul>
  );
  return (
    <section className="py-16" aria-labelledby="cashless-heading">
      <div className="container">
        <h2 id="cashless-heading" className="text-center text-2xl font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-center">PMJAY, CGHS, ISRO and MA Yojana empanelled. Cashless with leading insurers.</p>
      </div>
      <div className="group mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
