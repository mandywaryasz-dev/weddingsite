import type { Metadata } from "next";
import { cinzel, cormorant, tiroDevanagari } from "@/lib/theme/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amanda & Dushyant | Meet Us In Asheville",
  description: "Save the date experience for Amanda and Dushyant's wedding in Asheville.",
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
