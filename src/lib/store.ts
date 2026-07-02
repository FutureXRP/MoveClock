"use client";

import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getSupabase } from "./supabase";
import { rollForward, type Subscription } from "./types";

const LOCAL_KEY = "subsentry.subscriptions.v1";

export interface NewSubscription {
  name: string;
  price: number;
  cycle: Subscription["cycle"];
  next_renewal: string | null;
  category: string | null;
  guide_slug: string | null;
}

// ── Local mode (no account) ───────────────────────────────────────────────────

export function loadLocal(): Subscription[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as Subscription[]) : [];
  } catch {
    return [];
  }
}

export function saveLocal(subs: Subscription[]) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(subs));
  } catch {
    // storage full/blocked — nothing sensible to do
  }
}

export function clearLocal() {
  try {
    window.localStorage.removeItem(LOCAL_KEY);
  } catch {
    // ignore
  }
}

export function makeLocalSub(input: NewSubscription): Subscription {
  return {
    id: crypto.randomUUID(),
    status: "active",
    created_at: new Date().toISOString(),
    ...input,
  };
}

// ── Cloud mode (Supabase) ─────────────────────────────────────────────────────

export async function fetchCloud(sb: SupabaseClient): Promise<Subscription[]> {
  const { data, error } = await sb
    .from("subscriptions")
    .select("id,name,price,cycle,next_renewal,category,status,guide_slug,created_at")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({ ...row, price: Number(row.price) })) as Subscription[];
}

export async function insertCloud(
  sb: SupabaseClient,
  userId: string,
  input: NewSubscription
): Promise<Subscription> {
  const { data, error } = await sb
    .from("subscriptions")
    .insert({ user_id: userId, ...input })
    .select()
    .single();
  if (error) throw error;
  return { ...data, price: Number(data.price) } as Subscription;
}

export async function updateCloud(
  sb: SupabaseClient,
  id: string,
  patch: Partial<Subscription>
): Promise<void> {
  const { error } = await sb.from("subscriptions").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteCloud(sb: SupabaseClient, id: string): Promise<void> {
  const { error } = await sb.from("subscriptions").delete().eq("id", id);
  if (error) throw error;
}

/** One-time import of local-mode subs after the user signs in. */
export async function importLocalToCloud(sb: SupabaseClient, user: User): Promise<number> {
  const locals = loadLocal();
  if (locals.length === 0) return 0;
  const rows = locals.map((s) => ({
    user_id: user.id,
    name: s.name,
    price: s.price,
    cycle: s.cycle,
    next_renewal: s.next_renewal,
    category: s.category,
    status: s.status,
    guide_slug: s.guide_slug,
  }));
  const { error } = await sb.from("subscriptions").insert(rows);
  if (error) throw error;
  clearLocal();
  return rows.length;
}

// ── Shared maintenance ────────────────────────────────────────────────────────

/**
 * Roll past-due renewal dates forward to the next occurrence.
 * Returns the fixed list plus which ids changed (so cloud mode can persist).
 */
export function rollPastRenewals(subs: Subscription[]): {
  subs: Subscription[];
  changed: Subscription[];
} {
  const changed: Subscription[] = [];
  const fixed = subs.map((s) => {
    if (s.status === "active" && s.next_renewal) {
      const rolled = rollForward(s.next_renewal, s.cycle);
      if (rolled !== s.next_renewal) {
        const upd = { ...s, next_renewal: rolled };
        changed.push(upd);
        return upd;
      }
    }
    return s;
  });
  return { subs: fixed, changed };
}

export { getSupabase };
