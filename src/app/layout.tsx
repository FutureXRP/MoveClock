import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://depositback.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DepositBack — Get your security deposit back. It's the law.",
    template: "%s · DepositBack",
  },
  description:
    "Your landlord has a legal deadline to return your security deposit — 14 to 60 days depending on the state — and most states impose 2×–3× penalties for missing it. Check your deadline and generate a statute-citing demand letter, free.",
  openGraph: {
    title: "DepositBack — Get your security deposit back. It's the law.",
    description:
      "Check your state's deposit-return deadline and generate a demand letter that cites the exact statute. Free.",
    url: siteUrl,
    siteName: "DepositBack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DepositBack — Get your security deposit back. It's the law.",
    description:
      "Check your state's deposit-return deadline and generate a statute-citing demand letter. Free.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Courier+Prime:wght@400;700&display=swap"
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
