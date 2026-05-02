"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HiringSpeedVisualizer } from "@/components/sections/HiringSpeedVisualizer";
import { SalaryCalculator } from "@/components/sections/SalaryCalculator";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LiveJobCounter } from "@/components/sections/LiveJobCounter";
import { MidpageCtaSection } from "@/components/sections/MidpageCtaSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Footer } from "@/components/sections/Footer";

/**
 * Main page — composes all sections in a single scrollable experience.
 * The `userMode` state drives personalization (Recruiter vs Candidate view).
 */
export default function Home() {
  const [userMode, setUserMode] = useState<"recruiter" | "candidate">(
    "recruiter"
  );

  return (
    <main className="relative min-h-screen bg-obsidian overflow-x-hidden">
      {/* Grid pattern overlay for texture */}
      <div className="fixed inset-0 grid-pattern opacity-100 pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar userMode={userMode} setUserMode={setUserMode} />

      {/* Hero — Full screen Spline-powered section */}
      <HeroSection userMode={userMode} />

      {/* Social proof logos */}
      <LogoMarquee />

      {/* Animated stats counters */}
      <StatsSection />

      {/* Interactive service cards */}
      <ServicesSection />

      {/* Mid-page CTA */}
      <MidpageCtaSection userMode={userMode} />

      {/* Hiring speed comparison tool */}
      <HiringSpeedVisualizer />

      {/* Live job counter */}
      <LiveJobCounter />

      {/* Salary calculator tool */}
      <SalaryCalculator />

      {/* Testimonials with motion */}
      <TestimonialsSection />

      {/* Final CTA section */}
      <FinalCtaSection userMode={userMode} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
