import type { Metadata } from "next";
import { SubscriptionManager } from "@/components/SubscriptionManager";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Track your subscriptions, see your monthly bleed, and plug the leaks.",
  robots: { index: false },
};

export default function DashboardPage() {
  return <SubscriptionManager />;
}
