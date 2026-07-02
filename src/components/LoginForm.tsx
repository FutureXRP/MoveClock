"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isSupabaseConfigured()) {
    return (
      <div className="card mx-auto max-w-md p-8 text-center">
        <h1 className="text-xl font-bold text-white">Accounts aren&apos;t enabled yet</h1>
        <p className="mt-3 text-sm text-slate-400">
          This deployment hasn&apos;t been connected to Supabase, so cloud sync and email
          alerts are off. The tracker still works —{" "}
          <Link href="/dashboard" className="text-emerald-400 underline">
            everything saves to your browser
          </Link>
          .
        </p>
        <p className="mt-3 text-xs text-slate-500">
          (Site owner: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY —
          see the README.)
        </p>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const sb = getSupabase()!;
    const { error } = await sb.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  if (sent) {
    return (
      <div className="card mx-auto max-w-md p-8 text-center">
        <div className="text-3xl">📬</div>
        <h1 className="mt-3 text-xl font-bold text-white">Check your email</h1>
        <p className="mt-2 text-sm text-slate-400">
          We sent a magic sign-in link to <span className="text-slate-200">{email}</span>.
          Click it and you&apos;ll land on your dashboard, synced.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold text-white">Sign in to SubSentry</h1>
      <p className="mt-2 text-sm text-slate-400">
        No password needed — we email you a magic link. Subscriptions already tracked in
        this browser are imported automatically.
      </p>
      <label className="mt-6 block text-sm font-medium text-slate-300" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        className="input mt-2"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary mt-5 w-full">
        {busy ? "Sending…" : "Email me a magic link"}
      </button>
    </form>
  );
}
