import type { StateMove } from "./moveData";
import { addDays, toICSDate } from "./dates";

export interface TimelineItem {
  key: string;
  /** Days after arrival this is due; 0 = on arrival. */
  dueDays: number;
  title: string;
  detail: string;
  /** Legal deadline vs. good-practice housekeeping. */
  kind: "legal" | "smart";
}

/** Build the destination to-do timeline (undated; day offsets from arrival). */
export function buildTimeline(to: StateMove): TimelineItem[] {
  const items: TimelineItem[] = [];

  items.push({
    key: "insurance",
    dueDays: 0,
    title: "Switch your car insurance to a " + to.name + " policy",
    detail:
      "Do this first — registration requires in-state insurance in most states, and a stale garaging address can complicate claims. One phone call.",
    kind: "legal",
  });

  items.push({
    key: "license",
    dueDays: to.licenseDays,
    title: `Convert your driver's license at the ${to.agency}`,
    detail:
      (to.licenseNote ??
        `${to.name} gives new residents ${to.licenseDays} days after establishing residency.`) +
      " Driving past the deadline on an out-of-state license is citable. Bring two proofs of address and ask for the REAL ID version while you're there.",
    kind: "legal",
  });

  items.push({
    key: "vehicle",
    dueDays: to.vehicleDays,
    title: `Title & register your vehicle in ${to.name}`,
    detail:
      (to.vehicleNote ??
        `Due within ${to.vehicleDays === 0 ? "days of arriving" : `${to.vehicleDays} days`}.`) +
      (to.inspection ? ` Inspection: ${to.inspection}` : ""),
    kind: "legal",
  });

  items.push({
    key: "voter",
    dueDays: Math.max(to.licenseDays, 7),
    title: "Register to vote (say yes at the license counter)",
    detail:
      "Motor-voter registration happens during your license visit if you ask. Your old state's registration doesn't move with you.",
    kind: "legal",
  });

  items.push({
    key: "housekeeping",
    dueDays: 14,
    title: "Update the boring-but-binding addresses",
    detail:
      "IRS Form 8822, your bank, employer payroll (state withholding changes!), health insurance, and USPS forwarding if you haven't. Payroll matters most — wrong-state withholding is a tax-season headache.",
    kind: "smart",
  });

  items.push({
    key: "taxes",
    dueDays: 30,
    title: "Note your part-year tax situation",
    detail: to.noIncomeTax
      ? `${to.name} has no state income tax — but you'll still file a part-year return in the state you left for the months you lived there.`
      : `You'll file part-year returns in both states next spring. Keep a record of your exact move date — it splits your income between them.`,
    kind: "smart",
  });

  return items.sort((a, b) => a.dueDays - b.dueDays);
}

/** Generate an .ics calendar for a dated move. */
export function buildICS(to: StateMove, arrivalISO: string, items: TimelineItem[]): string {
  const stamp = toICSDate(new Date()) + "T000000Z";
  const events = items
    .map((item) => {
      const due = addDays(arrivalISO, item.dueDays);
      const end = addDays(arrivalISO, item.dueDays + 1);
      return [
        "BEGIN:VEVENT",
        `UID:moveclock-${item.key}-${toICSDate(due)}@moveclock`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${toICSDate(due)}`,
        `DTEND;VALUE=DATE:${toICSDate(end)}`,
        `SUMMARY:${icsEscape(`MoveClock: ${item.title}`)}`,
        `DESCRIPTION:${icsEscape(item.detail)}`,
        "BEGIN:VALARM",
        "TRIGGER:-P3D",
        "ACTION:DISPLAY",
        `DESCRIPTION:${icsEscape(`Due in 3 days: ${item.title}`)}`,
        "END:VALARM",
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MoveClock//New Resident Deadlines//EN",
    "CALSCALE:GREGORIAN",
    events,
    "END:VCALENDAR",
  ].join("\r\n");
}

function icsEscape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}
