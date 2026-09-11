import localFont from "next/font/local";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";

// Display face — Neue Montreal, self-hosted, only the weights the design uses.
export const display = localFont({
  src: [
    { path: "../app/fonts/NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../app/fonts/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "../app/fonts/NeueMontreal-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

export const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
