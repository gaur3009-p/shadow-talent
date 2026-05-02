"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Stripe", symbol: "▲" },
  { name: "Notion", symbol: "◆" },
  { name: "Linear", symbol: "●" },
  { name: "Vercel", symbol: "▼" },
  { name: "Figma", symbol: "■" },
  { name: "Loom", symbol: "◉" },
  { name: "Framer", symbol: "✦" },
  { name: "Railway", symbol: "◈" },
  { name: "Supabase", symbol: "⬡" },
  { name: "Planetscale", symbol: "⬢" },
];

/**
 * LogoMarquee — scrolling company logos showing trust/social proof.
 * Two rows scroll in opposite directions for visual interest.
 */
export function LogoMarquee() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-chalk-dim/50 text-xs font-mono uppercase tracking-widest">
          Trusted by teams at
        </p>
      </div>

      {/* Row 1 — left to right */}
      <div className="relative overflow-hidden mb-4">
        <div className="flex gap-0 w-max marquee-track">
          {[...logos, ...logos].map((logo, i) => (
            <LogoChip key={i} name={logo.name} symbol={logo.symbol} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="relative overflow-hidden">
        <div className="flex gap-0 w-max marquee-track-reverse">
          {[...logos.slice(5), ...logos, ...logos.slice(0, 5)].map(
            (logo, i) => (
              <LogoChip key={i} name={logo.name} symbol={logo.symbol} dim />
            )
          )}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />
    </section>
  );
}

function LogoChip({
  name,
  symbol,
  dim,
}: {
  name: string;
  symbol: string;
  dim?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-8 py-3 border-r border-white/5 whitespace-nowrap ${
        dim ? "opacity-40" : "opacity-70"
      } hover:opacity-100 transition-opacity`}
    >
      <span className="text-electric text-sm">{symbol}</span>
      <span className="font-display font-medium text-chalk text-sm">
        {name}
      </span>
    </div>
  );
}
