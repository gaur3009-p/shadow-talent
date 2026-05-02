"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  {
    value: 847,
    suffix: "+",
    label: "Placements made",
    description: "Successful hires across tech, product, and design",
    color: "electric",
  },
  {
    value: 7.3,
    decimals: 1,
    suffix: " days",
    label: "Average time to hire",
    description: "From brief to signed offer letter",
    color: "neon",
  },
  {
    value: 96,
    suffix: "%",
    label: "Retention rate",
    description: "Candidates still thriving after 12 months",
    color: "amber",
  },
  {
    value: 220,
    suffix: "+",
    label: "Active clients",
    description: "From seed-stage startups to Series D scale-ups",
    color: "electric",
  },
];

/**
 * StatsSection — animated number counters that trigger on scroll entry.
 * Uses react-countup + intersection observer for performance.
 */
export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-electric text-xs uppercase tracking-widest">
            By the numbers
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-chalk mt-3">
            Results that speak
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-obsidian-2 p-8 md:p-10 relative group hover:bg-obsidian-3 transition-colors"
            >
              {/* Accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${
                  stat.color === "neon"
                    ? "from-transparent via-neon/50 to-transparent"
                    : stat.color === "amber"
                    ? "from-transparent via-amber/50 to-transparent"
                    : "from-transparent via-electric/50 to-transparent"
                } opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div
                className={`font-display text-4xl md:text-5xl font-bold mb-2 ${
                  stat.color === "neon"
                    ? "text-neon"
                    : stat.color === "amber"
                    ? "text-amber"
                    : "text-electric"
                }`}
              >
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix}
                    delay={i * 0.2}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>

              <div className="font-display font-semibold text-chalk text-sm md:text-base mb-1">
                {stat.label}
              </div>
              <div className="text-chalk-dim text-xs md:text-sm leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
