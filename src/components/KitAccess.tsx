"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Stamp } from "./Stamp";

const UNLOCK_KEY = "depositback.kit.v1";
const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

type Access = "checking" | "locked" | "unlocked";

export function KitAccess() {
  const params = useSearchParams();
  const [access, setAccess] = useState<Access>("checking");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    // Beta mode: no payment configured → kit is open.
    if (!paymentLink) {
      setAccess("unlocked");
      return;
    }
    if (localStorage.getItem(UNLOCK_KEY) === "yes") {
      setAccess("unlocked");
      return;
    }
    const sessionId = params.get("session_id");
    if (sessionId) {
      setVerifying(true);
      fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.paid) {
            localStorage.setItem(UNLOCK_KEY, "yes");
            setAccess("unlocked");
          } else {
            setAccess("locked");
          }
        })
        .catch(() => setAccess("locked"))
        .finally(() => setVerifying(false));
    } else {
      setAccess("locked");
    }
  }, [params]);

  if (access === "checking" || verifying) {
    return (
      <div className="py-24 text-center font-ui text-soot">
        {verifying ? "Confirming your purchase…" : "Loading…"}
      </div>
    );
  }

  if (access === "locked") {
    return (
      <div className="plate relative mx-auto max-w-xl p-8 text-center sm:p-10">
        <Stamp className="absolute -top-4 right-8 text-base">Sealed</Stamp>
        <h2 className="font-display text-3xl font-black leading-tight">
          Unlock the full kit
        </h2>
        <div className="mt-3 font-display text-5xl font-black text-seal">$29</div>
        <p className="mt-1 font-ui text-[13px] uppercase tracking-[0.14em] text-soot">
          One-time · yours forever
        </p>
        <p className="mx-auto mt-5 max-w-sm text-[15.5px] leading-relaxed text-soot">
          The final-notice letter, the small-claims walkthrough, the evidence organizer,
          and the hearing script. If you recover even a tenth of a typical deposit, it
          paid for itself six times over.
        </p>
        <a href={paymentLink} className="btn-primary mt-7 w-full">
          Get the kit — $29
        </a>
        <p className="mt-4 text-[13px] text-soot/70">
          Already purchased? Open the link from your Stripe receipt on this device, and
          the kit unlocks automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {!paymentLink && (
        <div className="rounded-sm border-2 border-dashed border-moss/50 bg-moss/5 px-5 py-4 text-center font-ui text-[14px] font-semibold text-moss">
          Launch special: the full kit is free while DepositBack is in beta.
        </div>
      )}

      {/* 1 — Final notice letter */}
      <section id="final-notice" className="doc-card p-7 sm:p-9">
        <div className="kicker">Part 1 · The final notice</div>
        <h2 className="mt-2 font-display text-3xl font-black">
          One last letter before court
        </h2>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-soot">
          Send this 10 days after your demand letter goes unanswered. It does one job:
          make clear that the next envelope they receive will be a court summons — and
          that a judge will see they ignored two certified letters.
        </p>
        <div className="letter-paper mt-6 whitespace-pre-wrap text-[12.5px]">{FINAL_NOTICE}</div>
      </section>

      {/* 2 — Small claims walkthrough */}
      <section id="filing" className="doc-card p-7 sm:p-9">
        <div className="kicker">Part 2 · Filing</div>
        <h2 className="mt-2 font-display text-3xl font-black">
          Small claims, step by step
        </h2>
        <ol className="mt-6 space-y-5">
          {FILING_STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-cream font-display text-sm font-black">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{s.t}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-soot">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 3 — Evidence organizer */}
      <section id="evidence" className="doc-card p-7 sm:p-9">
        <div className="kicker">Part 3 · Evidence</div>
        <h2 className="mt-2 font-display text-3xl font-black">The exhibit binder</h2>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-soot">
          Judges decide deposit cases on paper. Bring three copies of everything (you,
          the judge, the landlord), in this order, labeled A through H:
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {EVIDENCE.map((e) => (
            <li key={e.k} className="flex gap-3 rounded-sm border border-rule bg-white/60 p-4">
              <span className="font-display text-xl font-black text-seal">{e.k}</span>
              <div>
                <div className="font-ui text-[14px] font-bold">{e.t}</div>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-soot">{e.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 — Hearing script */}
      <section id="hearing" className="doc-card p-7 sm:p-9">
        <div className="kicker">Part 4 · Your day in court</div>
        <h2 className="mt-2 font-display text-3xl font-black">The 90-second opening</h2>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-soot">
          Small-claims judges hear dozens of cases a day. You win by being the organized
          one. Memorize this shape — facts, statute, ask:
        </p>
        <div className="letter-paper mt-6 whitespace-pre-wrap text-[12.5px]">{SCRIPT}</div>
        <div className="mt-6 rounded-sm border-l-4 border-seal bg-paper p-5">
          <div className="overline-label">If they offer to settle in the hallway</div>
          <p className="mt-2 text-[15px] leading-relaxed text-soot">
            Many cases settle minutes before the hearing. A fair floor: the full deposit,
            today, by certified check or instant transfer. You hold the penalty claim as
            leverage — they're choosing between paying 1× now or risking 2–3× plus costs
            inside. Get any settlement in writing before you leave the building, and only
            dismiss the case after the money clears.
          </p>
        </div>
      </section>
    </div>
  );
}

const FINAL_NOTICE = `[Your name]
[Your address]

[Date]

VIA CERTIFIED MAIL — RETURN RECEIPT REQUESTED

[Landlord name]
[Landlord address]

RE: FINAL NOTICE before court filing — security deposit, [rental address]

Dear [Landlord name]:

On [date of first letter], I sent you a formal demand for the return of my
security deposit of [$amount], citing [statute]. Delivery was confirmed on
[delivery date per the certified-mail receipt]. You have not responded.

This is my final notice. If full payment is not in my hands by [date — 7 days
out], I will file a claim in small claims court seeking the statutory penalty
— [penalty from your state's page] — plus filing fees and costs. I will present
the court with both certified letters and your silence.

You can end this today by delivering payment of [$amount] to the address above.

Sincerely,

[Your name]`;

const FILING_STEPS = [
  {
    t: "Find the right court",
    d: "Search \"[your county] small claims court\". File in the county where the rental sits or where the landlord does business. Claim limits run $5,000–$20,000 depending on the state — deposit penalties fit comfortably.",
  },
  {
    t: "Name the defendant correctly",
    d: "Sue the entity on your lease. If it's \"Bluebonnet Property Group LLC\", that exact name goes on the form — look it up on your state's business-registry site. Getting this wrong is the #1 way tenants lose on a technicality.",
  },
  {
    t: "File and pay the fee",
    d: "Most courts now accept online filing. Fees run $30–$120 — and you ask for them back as costs in your claim. Your claim amount: the withheld deposit × your state's multiplier, plus any flat statutory penalty, plus the filing fee.",
  },
  {
    t: "Serve the landlord",
    d: "The court must formally notify the landlord — usually certified mail handled by the clerk, a sheriff, or a process server ($0–$75). Your hearing lands 4–10 weeks out. Many landlords call to settle the week they're served.",
  },
  {
    t: "Show up organized",
    d: "Arrive early, dress plainly, bring your binder. When your case is called, hand the judge your exhibits and give the 90-second opening below. Then stop talking — over-explaining loses winnable cases.",
  },
];

const EVIDENCE = [
  { k: "A", t: "The lease", d: "Highlight the deposit amount and any deposit clause." },
  { k: "B", t: "Deposit proof", d: "Receipt, canceled check, or bank/Venmo record of paying it." },
  { k: "C", t: "Move-out photos & video", d: "Timestamped, wide shots of every room plus closeups. A walkthrough video is gold." },
  { k: "D", t: "Move-in condition report", d: "If you have one — it defines what 'damage' can even mean." },
  { k: "E", t: "Forwarding-address proof", d: "The text, email, or certified letter where you provided it, with the date." },
  { k: "F", t: "Demand letter + green card", d: "Your statute-citing letter and the certified-mail return receipt." },
  { k: "G", t: "Final notice + receipt", d: "The second letter proving they had every chance." },
  { k: "H", t: "The statute", d: "A printout of your state's deposit statute with the deadline and penalty highlighted." },
];

const SCRIPT = `"Your Honor, this is a security-deposit case.

I rented [address] from the defendant and moved out on [date], leaving the
unit in good condition — Exhibits C and D. I paid a [$amount] deposit —
Exhibit B — and provided my forwarding address on [date] — Exhibit E.

Under [statute], the defendant had [N] days — until [deadline date] — to
return my deposit or send an itemized statement. They did neither. I sent a
demand letter on [date] and a final notice on [date], both by certified mail
— Exhibits F and G. Both were ignored.

The statute — Exhibit H — provides that a landlord who fails to comply
[penalty]. I'm asking for [total: deposit × multiplier + flat penalty], plus
my [$fee] filing fee. Thank you."`;
