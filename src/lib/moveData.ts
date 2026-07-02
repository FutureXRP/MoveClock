/**
 * New-resident deadlines for all 50 states + DC.
 *
 * Compiled from state DMV/DOT guidance and statutes. Deadlines reflect the
 * standard case for a new permanent resident; triggers vary slightly by state
 * (establishing residency, taking a job, signing a lease). Every page that
 * renders this data also shows LAST_REVIEWED and a verify-with-the-DMV
 * disclaimer — agencies change these rules.
 *
 * licenseDays / vehicleDays of 0 mean "immediately upon establishing
 * residency" (no statutory grace period).
 */

export const LAST_REVIEWED = "July 2026";

export interface StateMove {
  slug: string;
  name: string;
  abbr: string;
  /** What the state calls its licensing agency. */
  agency: string;
  /** Official new-resident / licensing page (verified or agency homepage). */
  licenseUrl?: string;
  /** Separate vehicle agency page when licensing and titling are split. */
  vehicleUrl?: string;
  /** Days to convert your driver's license after establishing residency. */
  licenseDays: number;
  licenseNote?: string;
  /** Days to register/title your vehicle after establishing residency. */
  vehicleDays: number;
  vehicleNote?: string;
  /** True if the state has no wage income tax. */
  noIncomeTax?: boolean;
  /** Periodic vehicle safety/emissions inspection note, when notable. */
  inspection?: string;
  /** Things to handle when LEAVING this state. */
  exitNotes?: string[];
  /** Destination-side notes: quirks, gotchas, tips. */
  notes?: string[];
}

