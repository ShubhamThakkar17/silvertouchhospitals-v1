"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { VISIBLE_DOCTORS, withPhotosFirst } from "@/content/doctors";
import { SPECIALITY_BY_SLUG } from "@/content/specialities";
import { BRANCH_LIST, type BranchId } from "@/lib/site";
import { DoctorCard } from "@/components/cards/DoctorCard";

const select =
  "min-h-[52px] w-full rounded-full border border-line bg-white px-5 text-base text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function DoctorFilter() {
  const [spec, setSpec] = useState("");
  const [branch, setBranch] = useState<"" | BranchId>("");
  const [q, setQ] = useState("");
  const specs = useMemo(() => {
    const slugs = new Set(VISIBLE_DOCTORS.flatMap((d) => d.specialities));
    return Array.from(slugs).map((s) => SPECIALITY_BY_SLUG[s]).sort((a, b) => a.name.localeCompare(b.name));
  }, []);
  const list = withPhotosFirst(
    VISIBLE_DOCTORS.filter((d) => !spec || d.specialities.includes(spec))
      // Doctors without confirmed branch days are shown under both branches.
      .filter((d) => !branch || !d.branches.length || d.branches.includes(branch))
      .filter((d) => !q.trim() || `${d.name} ${d.designation} ${d.expertise.join(" ")}`.toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3">
        <label>
          <span className="sr-only">Speciality</span>
          <select className={select} value={spec} onChange={(e) => setSpec(e.target.value)}>
            <option value="">All specialities</option>
            {specs.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Branch</span>
          <select className={select} value={branch} onChange={(e) => setBranch(e.target.value as BranchId | "")}>
            <option value="">Both branches</option>
            {BRANCH_LIST.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
        <label className="relative">
          <span className="sr-only">Search doctors</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-body" aria-hidden="true" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or treatment" className={`${select} pl-12`} />
        </label>
      </div>
      <p className="mt-6 text-sm" aria-live="polite">
        {list.length} doctor{list.length === 1 ? "" : "s"}
      </p>
      <ul className="mt-4 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((d) => (
          <li key={d.slug}>
            <DoctorCard d={d} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </>
  );
}
