import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/LegalPage";
import { CONTACT_EMAIL, EFFECTIVE_DATE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "MoveClock's terms of use: free general information, not legal advice; verify deadlines with your state's agency.",
};

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms of Use"
      intro={`Effective ${EFFECTIVE_DATE}. By using ${SITE_NAME}, you agree to these terms.`}
    >
      <Section title="1. What MoveClock is (and isn't)">
        <p>
          {SITE_NAME} provides general information about new-resident requirements —
          deadlines, agencies, and practical guidance — compiled from state statutes and
          official agency guidance, plus self-help tools (a countdown planner, checklist,
          and calendar export). It is <strong className="text-ink">not legal, tax,
          insurance, or financial advice</strong>, and using the site does not create any
          professional relationship. Deadlines and requirements vary with individual
          circumstances and change when legislatures and agencies act; always confirm
          current requirements with the relevant state agency before relying on a date.
        </p>
      </Section>
      <Section title="2. No warranty">
        <p>
          The site and its content are provided &ldquo;as is&rdquo; and &ldquo;as
          available,&rdquo; without warranties of any kind, express or implied —
          including accuracy, completeness, fitness for a particular purpose, and
          non-infringement. We work to keep the data current (each page shows its last
          review date), but we cannot guarantee it reflects the latest change in every
          jurisdiction.
        </p>
      </Section>
      <Section title="3. Limitation of liability">
        <p>
          To the maximum extent permitted by law, {SITE_NAME} and its operators are not
          liable for any indirect, incidental, consequential, special, or punitive
          damages — or for citations, fees, penalties, or losses of any kind — arising
          from use of the site or reliance on its content. Your sole remedy for
          dissatisfaction with the site is to stop using it.
        </p>
      </Section>
      <Section title="4. Sponsored links and third parties">
        <p>
          The site contains clearly labeled sponsored and affiliate links and links to
          third-party and government websites. We may earn commissions from labeled
          partner links (see our{" "}
          <Link href="/disclosure" className="font-semibold text-sign underline underline-offset-2">
            disclosure
          </Link>
          ). Third-party sites are governed by their own terms and policies; we are not
          responsible for their content, products, or services, and a link is not an
          endorsement of everything a partner does.
        </p>
      </Section>
      <Section title="5. Acceptable use">
        <p>
          You may use the site for personal, non-commercial purposes and share links to
          it freely. You may not scrape, republish, or resell the compiled dataset at
          scale, misrepresent the site&apos;s content as your own, interfere with the
          site&apos;s operation, or use it for unlawful purposes.
        </p>
      </Section>
      <Section title="6. Intellectual property">
        <p>
          The site&apos;s design, text, and compiled dataset are the property of{" "}
          {SITE_NAME}. Statutes and government information are public; our selection,
          arrangement, and presentation of them are not.
        </p>
      </Section>
      <Section title="7. Changes">
        <p>
          We may update the site and these terms at any time; the effective date above
          reflects the latest version. Continued use after changes means you accept
          them.
        </p>
      </Section>
      <Section title="8. Contact">
        <p>
          Questions about these terms:{" "}
          <a className="font-semibold text-sign underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </Section>
    </LegalPage>
  );
}
