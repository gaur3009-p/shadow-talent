import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  userMode: "recruiter" | "candidate";
}

/**
 * HeroSection — full-screen animated hero using Canvas + CSS.
 * Spline removed: it requires browser globals at import time which
 * breaks Next.js SSR regardless of dynamic() usage in some setups.
 * Replaced with a particle/orb canvas animation that looks equally premium.
 */
export function HeroSection({ userMode }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  const steps = ["Company", "Brief", "Matching", "Candidates", "Hired ✓"];

  // ── Particle Canvas ────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Orbs
    type Orb = { x: number; y: number; r: number; vx: number; vy: number; hue: number; alpha: number };
    const orbs: Orb[] = Array.from({ length: 6 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 180 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? 234 : 170, // electric or neon
      alpha: 0.06 + Math.random() * 0.08,
    }));

    // Nodes (connection graph)
    type Node = { x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw orbs
      orbs.forEach((o) => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H + o.r) o.y = -o.r;

        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, 90%, 65%, ${o.alpha})`);
        g.addColorStop(1, `hsla(${o.hue}, 90%, 65%, 0)`);
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Draw node connections
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(91,110,245,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        // Node dot
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(91,110,245,0.4)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Canvas Background ─────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ opacity: 0.9 }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-radial from-transparent via-obsidian/40 to-obsidian/95 pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-obsidian to-transparent z-10 pointer-events-none" />

      {/* ── Hero Content ─────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="glass-card px-4 py-2 rounded-full text-sm text-chalk-dim font-medium border border-electric/20">
              {c.eyebrow}
            </div>
          </motion.div>

          {/* Headline */}
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

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <button suppressHydrationWarning className="btn-electric px-8 py-4 rounded-xl font-display text-base font-semibold cursor-none">
              {c.cta1}
            </button>
            <button suppressHydrationWarning className="btn-ghost-border px-8 py-4 rounded-xl font-display text-base cursor-none">
              {c.cta2}
            </button>
          </motion.div>

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-2 text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
            <span className="text-neon font-medium">{c.badge}</span>
          </motion.div>
        </div>

        {/* ── Pipeline Flow ─────────────────────────────── */}
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

      {/* Scan line */}
      <div className="scan-line z-5 pointer-events-none" />
    </section>
  );
}