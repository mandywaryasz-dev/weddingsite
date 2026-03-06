import type { Metadata } from "next";
import { cinzel, cormorant, tiroDevanagari } from "@/lib/theme/fonts";
import "./globals.css";

const shareImage = "/images/site-preview.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://meetusinasheville.com"),
  title: "Amanda & Dushyant | Meet Us In Asheville",
  description: "Save the date experience for Amanda and Dushyant's wedding in Asheville.",
  openGraph: {
    title: "Amanda & Dushyant | Meet Us In Asheville",
    description: "Save the date experience for Amanda and Dushyant's wedding in Asheville.",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "Amanda and Dushyant wedding save the date preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Amanda & Dushyant | Meet Us In Asheville",
    description: "Save the date experience for Amanda and Dushyant's wedding in Asheville.",
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
