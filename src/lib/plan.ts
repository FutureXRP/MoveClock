"use client";

/**
 * The visitor's move plan, persisted in localStorage so it survives
 * navigation (affiliate clicks, guide reading) and return visits.
 */

const KEY = "moveclock.plan.v1";

export interface SavedPlan {
  from: string;
  to: string;
  arrival: string;
}

export function loadPlan(): SavedPlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as SavedPlan;
    return typeof p === "object" && p !== null ? p : null;
  } catch {
    return null;
  }
}

export function savePlan(p: SavedPlan) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // storage blocked — plan just won't persist
  }
}

export function clearPlan() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
