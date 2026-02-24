import type { Metadata } from "next";
import { SaveTheDateExperience } from "@/app/save-the-date/save-the-date-experience";

export const metadata: Metadata = {
  title: "Save The Date | Amanda & Dushyant",
  description: "Cinematic save-the-date for Amanda & Dushyant's wedding in Asheville."
};

export default function SaveTheDatePage() {
  return <SaveTheDateExperience />;
}
