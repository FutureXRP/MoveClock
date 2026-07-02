"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadPlan } from "@/lib/plan";

/** Nav CTA: becomes "My countdown" once the visitor has a saved plan. */
export function PlanLink() {
  const [href, setHref] = useState("/#plan");
  const [label, setLabel] = useState("Plan my move");

  useEffect(() => {
    const p = loadPlan();
    if (p?.from && p?.to) {
      setHref(`/moving/${p.from}/${p.to}#plan`);
      setLabel("My countdown");
    }
  }, []);

  return (
    <Link
      href={href}
      className="rounded-lg bg-caution px-4 py-2 text-ink shadow-[inset_0_0_0_2px_rgba(22,33,27,0.8)] transition-transform hover:-translate-y-0.5"
    >
      {label}
    </Link>
  );
}
