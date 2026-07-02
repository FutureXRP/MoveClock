/** Shared shell for About/Contact/legal pages. */
export function LegalPage({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="kicker">{kicker}</div>
      <h1 className="mt-3 font-sign text-4xl font-black leading-[1.08]">{title}</h1>
      {intro && <p className="mt-4 text-[17px] leading-relaxed text-gravel">{intro}</p>}
      <div className="legal-prose mt-8 space-y-6">{children}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-sign text-xl font-extrabold">{title}</h2>
      <div className="mt-2 space-y-3 text-[15.5px] leading-relaxed text-gravel">{children}</div>
    </section>
  );
}
