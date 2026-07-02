import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moveclock.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MoveClock — Your new state started counting the day you arrived",
    template: "%s · MoveClock",
  },
  description:
    "Moved to a new state? Your driver's license, vehicle registration, insurance, and voter registration all have legal deadlines — some as short as 10 days. Get your personalized countdown and put it in your calendar.",
  openGraph: {
    title: "MoveClock — Your new state started counting the day you arrived",
    description:
      "License, registration, insurance, and voter deadlines for all 50 states, computed for your exact move date.",
    url: siteUrl,
    siteName: "MoveClock",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoveClock — deadlines that start the day you arrive",
    description:
      "Every state gives new residents legal deadlines — some as short as 10 days. Get your countdown.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700;800;900&family=Overpass+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
