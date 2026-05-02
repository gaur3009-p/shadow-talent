"use client";

import { motion } from "framer-motion";

interface FinalCtaSectionProps {
  userMode: "recruiter" | "candidate";
}

/**
 * FinalCtaSection — bottom-of-page conversion section.
 * Two-column split: hire vs apply. Identified by id="cta-section"
 * for sticky button scroll target.
 */
export function FinalCtaSection({ userMode }: FinalCtaSectionProps) {
  return (
    <section id="cta-section" className="py-24 bg-obsidian-2 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-chalk mb-4">
            Ready to move fast?
          </h2>
          <p className="text-chalk-dim text-xl max-w-lg mx-auto">
            Whether you're hiring or searching — we make it faster, smarter,
            and better.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Hire card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`glass-card rounded-2xl p-10 relative overflow-hidden group cursor-none hover:border-electric/30 transition-all ${
              userMode === "recruiter" ? "border-electric/20" : ""
            }`}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-electric/10 rounded-full blur-2xl group-hover:bg-electric/20 transition-all" />
            <div className="relative z-10">
              <div className="text-5xl mb-6">🏢</div>
              <h3 className="font-display text-3xl font-bold text-chalk mb-4">
                Hire top talent
              </h3>
              <p className="text-chalk-dim mb-6 leading-relaxed">
                Get matched with pre-vetted candidates in 24 hours. No job boards,
                no noise — just the right people for your team.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Free initial talent brief",
                  "Candidates in 24–48 hours",
                  "No placement, no fee",
                  "12-month guarantee",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-chalk-dim">
                    <span className="text-neon text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="btn-electric w-full py-4 rounded-xl font-display font-semibold cursor-none">
                Book a Hiring Call →
              </button>
            </div>
          </motion.div>

          {/* Apply card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`glass-card rounded-2xl p-10 relative overflow-hidden group cursor-none hover:border-neon/30 transition-all ${
              userMode === "candidate" ? "border-neon/20" : ""
            }`}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon/5 rounded-full blur-2xl group-hover:bg-neon/10 transition-all" />
            <div className="relative z-10">
              <div className="text-5xl mb-6">🚀</div>
              <h3 className="font-display text-3xl font-bold text-chalk mb-4">
                Find your next role
              </h3>
              <p className="text-chalk-dim mb-6 leading-relaxed">
                Get represented directly to the best startups and scale-ups.
                We handle the negotiation — you focus on the work.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Free career consultation",
                  "Exclusive unlisted roles",
                  "Salary negotiation support",
                  "Interview coaching included",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-chalk-dim">
                    <span className="text-neon text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl font-display font-semibold border border-neon/30 bg-neon/5 text-neon hover:bg-neon/10 transition-all cursor-none">
                Register as a Candidate →
              </button>
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-chalk-dim/40 text-sm font-mono"
        >
          {[
            "🔒 GDPR Compliant",
            "⚡ 24hr Response SLA",
            "✓ REC Members",
            "🌍 UK & EU Coverage",
            "★ 4.9/5 Trustpilot",
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
