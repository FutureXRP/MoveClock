"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { STATES } from "@/lib/states";
import { addBusinessDays, addDays, daysFromToday, fmtLongDate, fmtMoney, todayISO } from "@/lib/dates";
import { Stamp } from "./Stamp";

export function LetterBuilder() {
  const params = useSearchParams();

  const [stateSlug, setStateSlug] = useState(params.get("state") ?? "");
  const [moveOut, setMoveOut] = useState(params.get("moveout") ?? "");
  const [deposit, setDeposit] = useState(params.get("deposit") ?? "");
  const [tenantName, setTenantName] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [landlordAddress, setLandlordAddress] = useState("");
  const [rentalAddress, setRentalAddress] = useState("");
  const [amountReturned, setAmountReturned] = useState("");
  const [gotItemization, setGotItemization] = useState(false);
  const [disputeText, setDisputeText] = useState("");
  const [copied, setCopied] = useState(false);

  const law = STATES.find((s) => s.slug === stateSlug);
  const depositNum = parseFloat(deposit) || 0;
  const returnedNum = parseFloat(amountReturned) || 0;
  const owed = Math.max(depositNum - returnedNum, 0);

  const computed = useMemo(() => {
    if (!law || !moveOut) return null;
    const deadline = law.businessDays
      ? addBusinessDays(moveOut, law.deadlineDays)
      : addDays(moveOut, law.deadlineDays);
    const overdueDays = -daysFromToday(deadline);
    const respondBy = addDays(todayISO(), 10);
    return { deadline, overdueDays, respondBy };
  }, [law, moveOut]);

  const ready = Boolean(law && moveOut && depositNum > 0);

  const letter = useMemo(() => {
    if (!law || !computed) return "";
    const today = fmtLongDate(new Date());
    const name = tenantName.trim() || "[Your name]";
    const newAddr = tenantAddress.trim() || "[Your current mailing address]";
    const llName = landlordName.trim() || "[Landlord / property manager name]";
    const llAddr = landlordAddress.trim() || "[Landlord mailing address]";
    const rental = rentalAddress.trim() || "[Rental property address]";
    const deadlineStr = fmtLongDate(computed.deadline);
    const overdue = computed.overdueDays;

    const received =
      returnedNum > 0
        ? `only a partial refund of ${fmtMoney(returnedNum)}${gotItemization ? " with an itemized statement" : ", with no itemized statement of deductions"}`
        : gotItemization
          ? "an itemized statement but no payment"
          : "neither my deposit nor any itemized statement of deductions";

    const deadlineSentence =
      overdue > 0
        ? `That deadline was ${deadlineStr} — ${overdue} day${overdue === 1 ? "" : "s"} ago. To date I have received ${received}.`
        : `That deadline is ${deadlineStr}. To date I have received ${received}, and I am putting you on notice of my claim now.`;

    const disputeParagraph = disputeText.trim()
      ? `\nI dispute the deductions you have claimed. ${disputeText.trim()} Deductions may not be taken for normal wear and tear, and unsupported or undocumented charges do not satisfy the statute.\n`
      : "";

    return `${name}
${newAddr}

${today}

VIA CERTIFIED MAIL — RETURN RECEIPT REQUESTED

${llName}
${llAddr}

RE: Demand for return of security deposit — ${rental}

Dear ${llName}:

I vacated the property at ${rental} on ${fmtLongDate(new Date(moveOut + "T00:00:00"))} and returned possession to you. I paid a security deposit of ${fmtMoney(depositNum)}, and this letter serves as my formal demand for its return${law.forwardingNote ? ", and as written notice of my forwarding address, stated above" : ""}.

Under ${law.statute}, you were required to return my deposit or provide a written, itemized statement of any lawful deductions within ${law.deadlineDays} ${law.businessDays ? "business " : ""}days. ${deadlineSentence}
${disputeParagraph}
Please be aware that under ${law.statute}, a landlord who fails to comply ${law.penaltyText}

I therefore demand payment of ${fmtMoney(owed || depositNum)} delivered to my address above within 10 days of the date of this letter — that is, by ${fmtLongDate(computed.respondBy)}. If I do not receive full payment by that date, I will file a claim in small claims court seeking the statutory penalty described above, plus court costs, without further notice to you.

I have retained records of my tenancy, my move-out condition, and delivery of this letter. I would prefer to resolve this without involving the court, and prompt payment will end the matter.

Sincerely,



${name}
`;
  }, [
    law, computed, moveOut, depositNum, returnedNum, owed, gotItemization,
    tenantName, tenantAddress, landlordName, landlordAddress, rentalAddress, disputeText,
  ]);

  async function copyLetter() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked; user can select manually
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <div className="print-hide">
        <div className="doc-card p-6">
          <div className="overline-label">Case details</div>
          <div className="mt-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label" htmlFor="lb-state">State</label>
                <select id="lb-state" className="field" value={stateSlug} onChange={(e) => setStateSlug(e.target.value)}>
                  <option value="">Choose…</option>
                  {STATES.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="lb-moveout">Move-out date</label>
                <input id="lb-moveout" type="date" max={todayISO()} className="field" value={moveOut} onChange={(e) => setMoveOut(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label" htmlFor="lb-deposit">Deposit paid</label>
                <input id="lb-deposit" type="number" min="0" placeholder="1800" className="field" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
              </div>
              <div>
                <label className="field-label" htmlFor="lb-returned">Refunded so far</label>
                <input id="lb-returned" type="number" min="0" placeholder="0" className="field" value={amountReturned} onChange={(e) => setAmountReturned(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="lb-rental">Rental address</label>
              <input id="lb-rental" className="field" placeholder="214 Elm St, Apt 3, Austin, TX 78701" value={rentalAddress} onChange={(e) => setRentalAddress(e.target.value)} />
            </div>
            <label className="flex items-center gap-2.5 font-ui text-[14px] text-soot">
              <input
                type="checkbox"
                checked={gotItemization}
                onChange={(e) => setGotItemization(e.target.checked)}
                className="h-4 w-4 accent-seal"
              />
              I received an itemized list of deductions
            </label>
            {gotItemization && (
              <div>
                <label className="field-label" htmlFor="lb-dispute">Why the deductions are wrong (optional)</label>
                <textarea
                  id="lb-dispute"
                  rows={3}
                  className="field"
                  placeholder="e.g. The $400 'repainting' charge is normal wear and tear after a 3-year tenancy; the carpet was 10 years old…"
                  value={disputeText}
                  onChange={(e) => setDisputeText(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="doc-card mt-5 p-6">
          <div className="overline-label">Parties</div>
          <div className="mt-4 grid gap-4">
            <div>
              <label className="field-label" htmlFor="lb-name">Your full name</label>
              <input id="lb-name" className="field" placeholder="Jordan Blair" value={tenantName} onChange={(e) => setTenantName(e.target.value)} />
            </div>
            <div>
              <label className="field-label" htmlFor="lb-addr">Your current mailing address</label>
              <textarea id="lb-addr" rows={2} className="field" placeholder={"88 New Home Ln\nDallas, TX 75201"} value={tenantAddress} onChange={(e) => setTenantAddress(e.target.value)} />
            </div>
            <div>
              <label className="field-label" htmlFor="lb-llname">Landlord / property manager</label>
              <input id="lb-llname" className="field" placeholder="Bluebonnet Property Group LLC" value={landlordName} onChange={(e) => setLandlordName(e.target.value)} />
            </div>
            <div>
              <label className="field-label" htmlFor="lb-lladdr">Their mailing address</label>
              <textarea id="lb-lladdr" rows={2} className="field" placeholder={"PO Box 100\nAustin, TX 78701"} value={landlordAddress} onChange={(e) => setLandlordAddress(e.target.value)} />
            </div>
          </div>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-soot/80">
          Everything stays in your browser — nothing you type is sent to a server or
          stored anywhere. This is a self-help template, not legal advice.
        </p>
      </div>

      {/* ── Preview ──────────────────────────────────────────────────────── */}
      <div>
        <div className="print-hide mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="overline-label">Your letter</div>
          <div className="flex gap-2">
            <button
              onClick={copyLetter}
              disabled={!ready}
              className="btn-outline !px-4 !py-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? "Copied ✓" : "Copy text"}
            </button>
            <button
              onClick={() => window.print()}
              disabled={!ready}
              className="btn-primary !px-4 !py-2 text-[12px] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Print / save PDF
            </button>
          </div>
        </div>

        {ready && computed ? (
          <div className="relative">
            {computed.overdueDays > 0 && (
              <Stamp className="print-hide absolute -top-3 right-6 z-10 text-base">
                {computed.overdueDays} days past due
              </Stamp>
            )}
            <div className="letter-paper whitespace-pre-wrap">{letter}</div>
          </div>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center rounded-[2px] border-2 border-dashed border-ink/25 bg-cream/50 p-10 text-center">
            <p className="max-w-xs font-ui text-[15px] text-soot/70">
              Pick your <strong>state</strong>, <strong>move-out date</strong>, and{" "}
              <strong>deposit amount</strong> — your letter will assemble itself here,
              statute and all.
            </p>
          </div>
        )}

        {ready && (
          <div className="print-hide doc-card mt-6 p-5">
            <div className="overline-label">Before you mail it</div>
            <ul className="mt-3 space-y-2 text-[14.5px] leading-relaxed text-soot">
              <li className="flex gap-2.5"><span className="font-black text-seal">1.</span> Print two copies — one to send, one for your records.</li>
              <li className="flex gap-2.5"><span className="font-black text-seal">2.</span> Send it certified mail, return receipt requested (~$5 at any post office). The green card is your evidence.</li>
              <li className="flex gap-2.5"><span className="font-black text-seal">3.</span> Calendar the 10-day response date. If it passes: <Link href="/kit" className="font-semibold text-seal underline">the escalation kit</Link> takes it from here.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
