"use client";

import Link from "next/link";
import { useId, useState } from "react";

/** Simple BMI calculator for the bariatric page (brief 5.13). Informational only. */
export function BmiCalculator() {
  const id = useId();
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const hm = Number(h) / 100;
  const kg = Number(w);
  const bmi = hm > 0.5 && hm < 2.5 && kg > 20 && kg < 400 ? kg / (hm * hm) : null;
  const band =
    bmi === null ? null : bmi < 18.5 ? "Underweight" : bmi < 23 ? "Normal" : bmi < 25 ? "Overweight" : "Obese";

  const field = "mt-1.5 block w-full min-h-[52px] rounded-card border border-line px-4 text-base text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
  return (
    <div className="not-prose mt-12 rounded-card bg-primary-tint p-6 sm:p-8">
      <h3 className="text-2xl font-semibold">BMI calculator</h3>
      <p className="mt-2">Body mass index is one of the measures doctors use when assessing whether bariatric surgery may suit you.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label htmlFor={`${id}-h`} className="text-sm font-medium text-ink">
          Height (cm)
          <input id={`${id}-h`} inputMode="decimal" className={field} value={h} onChange={(e) => setH(e.target.value)} placeholder="165" />
        </label>
        <label htmlFor={`${id}-w`} className="text-sm font-medium text-ink">
          Weight (kg)
          <input id={`${id}-w`} inputMode="decimal" className={field} value={w} onChange={(e) => setW(e.target.value)} placeholder="95" />
        </label>
      </div>
      <p className="mt-6 text-lg text-ink" aria-live="polite">
        {bmi ? (
          <>
            Your BMI is <strong className="text-3xl font-semibold text-primary">{bmi.toFixed(1)}</strong> ({band}, using Indian BMI cut-offs)
          </>
        ) : (
          "Enter your height and weight to see your BMI."
        )}
      </p>
      <p className="mt-3 text-sm">
        BMI alone does not decide eligibility; our surgeons assess your overall health. Read{" "}
        <Link href="/what-is-the-minimum-bmi-required-for-bariatric-surgery/" className="font-medium text-primary underline">
          What is the minimum BMI required for bariatric surgery?
        </Link>
      </p>
    </div>
  );
}
