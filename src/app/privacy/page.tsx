import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/LegalPage";
import { CONTACT_EMAIL, EFFECTIVE_DATE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MoveClock's privacy policy: no accounts, no sale of personal data — your move plan and checklist live in your own browser.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy Policy"
      intro={`Effective ${EFFECTIVE_DATE}. The short version: ${SITE_NAME} has no accounts, doesn't ask for your name or email to use the tools, and your move plan lives in your own browser — not on our servers.`}
    >
      <Section title="Information you give us">
        <p>
          Using {SITE_NAME} requires no registration and no personal information. Your
          move plan (origin state, destination state, arrival date) and your checklist
          progress are stored in your browser&apos;s local storage on your own device.
          They are never transmitted to or stored on our servers, and clearing your
          browser data removes them. Calendar files and printed checklists are generated
          entirely on your device.
        </p>
        <p>
          If you email us, we receive your email address and message. We use them only
          to respond, and we don&apos;t add you to any list.
        </p>
      </Section>
      <Section title="Information collected automatically">
        <p>
          Our hosting provider (Vercel) records standard server logs — IP address,
          browser type, pages requested, and timestamps — for security and operations,
          retained per their policies. We may use privacy-respecting, aggregate
          analytics to understand which pages are useful (counts and totals, not
          profiles of individuals). We do not run cross-site tracking or advertising
          pixels, and we do not sell or share personal information as those terms are
          defined under laws like the CCPA.
        </p>
      </Section>
      <Section title="Sponsored and affiliate links">
        <p>
          Some links are sponsored or affiliate links, always labeled (look for the
          &ldquo;Ad&rdquo; tag or the sponsored note). If you click one, the partner and
          its network may set cookies on their own sites to attribute the referral, and
          we may earn a commission at no cost to you. What happens on a partner&apos;s
          site is governed by that partner&apos;s privacy policy — we don&apos;t receive
          personal information about you from them. See our{" "}
          <Link href="/disclosure" className="font-semibold text-sign underline underline-offset-2">
            full disclosure
          </Link>
          .
        </p>
      </Section>
      <Section title="Links to government sites">
        <p>
          We link to official state and federal agency websites (DMVs, USPS, IRS,
          vote.gov). Those sites have their own privacy practices; we&apos;re not
          responsible for them, but we only link to official sources.
        </p>
      </Section>
      <Section title="Children">
        <p>
          {SITE_NAME} is not directed at children under 13, and we do not knowingly
          collect personal information from them.
        </p>
      </Section>
      <Section title="Changes and contact">
        <p>
          If this policy changes, we&apos;ll update it here with a new effective date.
          Questions or requests: <a className="font-semibold text-sign underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </Section>
    </LegalPage>
  );
}
