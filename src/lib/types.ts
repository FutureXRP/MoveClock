export type Cycle = "weekly" | "monthly" | "quarterly" | "yearly";

export type SubStatus = "active" | "cancelled";

export interface Subscription {
  id: string;
  name: string;
  /** Price per billing cycle, in dollars. */
  price: number;
  cycle: Cycle;
  /** ISO date (yyyy-mm-dd) of the next renewal charge. */
  next_renewal: string | null;
  category: string | null;
  status: SubStatus;
  /** Slug into the cancellation-guide directory, when we know it. */
  guide_slug: string | null;
  created_at: string;
}

export const CYCLE_LABELS: Record<Cycle, string> = {
  weekly: "week",
  monthly: "month",
  quarterly: "quarter",
  yearly: "year",
};

/** Normalize any billing cycle to a monthly cost. */
export function monthlyCost(price: number, cycle: Cycle): number {
  switch (cycle) {
    case "weekly":
      return (price * 52) / 12;
    case "monthly":
      return price;
    case "quarterly":
      return price / 3;
    case "yearly":
      return price / 12;
  }
}

export function fmtMoney(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Days from today (local) until an ISO date. Negative = past. */
export function daysUntil(iso: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(iso + "T00:00:00");
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

/** Advance an ISO renewal date by one billing cycle. */
export function advanceRenewal(iso: string, cycle: Cycle): string {
  const d = new Date(iso + "T00:00:00");
  switch (cycle) {
    case "weekly":
      d.setDate(d.getDate() + 7);
      break;
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      break;
    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      break;
    case "yearly":
      d.setFullYear(d.getFullYear() + 1);
      break;
  }
  return d.toISOString().slice(0, 10);
}

/** Roll a renewal date forward until it's today or later. */
export function rollForward(iso: string, cycle: Cycle): string {
  let next = iso;
  let guard = 0;
  while (daysUntil(next) < 0 && guard < 600) {
    next = advanceRenewal(next, cycle);
    guard++;
  }
  return next;
}
