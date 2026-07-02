import type { TimelineItem } from "@/lib/timeline";
import { addDays, daysFromToday, fmtShortDate } from "@/lib/dates";

export function TimelineView({
  items,
  arrivalISO,
}: {
  items: TimelineItem[];
  arrivalISO?: string;
}) {
  return (
    <ol className="relative space-y-4 pl-[4.6rem]">
      <span className="center-line absolute bottom-2 left-7 top-2 w-1 rounded" aria-hidden="true" />
      {items.map((item) => {
        const due = arrivalISO ? addDays(arrivalISO, item.dueDays) : null;
        const remaining = due ? daysFromToday(due) : null;
        const overdue = remaining !== null && remaining < 0;
        return (
          <li key={item.key} className="relative">
            <span className="mile-marker absolute -left-[4.6rem] top-1">
              <span className="text-[9px] uppercase tracking-wider text-white/80">Day</span>
              <span className="text-lg">{item.dueDays}</span>
            </span>
            <div className={`card p-5 ${item.kind === "smart" ? "opacity-90" : ""}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-sign text-[17px] font-extrabold leading-snug">
                  {item.title}
                </h3>
                {due && (
                  <span
                    className={`font-mono text-[13px] font-bold ${
                      overdue ? "text-red-700" : "text-sign"
                    }`}
                  >
                    {fmtShortDate(due)}
                    {remaining !== null && (
                      <span
                        className={`ml-2 rounded px-1.5 py-0.5 text-[11px] uppercase tracking-wide text-white ${
                          overdue ? "bg-[#b3261e]" : "bg-sign"
                        } print:border print:border-ink print:bg-transparent print:text-ink`}
                      >
                        {overdue
                          ? `${Math.abs(remaining)} days overdue`
                          : remaining === 0
                            ? "today"
                            : `${remaining} days left`}
                      </span>
                    )}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-gravel">{item.detail}</p>
              {item.links.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {item.links.map((link) =>
                    link.sponsored ? (
                      <a
                        key={link.url + link.label}
                        href={link.url}
                        {...(link.url.startsWith("/")
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer sponsored" })}
                        className="inline-flex items-center gap-1.5 rounded-md bg-caution px-3 py-1.5 font-sign text-[12.5px] font-extrabold text-ink shadow-[inset_0_0_0_1.5px_rgba(22,33,27,0.7)] transition-transform hover:-translate-y-0.5 print:hidden"
                      >
                        {link.label} →
                        <span className="rounded-sm bg-ink/10 px-1 font-mono text-[9px] font-bold uppercase tracking-wider">
                          Ad
                        </span>
                      </a>
                    ) : (
                      <a
                        key={link.url + link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border-[1.5px] border-sign/50 bg-sign/5 px-3 py-1.5 font-sign text-[12.5px] font-extrabold text-sign transition hover:bg-sign hover:text-white"
                      >
                        {link.label} ↗
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
