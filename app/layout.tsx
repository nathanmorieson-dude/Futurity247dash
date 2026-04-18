import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { AmbientBackground } from "@/components/ambient-background";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Futurity247",
  description: "AI receptionist platform for electrical contractors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
