import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Section } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with MoveClock — corrections, questions, and partnerships.",
};

export default function ContactPage() {
  return (
    <LegalPage
      kicker="Contact"
      title="Get in touch"
      intro="Real humans read this inbox. Corrections to state data get answered first."
    >
      <div className="sign-panel p-6 text-center sm:p-8">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-caution">
          Email us
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-2 block font-sign text-2xl font-black text-white underline decoration-caution underline-offset-4 sm:text-3xl"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-3 text-[14px] text-white/80">We aim to reply within 2 business days.</p>
      </div>
      <Section title="What to include">
        <p>
          <strong className="text-ink">Data corrections:</strong> the state, what the
          site says, what you believe is correct, and a link to the statute or agency
          page if you have one. These jump the queue.
        </p>
        <p>
          <strong className="text-ink">Questions about your move:</strong> we can point
          you at the right official resource, but we can&apos;t give legal, tax, or
          insurance advice for your specific situation.
        </p>
        <p>
          <strong className="text-ink">Partnerships and sponsorships:</strong> mention
          which placement interests you — details on the{" "}
          <Link href="/partners" className="font-semibold text-sign underline underline-offset-2">
            partners page
          </Link>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
