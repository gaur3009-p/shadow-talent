import type { Metadata } from "next";
import "@/styles/globals.css";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { StickyCtaButton } from "@/components/ui/StickyCtaButton";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";

export const metadata: Metadata = {
  title: "TalentFlow — Hire Top Tech Talent in 7 Days",
  description:
    "The recruitment agency that works at startup speed. Connect with pre-vetted senior engineers, designers, and marketers in 7 days, not 70.",
  keywords: [
    "tech recruitment",
    "hire engineers",
    "talent agency",
    "developer hiring",
    "startup recruitment",
  ],
  openGraph: {
    title: "TalentFlow — Hire Top Tech Talent in 7 Days",
    description: "Premium recruitment at startup speed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="talentflow" className="grain">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
      </head>
      <body className="font-body antialiased">
        {/* Lenis smooth scroll wrapper */}
        <LenisProvider>
          {/* Global UI elements */}
          <CustomCursor />
          <ScrollProgress />
          <StickyCtaButton />
          <ExitIntentPopup />

          {/* Page content */}
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
