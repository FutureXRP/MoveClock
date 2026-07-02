import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

/**
 * Daily cron (see vercel.json): emails users a heads-up when a subscription
 * renews within the next 3 days. Idempotent per renewal — a sub is skipped if
 * it was reminded within the last 7 days.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.REMINDER_FROM_EMAIL || "SubSentry <onboarding@resend.dev>";

  if (!url || !serviceKey || !resendKey) {
    return NextResponse.json({
      ok: true,
      skipped: "reminders not configured (need SUPABASE_SERVICE_ROLE_KEY + RESEND_API_KEY)",
    });
  }

  const sb = createClient(url, serviceKey, { auth: { persistSession: false } });

  const today = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const horizon = new Date(today);
  horizon.setDate(horizon.getDate() + 3);
  const staleReminder = new Date(today);
  staleReminder.setDate(staleReminder.getDate() - 7);

  const { data: due, error } = await sb
    .from("subscriptions")
    .select("id,user_id,name,price,cycle,next_renewal,last_reminded_on")
    .eq("status", "active")
    .gte("next_renewal", iso(today))
    .lte("next_renewal", iso(horizon))
    .or(`last_reminded_on.is.null,last_reminded_on.lte.${iso(staleReminder)}`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!due || due.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 });
  }

  // group renewals per user
  const byUser = new Map<string, typeof due>();
  for (const sub of due) {
    const list = byUser.get(sub.user_id) ?? [];
    list.push(sub);
    byUser.set(sub.user_id, list);
  }

  const { data: profiles } = await sb
    .from("profiles")
    .select("id,email")
    .in("id", Array.from(byUser.keys()));
  const emails = new Map((profiles ?? []).map((p) => [p.id, p.email as string | null]));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://subsentry.vercel.app";
  let sent = 0;
  const remindedIds: string[] = [];

  for (const [userId, items] of Array.from(byUser.entries())) {
    const email = emails.get(userId);
    if (!email) continue;

    const lines = items
      .map(
        (s) =>
          `<li><strong>${escapeHtml(s.name)}</strong> — $${Number(s.price).toFixed(2)} renews on ${s.next_renewal}</li>`
      )
      .join("");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject:
          items.length === 1
            ? `${items[0].name} renews in the next 3 days`
            : `${items.length} subscriptions renew in the next 3 days`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto">
            <h2 style="color:#0f172a">Heads up — money is about to leave your account</h2>
            <ul style="line-height:1.8;color:#334155">${lines}</ul>
            <p style="color:#334155">Still using ${items.length === 1 ? "it" : "them"}? Ignore this email.
            If not, now is the moment to cancel:</p>
            <p><a href="${siteUrl}/dashboard" style="background:#10b981;color:#06251b;padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:600">Open my dashboard</a></p>
            <p style="color:#94a3b8;font-size:12px">You're getting this because renewal alerts are on in SubSentry.</p>
          </div>`,
      }),
    });

    if (res.ok) {
      sent++;
      remindedIds.push(...items.map((s) => s.id));
    }
  }

  if (remindedIds.length > 0) {
    await sb
      .from("subscriptions")
      .update({ last_reminded_on: iso(today) })
      .in("id", remindedIds);
  }

  return NextResponse.json({ ok: true, sent, subscriptions: remindedIds.length });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
