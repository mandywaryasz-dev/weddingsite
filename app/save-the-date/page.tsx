import type { Metadata } from "next";
import { SaveTheDateExperience } from "@/app/save-the-date/save-the-date-experience";

const shareImage = "/images/site-preview.png";

export const metadata: Metadata = {
  title: "Save The Date | Amanda & Dushyant",
  description: "Cinematic save-the-date for Amanda & Dushyant's wedding in Asheville.",
  openGraph: {
    title: "Save The Date | Amanda & Dushyant",
    description: "Cinematic save-the-date for Amanda & Dushyant's wedding in Asheville.",
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
    title: "Save The Date | Amanda & Dushyant",
    description: "Cinematic save-the-date for Amanda & Dushyant's wedding in Asheville.",
    images: [shareImage]
  }
};

export default function SaveTheDatePage() {
  return <SaveTheDateExperience />;
}
