import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/LegalPage";
import { LAST_REVIEWED } from "@/lib/moveData";

export const metadata: Metadata = {
  title: "About MoveClock",
  description:
    "Why MoveClock exists, how the state deadline data is compiled and reviewed, and how sponsorships are kept separate from the information.",
};

export default function AboutPage() {
  return (
    <LegalPage
      kicker="About"
      title="Why MoveClock exists"
      intro="Around 8 million Americans move between states every year — and almost nobody tells them that the destination state starts several legal clocks the day they arrive."
    >
      <Section title="The problem we solve">
        <p>
          Every state sets deadlines for new residents: converting a driver&apos;s
          license (from zero grace period in Arizona and Massachusetts to 90 days in
          Texas), registering a vehicle (usually a different, shorter window), updating
          insurance, and more. Miss them and the consequences are real — citations,
          stacked late fees, and insurance complications. The rules exist, but they&apos;re
          scattered across 51 agency websites, written for bureaucrats rather than
          people mid-move.
        </p>
        <p>
          MoveClock compiles them into one place and turns them into something usable: a
          dated, checkable countdown for your exact route and arrival date, exportable
          straight to your calendar. It&apos;s free, requires no account, and your plan
          never leaves your browser.
        </p>
      </Section>
      <Section title="How the data is compiled and maintained">
        <p>
          Deadlines and requirements are compiled from state statutes and official agency
          guidance (DMV, DOT, MVD, and equivalents), with each state&apos;s page linking
          to the official source. The full dataset was last reviewed in {LAST_REVIEWED},
          and every page displays that date. States amend these rules; when we find a
          change — or a reader reports one — we update the dataset and the review date.
        </p>
        <p>
          MoveClock is general information, not legal, tax, or insurance advice. Residency
          triggers vary with individual circumstances, so we always recommend confirming
          current requirements with the destination state&apos;s agency — and we link you
          directly to it.
        </p>
      </Section>
      <Section title="How the site makes money — and what sponsors can't touch">
        <p>
          MoveClock is supported by clearly labeled sponsored links and affiliate
          partnerships in categories movers actually use: moving companies, car
          insurance, auto transport. Sponsored links are always marked, and we may earn
          a commission when you use one — at no cost to you. Sponsors have no influence
          over the deadlines, guidance, or which states say what. The information would
          read exactly the same with no sponsors at all. Details on{" "}
          <Link href="/disclosure" className="font-semibold text-sign underline underline-offset-2">
            our disclosure page
          </Link>
          .
        </p>
      </Section>
      <Section title="Spotted an error?">
        <p>
          Deadline data is only useful if it&apos;s right. If a state has changed its
          rules or you believe something is off,{" "}
          <Link href="/contact" className="font-semibold text-sign underline underline-offset-2">
            tell us
          </Link>{" "}
          — corrections get priority over everything else.
        </p>
      </Section>
    </LegalPage>
  );
}
