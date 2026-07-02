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

// NEXT_PUBLIC_ vars are inlined at build time on both server and client.
const AFF_INSURANCE = process.env.NEXT_PUBLIC_AFFILIATE_INSURANCE_URL;
const AFF_CARSHIP = process.env.NEXT_PUBLIC_AFFILIATE_CARSHIP_URL;

/** Build the destination to-do timeline (undated; day offsets from arrival). */
export function buildTimeline(to: StateMove): TimelineItem[] {
  const items: TimelineItem[] = [];

  const insuranceLinks: TimelineLink[] = [];
  if (AFF_INSURANCE) {
    insuranceLinks.push({
      label: `Compare ${to.name} rates`,
      url: AFF_INSURANCE,
      sponsored: true,
    });
  }
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
  if (AFF_CARSHIP) {
    vehicleLinks.push({
      label: "Shipping a car instead? Get quotes",
      url: AFF_CARSHIP,
      sponsored: true,
    });
  }
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
      "IRS Form 8822, your bank, employer payroll (state withholding changes!), health insurance, and USPS forwarding if you haven't. Payroll matters most — wrong-state withholding is a tax-season headache.",
    kind: "smart",
    links: [FEDERAL.usps, FEDERAL.irs],
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
