import type { Metadata } from "next";
import { Suspense } from "react";
import { LetterBuilder } from "@/components/LetterBuilder";

export const metadata: Metadata = {
  title: "Free security deposit demand letter generator (all 50 states)",
  description:
    "Generate a demand letter that cites your state's security-deposit statute, computes the exact deadline your landlord missed, and states the penalty. Free — print or copy, nothing stored.",
};

export default function DemandLetterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="print-hide max-w-2xl">
        <div className="kicker">Exhibit A</div>
        <h1 className="mt-3 font-display text-4xl font-black leading-[1.08] sm:text-5xl">
          The demand letter.
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-soot">
          Fill in the facts; we cite the statute, do the date math, and state the penalty.
          Print it or copy it — it&apos;s yours, free. Landlords settle when they see you
          know the law.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<div className="py-20 text-center font-ui text-soot">Loading…</div>}>
          <LetterBuilder />
        </Suspense>
      </div>
    </div>
  );
}
