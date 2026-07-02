import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Verifies a Stripe Checkout session after a Payment Link purchase.
 * The Payment Link's confirmation redirect should point at:
 *   https://YOUR-DOMAIN/kit?session_id={CHECKOUT_SESSION_ID}
 * No database — possession of a paid session id unlocks the kit client-side.
 */
export async function GET(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ paid: false, error: "not_configured" }, { status: 501 });
  }
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
    return NextResponse.json({ paid: false, error: "bad_session" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { headers: { Authorization: `Bearer ${key}` } }
  );
  if (!res.ok) {
    return NextResponse.json({ paid: false, error: "stripe_error" }, { status: 502 });
  }
  const session = (await res.json()) as { payment_status?: string };
  return NextResponse.json({ paid: session.payment_status === "paid" });
}
