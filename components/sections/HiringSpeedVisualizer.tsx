"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stages = [
  { label: "Job Brief", traditional: 5, talentflow: 1 },
  { label: "Sourcing", traditional: 14, talentflow: 2 },
  { label: "Screening", traditional: 10, talentflow: 1 },
  { label: "Interviews", traditional: 14, talentflow: 3 },
  { label: "Offer & Close", traditional: 10, talentflow: 1 },
];

const totalTraditional = stages.reduce((s, x) => s + x.traditional, 0);
const totalTalentflow = stages.reduce((s, x) => s + x.talentflow, 0);

/**
 * HiringSpeedVisualizer — animated timeline comparison.
 * Shows traditional agency (53 days) vs TalentFlow (8 days)
 * with per-stage breakdowns animating on scroll entry.
 */
export function HiringSpeedVisualizer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView) setAnimated(true);
  }, [inView]);

  return (
    <section className="py-24 bg-obsidian-2 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -left-40 top-20 w-80 h-80 rounded-full bg-electric/5 blur-3xl" />
      <div className="absolute -right-40 bottom-20 w-80 h-80 rounded-full bg-neon/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-electric text-xs uppercase tracking-widest">
            Speed matters
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-chalk mt-3">
            7x faster than traditional agencies
          </h2>
          <p className="text-chalk-dim mt-4 max-w-lg mx-auto">
            Every week your role sits open costs you £5,000+ in lost
            productivity. Here's how we compare.
          </p>
        </motion.div>

        {/* Comparison totals */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Traditional */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border border-crimson/20"
          >
            <div className="text-chalk-dim text-sm font-mono mb-2">
              ⚠️ Traditional Agency
            </div>
            <div className="font-display text-6xl font-bold text-crimson mb-1">
              {totalTraditional}
            </div>
            <div className="text-chalk-dim">days average</div>
            <div className="mt-4 text-xs text-chalk-dim/60 font-mono">
              That's {Math.round(totalTraditional / 5)} working weeks of
              headcount gap
            </div>
          </motion.div>

          {/* TalentFlow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 border border-neon/20 glow-neon"
          >
            <div className="text-neon text-sm font-mono mb-2">
              ⚡ TalentFlow
            </div>
            <div className="font-display text-6xl font-bold text-neon mb-1">
              {totalTalentflow}
            </div>
            <div className="text-chalk-dim">days average</div>
            <div className="mt-4 text-xs text-neon/60 font-mono">
              {Math.round(
                ((totalTraditional - totalTalentflow) / totalTraditional) * 100
              )}
              % faster — saving ~£
              {(
                ((totalTraditional - totalTalentflow) / 7) *
                5000
              ).toLocaleString()}{" "}
              in lost productivity
            </div>
          </motion.div>
        </div>

        {/* Stage breakdown */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="font-display font-semibold text-chalk mb-8">
            Stage-by-stage breakdown
          </h3>

          <div className="space-y-6">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-chalk text-sm font-medium">
                    {stage.label}
                  </span>
                  <div className="flex items-center gap-6 text-xs font-mono">
                    <span className="text-crimson/70">
                      {stage.traditional}d traditional
                    </span>
                    <span className="text-neon">
                      {stage.talentflow}d TalentFlow
                    </span>
                  </div>
                </div>

                {/* Traditional bar */}
                <div className="h-2 bg-obsidian-3 rounded-full mb-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={
                      animated
                        ? {
                            width: `${(stage.traditional / totalTraditional) * 100}%`,
                          }
                        : { width: 0 }
                    }
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full bg-crimson/40 rounded-full"
                  />
                </div>

                {/* TalentFlow bar */}
                <div className="h-2 bg-obsidian-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={
                      animated
                        ? {
                            width: `${(stage.talentflow / totalTraditional) * 100}%`,
                          }
                        : { width: 0 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1 + 0.2,
                      ease: "easeOut",
                    }}
                    className="h-full bg-neon rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-chalk-dim text-sm">
              Ready to slash your time-to-hire?
            </p>
            <button suppressHydrationWarning className="btn-electric px-6 py-3 rounded-xl font-display text-sm cursor-none">
              Start Hiring in 7 Days →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
