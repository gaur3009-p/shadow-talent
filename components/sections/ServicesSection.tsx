"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "tech",
    icon: "⚙️",
    title: "Engineering",
    tagline: "From IC to CTO — we place builders",
    color: "electric",
    demand: "Very High",
    roles: [
      { title: "Senior Full-Stack Engineer", range: "£90k–£130k", hot: true },
      { title: "Staff Engineer", range: "£130k–£170k", hot: true },
      { title: "Engineering Manager", range: "£120k–£150k", hot: false },
      { title: "DevOps / Platform Engineer", range: "£85k–£120k", hot: true },
      { title: "ML Engineer", range: "£100k–£145k", hot: true },
      { title: "Mobile Engineer (iOS/Android)", range: "£80k–£115k", hot: false },
    ],
    description:
      "We embed directly with your engineering team to understand your stack, culture, and growth stage — then find engineers who'll thrive, not just survive.",
  },
  {
    id: "product",
    icon: "◈",
    title: "Product & Design",
    tagline: "Makers who ship, not just plan",
    color: "neon",
    demand: "High",
    roles: [
      { title: "Senior Product Manager", range: "£80k–£120k", hot: true },
      { title: "Head of Product", range: "£110k–£145k", hot: false },
      { title: "Product Designer", range: "£70k–£100k", hot: true },
      { title: "Design Lead / Principal", range: "£95k–£125k", hot: false },
      { title: "UX Researcher", range: "£60k–£85k", hot: false },
      { title: "Product Marketing Manager", range: "£65k–£90k", hot: true },
    ],
    description:
      "Great products need visionaries and executors. We find the rare people who can do both — those who bridge business, design, and technology.",
  },
  {
    id: "marketing",
    icon: "▲",
    title: "Marketing & Growth",
    tagline: "Growth operators who move metrics",
    color: "crimson",
    demand: "Medium",
    roles: [
      { title: "Growth Lead", range: "£75k–£110k", hot: true },
      { title: "VP Marketing", range: "£120k–£160k", hot: false },
      { title: "Performance Marketing Manager", range: "£60k–£85k", hot: true },
      { title: "Content Strategist", range: "£50k–£70k", hot: false },
      { title: "SEO / Organic Lead", range: "£55k–£80k", hot: false },
      { title: "Demand Generation Manager", range: "£65k–£90k", hot: true },
    ],
    description:
      "Scaling a startup is different from managing an enterprise brand. We find marketers who've done it — who know what levers to pull and when.",
  },
];

const colorMap: Record<string, string> = {
  electric: "rgba(91,110,245,",
  neon: "rgba(0,255,178,",
  crimson: "rgba(255,61,90,",
};

const textColorMap: Record<string, string> = {
  electric: "text-electric",
  neon: "text-neon",
  crimson: "text-crimson",
};

/**
 * ServicesSection — interactive cards with role details on hover/select.
 * Each service expands to show roles, salary ranges, and hiring demand.
 */
export function ServicesSection() {
  const [active, setActive] = useState("tech");
  const activeService = services.find((s) => s.id === active)!;

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-electric text-xs uppercase tracking-widest">
            What we do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-chalk mt-3 max-w-xl">
            We hire across three verticals
          </h2>
          <p className="text-chalk-dim mt-4 max-w-lg">
            Hover a category to explore live roles, salary data, and hiring
            demand in your market.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Service selector */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {services.map((service, i) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(service.id)}
                className={`text-left p-6 rounded-xl border transition-all duration-300 cursor-none ${
                  active === service.id
                    ? "bg-obsidian-3 border-electric/30"
                    : "glass-card hover:border-white/10"
                }`}
                style={
                  active === service.id
                    ? {
                        boxShadow: `0 0 30px ${colorMap[service.color]}0.1)`,
                      }
                    : {}
                }
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <span
                      className={`font-display font-bold text-lg ${
                        active === service.id
                          ? textColorMap[service.color]
                          : "text-chalk"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded-full border ${
                      service.demand === "Very High"
                        ? "text-neon border-neon/30 bg-neon/5"
                        : service.demand === "High"
                        ? "text-electric border-electric/30 bg-electric/5"
                        : "text-chalk-dim border-white/10"
                    }`}
                  >
                    {service.demand}
                  </span>
                </div>
                <p className="text-chalk-dim text-sm">{service.tagline}</p>
              </motion.button>
            ))}
          </div>

          {/* Role details panel */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-8 h-full"
              >
                {/* Panel header */}
                <div className="mb-6">
                  <h3
                    className={`font-display text-2xl font-bold mb-2 ${
                      textColorMap[activeService.color]
                    }`}
                  >
                    {activeService.title} Roles
                  </h3>
                  <p className="text-chalk-dim text-sm">
                    {activeService.description}
                  </p>
                </div>

                {/* Roles list */}
                <div className="space-y-3 mb-8">
                  {activeService.roles.map((role, i) => (
                    <motion.div
                      key={role.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group cursor-none"
                    >
                      <div className="flex items-center gap-3">
                        {role.hot && (
                          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-ping" />
                        )}
                        {!role.hot && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        )}
                        <span className="text-chalk text-sm font-medium group-hover:text-white transition-colors">
                          {role.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-chalk-dim text-sm font-mono">
                          {role.range}
                        </span>
                        {role.hot && (
                          <span className="text-xs text-neon font-mono">
                            HOT
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <button className="btn-electric flex-1 py-3 rounded-xl font-display text-sm cursor-none">
                    See All {activeService.title} Roles →
                  </button>
                  <button className="btn-ghost-border px-4 py-3 rounded-xl font-display text-sm cursor-none">
                    Get Salary Guide
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
