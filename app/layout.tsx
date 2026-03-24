import type { Metadata } from "next";
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Cormorant:wght@300..700&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-cinzel: 'Cinzel';
            --font-cormorant: 'Cormorant';
            --font-tiro-devanagari: 'Tiro Devanagari Hindi';
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
