import type { Metadata } from "next";
import Link from "next/link";
import { STATES, licenseLabel, vehicleLabel, LAST_REVIEWED } from "@/lib/moveData";

export const metadata: Metadata = {
  title: "New resident deadlines in all 50 states: license & vehicle registration windows",
  description:
    "How many days each state gives new residents to convert a driver's license and register a vehicle — from zero grace period (Arizona, Massachusetts) to 90 days. Full table.",
};

export default function DeadlinesPage() {
  const sorted = [...STATES].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="kicker">The master table</div>
      <h1 className="mt-3 font-sign text-4xl font-black leading-[1.06] sm:text-5xl">
        Every state&apos;s new-resident clock.
      </h1>
      <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-gravel">
        Days after establishing residency to convert your license and register your
        vehicle. &ldquo;Immediately&rdquo; means the state has no statutory grace period.
        Last reviewed {LAST_REVIEWED}.
      </p>

      <div className="card mt-8 overflow-hidden">
        <div className="hidden grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-4 bg-sign px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:grid">
          <div>State</div>
          <div>License</div>
          <div>Vehicle</div>
          <div className="text-right">Income tax</div>
        </div>
        <ul className="divide-y divide-rule">
          {sorted.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/state/${s.slug}`}
                className="grid grid-cols-2 gap-2 px-5 py-3.5 transition hover:bg-road sm:grid-cols-[1.4fr_1fr_1fr_0.8fr] sm:items-baseline sm:gap-4"
              >
                <div className="col-span-2 font-sign text-[16px] font-extrabold sm:col-span-1">
                  {s.name}
                </div>
                <div className={`font-mono text-[14px] font-bold ${s.licenseDays <= 10 ? "text-red-700" : "text-sign"}`}>
                  {licenseLabel(s)}
                </div>
                <div className="font-mono text-[14px] font-bold text-gravel">
                  {vehicleLabel(s)}
                </div>
                <div className="text-left font-mono text-[13px] sm:text-right">
                  {s.noIncomeTax ? (
                    <span className="font-bold text-sign">None</span>
                  ) : (
                    <span className="text-gravel/70">Yes</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-[13px] leading-relaxed text-gravel/80">
        Windows run from &ldquo;establishing residency,&rdquo; which states define by
        triggers like starting a job, signing a lease, or enrolling children — not by
        when you unpack. Details and quirks are on each state&apos;s page. General
        information, not legal advice.
      </p>
    </div>
  );
}
