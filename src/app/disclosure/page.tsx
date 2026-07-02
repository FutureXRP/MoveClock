import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/LegalPage";
import { CONTACT_EMAIL, EFFECTIVE_DATE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate & Advertising Disclosure",
  description:
    "How MoveClock makes money: clearly labeled sponsored and affiliate links, with no influence over the information.",
};

export default function DisclosurePage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Affiliate & Advertising Disclosure"
      intro={`Effective ${EFFECTIVE_DATE}. Plain-English version of how ${SITE_NAME} is funded.`}
    >
      <Section title="The deal">
        <p>
          {SITE_NAME} is free to use — the deadlines, the countdown, the calendar
          export, all of it. To keep it free, the site includes a small number of
          sponsored placements and affiliate links in categories relevant to moving:
          moving companies, car insurance, auto transport, and similar services. If you
          click one of these links and get a quote or make a purchase,{" "}
          <strong className="text-ink">we may earn a commission at no additional cost
          to you</strong>. This is the disclosure required by the FTC&apos;s endorsement
          guides (16 CFR Part 255), and it applies site-wide.
        </p>
      </Section>
      <Section title="How you can tell">
        <p>
          Every sponsored or affiliate link is labeled — with an &ldquo;Ad&rdquo; badge
          on link chips, or a &ldquo;sponsored&rdquo; note on link cards. Links to
          official government resources (DMVs, USPS, IRS, vote.gov) are never sponsored
          and never earn us anything.
        </p>
      </Section>
      <Section title="What sponsors can't buy">
        <p>
          Sponsors and affiliate partners have no influence over the deadlines,
          requirements, or guidance on this site. The state data comes from statutes and
          agency guidance, and it would read the same with no sponsors at all. We do not
          accept payment to alter, omit, or slant information.
        </p>
      </Section>
      <Section title="Questions">
        <p>
          Ask us anything about how this works:{" "}
          <a className="font-semibold text-sign underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          Interested in a placement? See the{" "}
          <Link href="/partners" className="font-semibold text-sign underline underline-offset-2">
            partners page
          </Link>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
