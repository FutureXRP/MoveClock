import Link from "next/link";
import { STATES, LAST_REVIEWED } from "@/lib/states";

const POPULAR = [
  "california",
  "texas",
  "new-york",
  "florida",
  "massachusetts",
  "illinois",
  "washington",
  "georgia",
  "pennsylvania",
  "colorado",
  "new-jersey",
  "arizona",
];

export function Footer() {
  const popular = POPULAR.map((slug) => STATES.find((s) => s.slug === slug)!);
  return (
    <footer className="print-hide mt-24 border-t-4 border-double border-ink/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="font-display text-xl font-black text-ink">
            DepositBack<span className="text-seal">.</span>
          </div>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-soot">
            Your landlord has a legal deadline to return your security deposit — and in
            most states, a penalty for missing it. We turn that law into a letter.
          </p>
          <p className="mt-4 font-ui text-[11px] uppercase tracking-[0.14em] text-soot/70">
            Statutes last reviewed {LAST_REVIEWED}
          </p>
        </div>
        <div>
          <div className="overline-label">Deposit law by state</div>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[15px]">
            {popular.map((s) => (
              <li key={s.slug}>
                <Link href={`/law/${s.slug}`} className="text-soot underline decoration-rule underline-offset-4 transition hover:text-seal hover:decoration-seal">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/law" className="mt-3 inline-block font-ui text-[13px] font-semibold text-seal hover:underline">
            All 50 states + DC →
          </Link>
        </div>
        <div>
          <div className="overline-label">Tools</div>
          <ul className="mt-3 space-y-1.5 text-[15px]">
            <li>
              <Link href="/#deadline" className="text-soot underline decoration-rule underline-offset-4 transition hover:text-seal hover:decoration-seal">
                Deadline calculator
              </Link>
            </li>
            <li>
              <Link href="/demand-letter" className="text-soot underline decoration-rule underline-offset-4 transition hover:text-seal hover:decoration-seal">
                Demand letter generator
              </Link>
            </li>
            <li>
              <Link href="/kit" className="text-soot underline decoration-rule underline-offset-4 transition hover:text-seal hover:decoration-seal">
                Small-claims escalation kit
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="hairline mx-auto max-w-6xl px-4 sm:px-6">
        <p className="py-6 text-[13px] leading-relaxed text-soot/80">
          DepositBack provides general legal information and self-help tools, not legal
          advice, and is not a law firm or a substitute for an attorney. Statutes change
          and every situation differs — verify the current law for your state, and consult
          a lawyer or local tenant-rights organization for advice on your specific case.
          © {new Date().getFullYear()} DepositBack.
        </p>
      </div>
    </footer>
  );
}
