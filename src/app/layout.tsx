import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://subsentry.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SubSentry — Stop paying for subscriptions you forgot",
    template: "%s · SubSentry",
  },
  description:
    "The average person wastes over $2,000/year on forgotten subscriptions. Track every subscription, get warned before renewals hit, and cancel the ones you don't use with step-by-step guides.",
  openGraph: {
    title: "SubSentry — Stop paying for subscriptions you forgot",
    description:
      "Track every subscription, get warned before renewals, and cancel the leaks with step-by-step guides.",
    url: siteUrl,
    siteName: "SubSentry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubSentry — Stop paying for subscriptions you forgot",
    description:
      "Track every subscription, get warned before renewals, and cancel the leaks.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
