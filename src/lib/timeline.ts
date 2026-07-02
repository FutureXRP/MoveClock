import type { StateMove } from "./moveData";
import { addDays, toICSDate } from "./dates";

export interface TimelineLink {
  label: string;
  url: string;
  /** Affiliate/sponsored links are labeled as such in the UI. */
  sponsored?: boolean;
}

export interface TimelineItem {
  key: string;
  /** Days after arrival this is due; 0 = on arrival. */
  dueDays: number;
  title: string;
  detail: string;
  /** Legal deadline vs. good-practice housekeeping. */
  kind: "legal" | "smart";
  links: TimelineLink[];
}

const FEDERAL = {
  vote: { label: "Register at vote.gov", url: "https://vote.gov/" },
  usps: { label: "USPS mail forwarding", url: "https://www.usps.com/manage/forward.htm" },
  irs: { label: "IRS Form 8822 (change of address)", url: "https://www.irs.gov/forms-pubs/about-form-8822" },
};

import { AFFILIATES } from "./affiliates";

/** Build the destination to-do timeline (undated; day offsets from arrival). */
export function buildTimeline(to: StateMove): TimelineItem[] {
  const items: TimelineItem[] = [];

  items.push({
    key: "movers",
    dueDays: -28,
    title: "Book your interstate movers (or the truck)",
    detail:
      "Good crews for state-to-state moves book out 4–6 weeks in summer. Get three quotes — interstate movers must be FMCSA-licensed, and the lowball unlicensed quote is how hostage-load scams start. Moving yourself? One-way trucks sell out too.",
    kind: "smart",
    links: [
      { label: "Compare mover quotes", url: AFFILIATES.movers.url, sponsored: true },
      { label: "Verify a mover's license (FMCSA)", url: "https://www.fmcsa.dot.gov/protect-your-move" },
    ],
  });

  items.push({
    key: "documents",
    dueDays: -10,
    title: "Stage your DMV paperwork before you pack it",
    detail:
      "The classic mistake: your passport, Social Security card, vehicle title, and birth certificate end up sealed in a box on a truck. Pull them into a folder that rides with you — plus two documents that can prove your new address (lease, utility setup, bank statement). You'll need them for the REAL ID version of your new license.",
    kind: "smart",
    links: [{ label: "REAL ID requirements (DHS)", url: "https://www.dhs.gov/real-id" }],
  });

  items.push({
    key: "utilities",
    dueDays: -14,
    title: "Set up internet & utilities at the new place",
    detail:
      "Internet installs commonly book 1–2 weeks out — schedule it now so you're not working from a parking lot on day three. Electric, gas, and water usually need a start-date call too; some utilities want a deposit from new-to-state customers.",
    kind: "smart",
    links: [
      { label: "Check providers at your new address", url: AFFILIATES.internet.url, sponsored: true },
    ],
  });

  items.push({
    key: "mail-forward",
    dueDays: -7,
    title: "Start USPS mail forwarding",
    detail:
      "File it about a week before the truck comes so nothing lands at the old place after you leave. $1.10 online, takes five minutes, and it's your safety net for every account you forget to update.",
    kind: "smart",
    links: [FEDERAL.usps],
  });

  const insuranceLinks: TimelineLink[] = [
    { label: `Compare ${to.name} rates`, url: AFFILIATES.insurance.url, sponsored: true },
  ];
  items.push({
    key: "insurance",
    dueDays: 0,
    title: "Switch your car insurance to a " + to.name + " policy",
    detail:
      "Do this first — registration requires in-state insurance in most states, and a stale garaging address can complicate claims. One phone call.",
    kind: "legal",
    links: insuranceLinks,
  });

  const licenseLinks: TimelineLink[] = [];
  if (to.licenseUrl) {
    licenseLinks.push({ label: `Official ${to.agency} site`, url: to.licenseUrl });
  }
  items.push({
    key: "license",
    dueDays: to.licenseDays,
    title: `Convert your driver's license at the ${to.agency}`,
    detail:
      (to.licenseNote ??
        `${to.name} gives new residents ${to.licenseDays} days after establishing residency.`) +
      " Driving past the deadline on an out-of-state license is citable. Bring two proofs of address and ask for the REAL ID version while you're there.",
    kind: "legal",
    links: licenseLinks,
  });

  const vehicleLinks: TimelineLink[] = [];
  const vehUrl = to.vehicleUrl ?? to.licenseUrl;
  if (vehUrl) {
    vehicleLinks.push({
      label: to.vehicleUrl ? "Official registration guide" : `Official ${to.agency} site`,
      url: vehUrl,
    });
  }
  vehicleLinks.push({
    label: "Shipping a car instead? Get quotes",
    url: AFFILIATES.carship.url,
    sponsored: true,
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
    links: vehicleLinks,
  });

  items.push({
    key: "voter",
    dueDays: Math.max(to.licenseDays, 7),
    title: "Register to vote (say yes at the license counter)",
    detail:
      "Motor-voter registration happens during your license visit if you ask. Your old state's registration doesn't move with you.",
    kind: "legal",
    links: [FEDERAL.vote],
  });

  items.push({
    key: "housekeeping",
    dueDays: 14,
    title: "Update the boring-but-binding addresses",
    detail:
      "IRS Form 8822, your bank, employer payroll (state withholding changes!), and health insurance. Payroll matters most — wrong-state withholding is a tax-season headache.",
    kind: "smart",
    links: [FEDERAL.irs],
  });

  items.push({
    key: "taxes",
    dueDays: 30,
    title: "Note your part-year tax situation",
    detail: to.noIncomeTax
      ? `${to.name} has no state income tax — but you'll still file a part-year return in the state you left for the months you lived there.`
      : `You'll file part-year returns in both states next spring. Keep a record of your exact move date — it splits your income between them.`,
    kind: "smart",
    links: [],
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
      const official = item.links.find((l) => !l.sponsored);
      const lines = [
        "BEGIN:VEVENT",
        `UID:moveclock-${item.key}-${toICSDate(due)}@moveclock`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${toICSDate(due)}`,
        `DTEND;VALUE=DATE:${toICSDate(end)}`,
        `SUMMARY:${icsEscape(`MoveClock: ${item.title}`)}`,
        `DESCRIPTION:${icsEscape(item.detail + (official ? `\n${official.label}: ${official.url}` : ""))}`,
      ];
      if (official) lines.push(`URL:${official.url}`);
      lines.push(
        "BEGIN:VALARM",
        "TRIGGER:-P3D",
        "ACTION:DISPLAY",
        `DESCRIPTION:${icsEscape(`Due in 3 days: ${item.title}`)}`,
        "END:VALARM",
        "END:VEVENT"
      );
      return lines.join("\r\n");
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
