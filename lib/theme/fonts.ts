import { Cinzel, Cormorant, Tiro_Devanagari_Hindi } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap"
});

export const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap"
});

export const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tiro-devanagari",
  display: "swap"
});