export const STATES: StateMove[] = [
  {
    slug: "alabama", name: "Alabama", abbr: "AL", agency: "ALEA / DMV",
    licenseUrl: "https://www.alea.gov/dps/driver-license",
    licenseDays: 30, vehicleDays: 30,
    notes: ["Registration is handled at your county's license plate issuing office, not a state DMV branch."],
  },
  {
    slug: "alaska", name: "Alaska", abbr: "AK", agency: "DMV",
    licenseUrl: "https://doa.alaska.gov/dmv/",
    licenseDays: 90, vehicleDays: 10,
    vehicleNote: "10 days for a vehicle you bring into the state.",
    noIncomeTax: true,
    notes: ["No state income tax — and the Permanent Fund Dividend requires a full calendar year of residency before you qualify."],
  },
  {
    slug: "arizona", name: "Arizona", abbr: "AZ", agency: "MVD",
    licenseUrl: "https://azdot.gov/mvd",
    licenseDays: 0, vehicleDays: 0,
    licenseNote: "Arizona has no grace period — the license requirement attaches as soon as you establish residency (take a job, register to vote, or live there 7+ months).",
    vehicleNote: "Registration is due immediately once you're a resident.",
    inspection: "Emissions testing required in the Phoenix and Tucson metro areas.",
    notes: ["Arizona licenses don't expire until age 65 — you'll do this once."],
  },
  {
    slug: "arkansas", name: "Arkansas", abbr: "AR", agency: "OMV",
    licenseUrl: "https://mydmv.arkansas.gov/",
    licenseDays: 30, vehicleDays: 30,
    notes: ["You must assess your vehicle with the county assessor and show proof of personal property tax — a step new arrivals don't expect."],
  },
  {
    slug: "california", name: "California", abbr: "CA", agency: "DMV",
    licenseUrl: "https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/new-to-california/",
    licenseDays: 10, vehicleDays: 20,
    licenseNote: "One of the shortest windows in the country — 10 days.",
    vehicleNote: "Miss the 20-day window and you owe use tax plus penalties that stack with time.",
    inspection: "Smog check required for most vehicles at registration and every two years.",
    exitNotes: [
      "California pursues part-year and 'sticky' residency aggressively for income tax — document your move-out date, sever ties (license, voter registration), and keep records.",
      "Cancel your CA registration or file a Certificate of Non-Operation to stop the annual fee cycle.",
    ],
    notes: [
      "DMV appointments in metro areas book out weeks — book the appointment the day you arrive, even if it's for later.",
      "Bring proof of insurance from a CA-licensed insurer; out-of-state policies don't satisfy registration.",
    ],
  },
  {
    slug: "colorado", name: "Colorado", abbr: "CO", agency: "DMV",
    licenseUrl: "https://dmv.colorado.gov/",
    licenseDays: 30, vehicleDays: 90,
    inspection: "Emissions testing required in the Front Range (Denver/Boulder area).",
  },
  {
    slug: "connecticut", name: "Connecticut", abbr: "CT", agency: "DMV",
    licenseUrl: "https://portal.ct.gov/dmv",
    licenseDays: 30, vehicleDays: 60,
    inspection: "Emissions testing every two years for most vehicles.",
    exitNotes: ["Cancel your CT registration and return plates to stop property-tax assessment on the vehicle."],
    notes: ["Connecticut municipalities levy an annual property tax on vehicles — budget for it."],
  },
  {
    slug: "delaware", name: "Delaware", abbr: "DE", agency: "DMV",
    licenseUrl: "https://www.dmv.de.gov/",
    licenseDays: 60, vehicleDays: 60,
    inspection: "Safety inspection at registration (waived for newer vehicles).",
    notes: ["No sales tax — but Delaware charges a 4.25% document fee on the vehicle's value at titling."],
  },
  {
    slug: "district-of-columbia", name: "District of Columbia", abbr: "DC", agency: "DMV",
    licenseUrl: "https://dmv.dc.gov/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "DC inspection required before registration.",
    notes: ["Get your Residential Parking Permit at the same visit, or street parking tickets arrive fast."],
  },
  {
    slug: "florida", name: "Florida", abbr: "FL", agency: "FLHSMV",
    licenseUrl: "https://www.flhsmv.gov/new-resident/",
    licenseDays: 30, vehicleDays: 10,
    vehicleNote: "10 days after establishing residency (job, school enrollment, or 6+ months' presence).",
    noIncomeTax: true,
    notes: ["No state income tax. File for the homestead exemption by March 1 if you bought a home — it caps future assessment growth."],
  },
  {
    slug: "georgia", name: "Georgia", abbr: "GA", agency: "DDS / DOR",
    licenseUrl: "https://dds.georgia.gov/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "Emissions testing required in the 13-county metro Atlanta area.",
    notes: ["Georgia charges a one-time Title Ad Valorem Tax (~7% of value) instead of annual vehicle tax — expect it at titling."],
  },
  {
    slug: "hawaii", name: "Hawaii", abbr: "HI", agency: "County DMV",
    licenseUrl: "https://hidot.hawaii.gov/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "Annual safety inspection required.",
    notes: ["Everything is county-run — O'ahu, Maui, Kaua'i, and Hawai'i counties each have their own offices and processes."],
  },
  {
    slug: "idaho", name: "Idaho", abbr: "ID", agency: "DMV",
    licenseUrl: "https://itd.idaho.gov/",
    licenseDays: 90, vehicleDays: 90,
  },
  {
    slug: "illinois", name: "Illinois", abbr: "IL", agency: "Secretary of State",
    licenseUrl: "https://www.ilsos.gov/",
    licenseDays: 90, vehicleDays: 30,
    inspection: "Emissions testing in the Chicago and Metro-East (St. Louis) areas.",
    exitNotes: ["Cancel your I-PASS/tollway account or update the plate on it — tolls bill to the plate."],
  },
  {
    slug: "indiana", name: "Indiana", abbr: "IN", agency: "BMV",
    licenseUrl: "https://www.in.gov/bmv/",
    licenseDays: 60, vehicleDays: 60,
  },
  {
    slug: "iowa", name: "Iowa", abbr: "IA", agency: "DOT",
    licenseUrl: "https://iowadot.gov/",
    licenseDays: 30, vehicleDays: 30,
  },
  {
    slug: "kansas", name: "Kansas", abbr: "KS", agency: "DOR",
    licenseUrl: "https://www.ksrevenue.gov/",
    licenseDays: 90, vehicleDays: 90,
    notes: ["Vehicle property tax is collected with registration at the county treasurer."],
  },
  {
    slug: "kentucky", name: "Kentucky", abbr: "KY", agency: "KYTC / Circuit Clerk",
    licenseUrl: "https://drive.ky.gov/",
    licenseDays: 30, vehicleDays: 15,
    vehicleNote: "15 days — one of the shorter vehicle windows.",
    notes: ["Licenses are issued through the county Circuit Court Clerk, not a DMV branch."],
  },
  {
    slug: "louisiana", name: "Louisiana", abbr: "LA", agency: "OMV",
    licenseUrl: "https://www.expresslane.org/",
    licenseDays: 30, vehicleDays: 30,
  },
  {
    slug: "maine", name: "Maine", abbr: "ME", agency: "BMV",
    licenseUrl: "https://www.maine.gov/sos/bmv/driver-licenses-and-ids/i-moved-to-from-a-different-state",
    licenseDays: 30, vehicleDays: 30,
    inspection: "Annual safety inspection required.",
    notes: ["Register the vehicle with your town office first (excise tax), then the BMV — two stops."],
  },
  {
    slug: "maryland", name: "Maryland", abbr: "MD", agency: "MVA",
    licenseUrl: "https://mva.maryland.gov/",
    licenseDays: 60, vehicleDays: 60,
    inspection: "One-time safety inspection required when titling an out-of-state vehicle.",
  },
  {
    slug: "massachusetts", name: "Massachusetts", abbr: "MA", agency: "RMV",
    licenseUrl: "https://www.mass.gov/orgs/massachusetts-registry-of-motor-vehicles",
    licenseDays: 0, vehicleDays: 0,
    licenseNote: "Massachusetts has no statutory grace period — convert your license as soon as you establish residency.",
    vehicleNote: "Register immediately; insurance must come from a MA-licensed agent first.",
    inspection: "Annual safety + emissions inspection within 7 days of registering.",
    notes: ["Sequence matters: MA insurance → RMV registration → inspection within 7 days. Book the insurance agent before anything else."],
  },
  {
    slug: "michigan", name: "Michigan", abbr: "MI", agency: "SOS",
    licenseUrl: "https://www.michigan.gov/sos",
    licenseDays: 0, vehicleDays: 0,
    licenseNote: "Michigan expects conversion immediately upon establishing residency.",
    notes: ["Michigan no-fault insurance works differently than most states — talk to an agent before you register."],
  },
  {
    slug: "minnesota", name: "Minnesota", abbr: "MN", agency: "DVS",
    licenseUrl: "https://dps.mn.gov/divisions/dvs",
    licenseDays: 60, vehicleDays: 60,
  },
  {
    slug: "mississippi", name: "Mississippi", abbr: "MS", agency: "DPS / DOR",
    licenseUrl: "https://www.dps.ms.gov/",
    licenseDays: 60, vehicleDays: 30,
  },
  {
    slug: "missouri", name: "Missouri", abbr: "MO", agency: "DOR",
    licenseUrl: "https://dor.mo.gov/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "Safety inspection for vehicles over 10 years old; emissions in the St. Louis area.",
    notes: ["Annual personal property tax on vehicles is billed by your county each December — new arrivals get surprised."],
  },
  {
    slug: "montana", name: "Montana", abbr: "MT", agency: "MVD",
    licenseUrl: "https://dojmt.gov/",
    licenseDays: 60, vehicleDays: 60,
    notes: ["No general sales tax; registration on older vehicles can be made permanent — one and done."],
  },
  {
    slug: "nebraska", name: "Nebraska", abbr: "NE", agency: "DMV",
    licenseUrl: "https://dmv.nebraska.gov/",
    licenseDays: 30, vehicleDays: 30,
  },
  {
    slug: "nevada", name: "Nevada", abbr: "NV", agency: "DMV",
    licenseUrl: "https://dmv.nv.gov/",
    licenseDays: 30, vehicleDays: 30,
    noIncomeTax: true,
    inspection: "Emissions testing in the Las Vegas and Reno metro areas.",
    notes: ["No state income tax. Registration fees are value-based and higher than most neighbors — budget for it."],
  },
  {
    slug: "new-hampshire", name: "New Hampshire", abbr: "NH", agency: "DMV",
    licenseUrl: "https://www.dmv.nh.gov/",
    licenseDays: 60, vehicleDays: 60,
    noIncomeTax: true,
    inspection: "Annual safety inspection required.",
    notes: ["No wage income tax and no sales tax. Registration is town hall first, then DMV."],
  },
  {
    slug: "new-jersey", name: "New Jersey", abbr: "NJ", agency: "MVC",
    licenseUrl: "https://www.nj.gov/mvc/",
    licenseDays: 60, vehicleDays: 60,
    exitNotes: ["Return your plates to the MVC when you leave — unreturned plates keep insurance obligations alive."],
  },
  {
    slug: "new-mexico", name: "New Mexico", abbr: "NM", agency: "MVD",
    licenseUrl: "https://www.mvd.newmexico.gov/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "Emissions testing in Bernalillo County (Albuquerque).",
  },
  {
    slug: "new-york", name: "New York", abbr: "NY", agency: "DMV",
    licenseUrl: "https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license",
    licenseDays: 30, vehicleDays: 30,
    inspection: "Annual safety inspection; emissions in most counties.",
    exitNotes: [
      "New York pursues residency audits for income tax — keep evidence of your move (lease end, utility stops, moving receipts).",
      "Surrender your NY plates to the DMV when you leave, or registration obligations continue.",
    ],
    notes: ["NYC residents: parking a car with out-of-state plates over 90 days can draw fines — the city enforces it."],
  },
  {
    slug: "north-carolina", name: "North Carolina", abbr: "NC", agency: "DMV",
    licenseUrl: "https://www.ncdot.gov/dmv/",
    licenseDays: 60, vehicleDays: 30,
    inspection: "Annual safety inspection (emissions in larger counties), tied to registration renewal.",
    notes: ["Vehicle property tax is billed together with registration ('Tag & Tax') — one combined annual bill."],
  },
  {
    slug: "north-dakota", name: "North Dakota", abbr: "ND", agency: "DOT",
    licenseUrl: "https://www.dot.nd.gov/",
    licenseDays: 60, vehicleDays: 60,
  },
  {
    slug: "ohio", name: "Ohio", abbr: "OH", agency: "BMV",
    licenseUrl: "https://bmv.ohio.gov/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "E-Check emissions testing in the Cleveland/Akron area.",
  },
  {
    slug: "oklahoma", name: "Oklahoma", abbr: "OK", agency: "Service Oklahoma",
    licenseUrl: "https://oklahoma.gov/service.html",
    licenseDays: 30, vehicleDays: 30,
  },
  {
    slug: "oregon", name: "Oregon", abbr: "OR", agency: "DMV",
    licenseUrl: "https://www.oregon.gov/odot/dmv/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "DEQ emissions testing in the Portland and Medford areas.",
    notes: ["No sales tax — but Oregon income tax starts near the first dollar earned."],
  },
  {
    slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", agency: "PennDOT",
    licenseUrl: "https://www.dmv.pa.gov/",
    licenseDays: 60, vehicleDays: 20,
    vehicleNote: "Title and registration are due within 20 days — much shorter than the license window.",
    inspection: "Annual safety inspection; emissions in most populous counties.",
  },
  {
    slug: "rhode-island", name: "Rhode Island", abbr: "RI", agency: "DMV",
    licenseUrl: "https://dmv.ri.gov/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "Safety + emissions inspection every two years.",
  },
  {
    slug: "south-carolina", name: "South Carolina", abbr: "SC", agency: "DMV",
    licenseUrl: "https://scdmvonline.com/",
    licenseDays: 45, vehicleDays: 45,
    notes: ["Pay county property tax on the vehicle first — the DMV requires the paid receipt to register."],
  },
  {
    slug: "south-dakota", name: "South Dakota", abbr: "SD", agency: "DPS / DOR",
    licenseUrl: "https://dps.sd.gov/",
    licenseDays: 90, vehicleDays: 90,
    noIncomeTax: true,
    notes: ["No state income tax; famously light residency requirements (popular with full-time RVers)."],
  },
  {
    slug: "tennessee", name: "Tennessee", abbr: "TN", agency: "DOS / County Clerk",
    licenseUrl: "https://www.tn.gov/safety/driver-services/classd/dlnew.html",
    licenseDays: 30, vehicleDays: 30,
    noIncomeTax: true,
    inspection: "Emissions testing was discontinued statewide in 2022 — none required.",
    notes: ["No state income tax. Registration runs through your county clerk."],
  },
  {
    slug: "texas", name: "Texas", abbr: "TX", agency: "DPS / DMV",
    licenseUrl: "https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids",
    vehicleUrl: "https://www.txdmv.gov/motorists/new-to-texas",
    licenseDays: 90, vehicleDays: 30,
    licenseNote: "90 days for the license — but don't confuse it with the vehicle clock.",
    vehicleNote: "30 days for vehicle registration — a separate, shorter deadline than the license.",
    noIncomeTax: true,
    inspection: "Annual safety inspection ended in 2025; emissions testing continues in major metro counties.",
    exitNotes: ["Toll tags (TxTag/EZ TAG/NTTA) bill by plate — close or update accounts when you leave."],
    notes: ["No state income tax. Vehicle registration requires a Texas insurance card and a VIN inspection at a certified station."],
  },
  {
    slug: "utah", name: "Utah", abbr: "UT", agency: "DMV / DLD",
    licenseUrl: "https://dmv.utah.gov/",
    licenseDays: 60, vehicleDays: 60,
    inspection: "Emissions testing in the Wasatch Front counties.",
  },
  {
    slug: "vermont", name: "Vermont", abbr: "VT", agency: "DMV",
    licenseUrl: "https://dmv.vermont.gov/",
    licenseDays: 60, vehicleDays: 60,
    inspection: "Annual safety inspection required.",
  },
  {
    slug: "virginia", name: "Virginia", abbr: "VA", agency: "DMV",
    licenseUrl: "https://www.dmv.virginia.gov/moving",
    licenseDays: 60, vehicleDays: 30,
    inspection: "Annual safety inspection; emissions in Northern Virginia.",
    exitNotes: ["Cancel your VA registration to stop the county's annual personal property tax billing."],
    notes: ["Virginia localities charge an annual personal property tax on vehicles — the 'car tax' is real and billed by your city or county."],
  },
  {
    slug: "washington", name: "Washington", abbr: "WA", agency: "DOL",
    licenseUrl: "https://dol.wa.gov/moving-washington",
    licenseDays: 30, vehicleDays: 30,
    noIncomeTax: true,
    exitNotes: ["Good news leaving: no income tax paperwork to unwind."],
    notes: ["No wage income tax. Seattle-area registration includes RTA transit tax based on vehicle value — can be hundreds per year."],
  },
  {
    slug: "west-virginia", name: "West Virginia", abbr: "WV", agency: "DMV",
    licenseUrl: "https://transportation.wv.gov/DMV/",
    licenseDays: 30, vehicleDays: 30,
    inspection: "Annual safety inspection required.",
  },
  {
    slug: "wisconsin", name: "Wisconsin", abbr: "WI", agency: "DMV",
    licenseUrl: "https://wisconsindot.gov/",
    licenseDays: 60, vehicleDays: 0,
    vehicleNote: "Register promptly upon establishing residency — Wisconsin expects it immediately for a vehicle kept in-state.",
  },
  {
    slug: "wyoming", name: "Wyoming", abbr: "WY", agency: "WYDOT / County",
    licenseUrl: "https://www.dot.state.wy.us/",
    licenseDays: 90, vehicleDays: 30,
    vehicleNote: "Register within 30 days at your county treasurer.",
    noIncomeTax: true,
    notes: ["No state income tax; registration is county-run."],
  },
];

export function getStateMove(slug: string): StateMove | undefined {
  return STATES.find((s) => s.slug === slug);
}

/** The most-moved-between states — prebuilt at deploy time for SEO. */
export const TOP_STATES = [
  "california", "texas", "florida", "new-york", "washington", "arizona",
  "colorado", "north-carolina", "georgia", "tennessee", "illinois",
  "pennsylvania", "ohio", "virginia", "massachusetts", "new-jersey",
];

export function licenseLabel(s: StateMove): string {
  return s.licenseDays === 0 ? "Immediately" : `${s.licenseDays} days`;
}

export function vehicleLabel(s: StateMove): string {
  return s.vehicleDays === 0 ? "Immediately" : `${s.vehicleDays} days`;
}
