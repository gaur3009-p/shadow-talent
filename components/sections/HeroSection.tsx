"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Lazy-load Spline to avoid blocking initial render
const Spline = lazy(() => import("@splinetool/react-spline"));

interface HeroSectionProps {
  userMode: "recruiter" | "candidate";
}

/**
 * HeroSection — full-screen immersive hero.
 * Uses a Spline 3D scene in the background (lazy loaded).
 * Headline and CTAs change based on recruiter vs candidate mode.
 */
export function HeroSection({ userMode }: HeroSectionProps) {
  const [splineLoaded, setSplineLoaded] = useState(false);

  const copy = {
    recruiter: {
      eyebrow: "⚡ AI-augmented recruitment",
      headline: "Hire top tech talent",
      accent: "in 7 days",
      sub: "not 70.",
      description:
        "Stop burning months on interviews that go nowhere. We deliver pre-vetted senior engineers, designers, and product leaders — matched in days, not months.",
      cta1: "Hire Talent Now →",
      cta2: "See How It Works",
      badge: "127+ live roles being matched today",
    },
    candidate: {
      eyebrow: "🚀 Your next big role awaits",
      headline: "Land your dream tech",
      accent: "role in 7 days",
      sub: "guaranteed.",
      description:
        "Skip the black-hole applications. We represent you directly to the fastest-growing startups and scale-ups actively hiring right now.",
      cta1: "Browse Live Roles →",
      cta2: "Talk to a Recruiter",
      badge: "47 candidates placed this month",
    },
  };

  const c = copy[userMode];

  // Pipeline steps for the animated flow visualization
  const steps = ["Company", "Brief", "Matching", "Candidates", "Hired ✓"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Spline 3D Background ─────────────────────────── */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-gradient-mesh" />
          }
        >
          <Spline
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
            className="w-full h-full"
          />
        </Suspense>

        {/* Fallback gradient mesh (always visible, fades when Spline loads) */}
        <div
          className={`absolute inset-0 bg-gradient-mesh transition-opacity duration-1000 ${
            splineLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Radial gradient to darken edges */}
      <div className="absolute inset-0 z-1 bg-gradient-radial from-transparent via-obsidian/30 to-obsidian/90 pointer-events-none" />

      {/* Bottom fade to connect with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-obsidian to-transparent z-10 pointer-events-none" />

      {/* ── Hero Content ─────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="glass-card px-4 py-2 rounded-full text-sm text-chalk-dim font-medium border border-electric/20">
              <span>{c.eyebrow}</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-4 tracking-tight"
          >
            <span className="text-chalk">{c.headline}</span>
            <br />
            <span className="gradient-text-electric text-glow-electric">
              {c.accent}
            </span>
            <br />
            <span className="text-chalk-dim text-5xl md:text-6xl lg:text-7xl">
              {c.sub}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-chalk-dim text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
          >
            {c.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <button className="btn-electric px-8 py-4 rounded-xl font-display text-base font-semibold cursor-none">
              {c.cta1}
            </button>
            <button className="btn-ghost-border px-8 py-4 rounded-xl font-display text-base cursor-none">
              {c.cta2}
            </button>
          </motion.div>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-2 text-sm text-chalk-dim"
          >
            <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
            <span className="text-neon font-medium">{c.badge}</span>
          </motion.div>
        </div>

        {/* ── Pipeline Flow Visualizer ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 hidden md:block"
        >
          <div className="flex items-center gap-0 max-w-2xl">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                  className={`relative px-4 py-2 rounded-lg text-sm font-display font-semibold border ${
                    i === steps.length - 1
                      ? "bg-neon/10 border-neon/30 text-neon"
                      : "glass-card text-chalk-dim border-white/10"
                  }`}
                >
                  {step}
                  {i === steps.length - 1 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon animate-ping" />
                  )}
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9 + i * 0.15, duration: 0.3 }}
                    className="w-8 h-px bg-gradient-to-r from-electric/50 to-electric/10 origin-left"
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-chalk-dim/50 text-xs mt-3 font-mono">
            // average time: 7.3 days end-to-end
          </p>
        </motion.div>
      </div>

      {/* Scan line effect */}
      <div className="scan-line z-5 pointer-events-none" />
    </section>
  );
}
