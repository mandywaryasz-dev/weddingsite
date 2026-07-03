import type { Metadata } from "next";
import { cinzel, cormorant, tiroDevanagari } from "@/lib/theme/fonts";
import "./globals.css";

const shareImage = "/images/site-preview.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://meetusinasheville.com"),
  title: "Amanda & Dushyant | Meet Us In Asheville",
  description:
    "Join Amanda & Dushyant in Asheville, October 2, 2026 — events, travel, where to stay, attire, and FAQs for the weekend.",
  openGraph: {
    title: "Amanda & Dushyant | Meet Us In Asheville",
    description:
      "Join Amanda & Dushyant in Asheville, October 2, 2026 — events, travel, where to stay, attire, and FAQs for the weekend.",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "Amanda and Dushyant wedding — Asheville, October 2, 2026"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Amanda & Dushyant | Meet Us In Asheville",
    description:
      "Join Amanda & Dushyant in Asheville, October 2, 2026 — events, travel, where to stay, attire, and FAQs for the weekend.",
    images: [shareImage]
  },
  icons: {
    icon: {
      url: "/images/favicon.png",
      type: "image/png",
      sizes: "32x32"
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${tiroDevanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
