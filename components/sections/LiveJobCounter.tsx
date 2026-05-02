"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const categories = [
  { label: "Engineering", count: 54, icon: "⚙️", hot: true },
  { label: "Product", count: 28, icon: "◈", hot: true },
  { label: "Design", count: 19, icon: "✦", hot: false },
  { label: "Marketing", count: 16, icon: "▲", hot: false },
  { label: "Data & AI", count: 31, icon: "◉", hot: true },
  { label: "Leadership", count: 9, icon: "⬡", hot: false },
];

const totalJobs = categories.reduce((s, c) => s + c.count, 0);

/**
 * LiveJobCounter — animated counter showing live active roles.
 * Simulates real-time updates with a subtle ticker effect.
 */
export function LiveJobCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [liveCount, setLiveCount] = useState(totalJobs);

  // Simulate live job additions every few seconds
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const delta = Math.random() > 0.6 ? 1 : 0;
        return prev + delta;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="jobs" className="py-24 bg-obsidian-2 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-electric/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Big counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-neon animate-ping" />
            <span className="text-neon font-mono text-sm uppercase tracking-widest">
              Live roles
            </span>
          </div>

          <div className="font-display text-8xl md:text-9xl font-bold gradient-text-electric text-glow-electric leading-none mb-4">
            {inView ? (
              <CountUp
                start={0}
                end={liveCount}
                duration={2}
                separator=","
              />
            ) : (
              "0"
            )}
            <span className="text-5xl md:text-6xl">+</span>
          </div>

          <p className="font-display text-2xl text-chalk font-semibold mb-3">
            active roles being matched right now
          </p>
          <p className="text-chalk-dim max-w-md mx-auto">
            Every role is being actively worked — not just posted. Our
            recruiters are on it.
          </p>
        </motion.div>

        {/* Category breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-xl p-5 text-center group hover:border-electric/20 cursor-none transition-all ${
                cat.hot ? "border-electric/10" : ""
              }`}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="font-display text-3xl font-bold text-chalk mb-1 group-hover:text-electric transition-colors">
                {inView ? (
                  <CountUp start={0} end={cat.count} duration={1.5} delay={i * 0.1} />
                ) : 0}
              </div>
              <div className="text-chalk-dim text-xs">{cat.label}</div>
              {cat.hot && (
                <div className="mt-2">
                  <span className="text-xs text-neon font-mono">● HIRING</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="btn-electric px-10 py-4 rounded-xl font-display font-semibold text-base cursor-none mr-4">
            Browse All Roles →
          </button>
          <button className="btn-ghost-border px-8 py-4 rounded-xl font-display text-base cursor-none">
            Upload CV
          </button>
        </motion.div>
      </div>
    </section>
  );
}
