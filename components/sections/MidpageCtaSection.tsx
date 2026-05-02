"use client";

import { motion } from "framer-motion";

interface MidpageCtaSectionProps {
  userMode: "recruiter" | "candidate";
}

/**
 * MidpageCtaSection — high-contrast CTA break between sections.
 * Adapts messaging based on recruiter vs candidate mode.
 */
export function MidpageCtaSection({ userMode }: MidpageCtaSectionProps) {
  const copy = {
    recruiter: {
      eyebrow: "⚡ Stop the headcount drag",
      headline: "Your next great hire is already in our network.",
      sub: "Send us a brief in 2 minutes. We'll respond with matched candidates within 24 hours.",
      cta: "Send a Hiring Brief →",
      secondary: "No commitment required",
    },
    candidate: {
      eyebrow: "🚀 Your next chapter starts here",
      headline: "Top companies are actively looking for you.",
      sub: "Tell us what you want. We'll find companies that match your ambition — not just your CV.",
      cta: "Tell Us What You Want →",
      secondary: "Free career consultation",
    },
  };

  const c = copy[userMode];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-obsidian-3 to-obsidian-2" />
          <div className="absolute inset-0 grid-pattern opacity-40" />

          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-electric/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-neon/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 p-12 md:p-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 glass-card px-4 py-2 rounded-full border border-electric/20"
            >
              <span className="text-sm text-chalk-dim">{c.eyebrow}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl md:text-6xl font-bold text-chalk mb-6 max-w-2xl mx-auto leading-tight"
            >
              {c.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-chalk-dim text-lg mb-10 max-w-lg mx-auto"
            >
              {c.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <button suppressHydrationWarning className="btn-electric px-10 py-4 rounded-xl font-display font-semibold text-base cursor-none animate-pulse-glow">
                {c.cta}
              </button>
              <span className="text-chalk-dim/50 text-sm font-mono">
                {c.secondary}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
