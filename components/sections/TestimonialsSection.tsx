"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "TalentFlow placed our CTO in 9 days. We'd been searching for 4 months with two other agencies. Night and day difference.",
    author: "Sarah Chen",
    title: "CEO, Launchpad AI",
    avatar: "SC",
    color: "electric",
    metric: "9 days to CTO",
  },
  {
    quote:
      "I uploaded my CV on Monday, had three interviews by Thursday, and signed my offer the following Friday. The process felt almost too fast — but here I am, loving the role.",
    author: "Marcus Webb",
    title: "Staff Engineer, Flux Systems",
    avatar: "MW",
    color: "neon",
    metric: "8 days, job secured",
  },
  {
    quote:
      "Their market knowledge is elite. They told us exactly what salary band to offer before we even asked, and it landed every candidate we went after.",
    author: "Priya Nair",
    title: "VP People, Orbit Commerce",
    avatar: "PN",
    color: "amber",
    metric: "100% offer acceptance",
  },
  {
    quote:
      "We've scaled from 12 to 68 engineers in 14 months. TalentFlow is essentially our external recruiting arm — and they're better than the internal teams I've worked with.",
    author: "Tom Eriksson",
    title: "CTO, Stackr",
    avatar: "TE",
    color: "electric",
    metric: "56 engineers placed",
  },
  {
    quote:
      "The salary calculator they shared was more accurate than the reports I paid £3k for. I negotiated £18k more than I was about to accept.",
    author: "Anya Okafor",
    title: "Product Designer, Drift",
    avatar: "AO",
    color: "neon",
    metric: "+£18k negotiated",
  },
];

const colorMap: Record<string, string> = {
  electric: "text-electric border-electric/30 bg-electric/5",
  neon: "text-neon border-neon/30 bg-neon/5",
  amber: "text-amber border-amber/30 bg-amber/5",
};

const avatarColorMap: Record<string, string> = {
  electric: "bg-electric/20 text-electric",
  neon: "bg-neon/20 text-neon",
  amber: "bg-amber/20 text-amber",
};

/**
 * TestimonialsSection — auto-advancing carousel with motion transitions.
 * User can also manually navigate via dots.
 */
export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const t = testimonials[active];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-electric/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-electric text-xs uppercase tracking-widest">
            Social proof
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-chalk mt-3">
            Don't take our word for it
          </h2>
        </motion.div>

        {/* Main testimonial */}
        <div className="max-w-3xl mx-auto mb-12">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-10 relative"
            >
              {/* Quote mark */}
              <div className="text-8xl font-display text-electric/10 absolute top-4 left-8 leading-none select-none">
                "
              </div>

              {/* Metric badge */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-mono border mb-6 ${colorMap[t.color]}`}
              >
                ✓ {t.metric}
              </div>

              <blockquote className="font-body text-chalk text-xl leading-relaxed mb-8 relative z-10">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm ${avatarColorMap[t.color]}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-chalk font-semibold font-display">
                    {t.author}
                  </div>
                  <div className="text-chalk-dim text-sm">{t.title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 cursor-none ${
                i === active
                  ? "w-8 h-2 bg-electric"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Mini cards row */}
        <div className="grid md:grid-cols-3 gap-4 opacity-60">
          {testimonials
            .filter((_, i) => i !== active)
            .slice(0, 3)
            .map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-5 cursor-none"
                onClick={() => goTo(testimonials.indexOf(t))}
              >
                <p className="text-chalk-dim text-sm line-clamp-2 mb-3">
                  "{t.quote}"
                </p>
                <div className="text-chalk text-xs font-display font-medium">
                  {t.author}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
