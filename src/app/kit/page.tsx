import type { Metadata } from "next";
import { Suspense } from "react";
import { KitAccess } from "@/components/KitAccess";

export const metadata: Metadata = {
  title: "The Escalation Kit — when your landlord ignores the demand letter",
  description:
    "Final-notice letter, small-claims filing walkthrough, evidence organizer, and a hearing-day script. Everything you need to turn a stonewalling landlord into a court judgment — no lawyer required.",
};

export default function KitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <div className="kicker">For the stonewalled</div>
        <h1 className="mt-3 font-display text-4xl font-black leading-[1.08] sm:text-5xl">
          The Escalation Kit.
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-soot">
          Most landlords fold at the demand letter. This kit is for the ones who don&apos;t:
          a final-notice letter, the small-claims playbook, an exhibit-binder checklist,
          and the 90-second script for your hearing. You walk in asking for double or
          triple; they walk in explaining why they ignored a statute and two certified
          letters.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<div className="py-20 text-center font-ui text-soot">Loading…</div>}>
          <KitAccess />
        </Suspense>
      </div>
    </div>
  );
}
