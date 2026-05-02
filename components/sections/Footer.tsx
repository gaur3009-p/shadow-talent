"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Company: ["About", "Blog", "Careers", "Press"],
  Services: ["Engineering Hiring", "Product Hiring", "Marketing Hiring", "Executive Search"],
  Candidates: ["Browse Jobs", "Upload CV", "Salary Guide", "Career Advice"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

/**
 * Footer — clean, minimal footer with links and branding.
 * Keeps the premium aesthetic consistent with the rest of the site.
 */
export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Scan line accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-electric glow-electric flex items-center justify-center">
                <span className="text-white text-xs font-display font-bold">TF</span>
              </div>
              <span className="font-display font-semibold text-chalk text-xl tracking-tight">
                TalentFlow
              </span>
            </div>
            <p className="text-chalk-dim text-sm leading-relaxed mb-6 max-w-xs">
              The recruitment agency that works at startup speed. Pre-vetted talent
              delivered in days, not months.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {["𝕏", "in", "◉"].map((icon) => (
                <button
                  suppressHydrationWarning
                  key={icon}
                  className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-chalk-dim hover:text-chalk hover:border-electric/30 transition-all text-sm cursor-none"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-chalk text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-chalk-dim text-sm hover:text-chalk transition-colors cursor-none"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-chalk-dim/40 text-sm font-mono">
            © 2024 TalentFlow Ltd. All rights reserved. · Registered in England & Wales
          </p>

          <div className="flex items-center gap-2 text-chalk-dim/40 text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
