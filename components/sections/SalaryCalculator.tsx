"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock salary data — in production, fetch from a real API
const salaryData: Record<string, Record<string, { min: number; max: number; median: number }>> = {
  "Senior Engineer": {
    London: { min: 90000, max: 140000, median: 115000 },
    Manchester: { min: 75000, max: 115000, median: 92000 },
    Edinburgh: { min: 70000, max: 110000, median: 88000 },
    Remote: { min: 80000, max: 130000, median: 105000 },
    Berlin: { min: 70000, max: 110000, median: 88000 },
    Amsterdam: { min: 75000, max: 120000, median: 95000 },
  },
  "Staff Engineer": {
    London: { min: 130000, max: 175000, median: 152000 },
    Manchester: { min: 110000, max: 150000, median: 128000 },
    Edinburgh: { min: 105000, max: 145000, median: 122000 },
    Remote: { min: 120000, max: 165000, median: 142000 },
    Berlin: { min: 105000, max: 148000, median: 125000 },
    Amsterdam: { min: 110000, max: 155000, median: 132000 },
  },
  "Product Manager": {
    London: { min: 80000, max: 125000, median: 102000 },
    Manchester: { min: 65000, max: 100000, median: 82000 },
    Edinburgh: { min: 62000, max: 96000, median: 78000 },
    Remote: { min: 70000, max: 115000, median: 92000 },
    Berlin: { min: 65000, max: 105000, median: 82000 },
    Amsterdam: { min: 70000, max: 110000, median: 88000 },
  },
  "Product Designer": {
    London: { min: 70000, max: 110000, median: 88000 },
    Manchester: { min: 58000, max: 90000, median: 72000 },
    Edinburgh: { min: 55000, max: 86000, median: 68000 },
    Remote: { min: 62000, max: 100000, median: 80000 },
    Berlin: { min: 58000, max: 92000, median: 72000 },
    Amsterdam: { min: 62000, max: 98000, median: 78000 },
  },
  "Engineering Manager": {
    London: { min: 120000, max: 165000, median: 142000 },
    Manchester: { min: 100000, max: 140000, median: 118000 },
    Edinburgh: { min: 95000, max: 135000, median: 112000 },
    Remote: { min: 110000, max: 155000, median: 132000 },
    Berlin: { min: 98000, max: 140000, median: 118000 },
    Amsterdam: { min: 102000, max: 145000, median: 122000 },
  },
  "Growth Lead": {
    London: { min: 75000, max: 120000, median: 96000 },
    Manchester: { min: 62000, max: 98000, median: 78000 },
    Edinburgh: { min: 58000, max: 92000, median: 74000 },
    Remote: { min: 68000, max: 110000, median: 88000 },
    Berlin: { min: 62000, max: 100000, median: 80000 },
    Amsterdam: { min: 65000, max: 105000, median: 84000 },
  },
};

const roles = Object.keys(salaryData);
const locations = ["London", "Manchester", "Edinburgh", "Remote", "Berlin", "Amsterdam"];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * SalaryCalculator — interactive role/location picker showing salary ranges.
 * All data is mocked client-side. In production, connect to a salary API.
 */
export function SalaryCalculator() {
  const [role, setRole] = useState(roles[0]);
  const [location, setLocation] = useState("London");
  const [revealed, setRevealed] = useState(false);

  const data = salaryData[role]?.[location];

  const handleCalculate = () => setRevealed(true);
  const handleReset = () => {
    setRevealed(false);
  };

  return (
    <section id="calculator" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-electric text-xs uppercase tracking-widest">
            Free tool
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-chalk mt-3">
            Salary intelligence
          </h2>
          <p className="text-chalk-dim mt-4 max-w-lg mx-auto">
            Real-time salary benchmarks from 800+ placements. Know what to pay
            — and what to ask for.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-10">
            {/* Role selector */}
            <div className="mb-6">
              <label className="block text-chalk-dim text-xs font-mono uppercase tracking-widest mb-3">
                Role
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRevealed(false);
                    }}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium text-left transition-all cursor-none ${
                      role === r
                        ? "bg-electric text-white"
                        : "bg-obsidian-3 text-chalk-dim hover:text-chalk hover:bg-obsidian-2 border border-white/5"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Location selector */}
            <div className="mb-8">
              <label className="block text-chalk-dim text-xs font-mono uppercase tracking-widest mb-3">
                Location
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {locations.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLocation(l);
                      setRevealed(false);
                    }}
                    className={`py-2.5 px-2 rounded-lg text-sm font-medium text-center transition-all cursor-none ${
                      location === l
                        ? "bg-neon/10 border border-neon/40 text-neon"
                        : "bg-obsidian-3 text-chalk-dim hover:text-chalk border border-white/5"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate button */}
            {!revealed && (
              <button
                suppressHydrationWarning
                onClick={handleCalculate}
                className="btn-electric w-full py-4 rounded-xl font-display font-semibold text-base cursor-none"
              >
                Show Salary Range →
              </button>
            )}

            {/* Result */}
            <AnimatePresence>
              {revealed && data && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-2"
                >
                  <div className="bg-obsidian-3 rounded-xl p-6 border border-neon/20 mb-4">
                    <div className="text-xs text-chalk-dim/60 font-mono mb-4 uppercase tracking-widest">
                      {role} · {location}
                    </div>

                    {/* Range bar visual */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-mono text-chalk-dim mb-2">
                        <span>{fmt(data.min)}</span>
                        <span className="text-neon font-semibold">
                          median {fmt(data.median)}
                        </span>
                        <span>{fmt(data.max)}</span>
                      </div>
                      <div className="h-3 bg-obsidian rounded-full relative overflow-hidden">
                        {/* Full range */}
                        <div className="absolute inset-0 bg-electric/20 rounded-full" />
                        {/* Median marker */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute top-0 bottom-0 left-0 bg-neon/60 rounded-full origin-left"
                          style={{
                            width: `${((data.median - data.min) / (data.max - data.min)) * 100}%`,
                          }}
                        />
                        {/* Median dot */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="absolute top-0 bottom-0 w-3 h-3 rounded-full bg-neon shadow-lg my-auto"
                          style={{
                            left: `calc(${((data.median - data.min) / (data.max - data.min)) * 100}% - 6px)`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Key figures */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Floor", value: fmt(data.min), color: "text-chalk-dim" },
                        { label: "Median", value: fmt(data.median), color: "text-neon" },
                        { label: "Ceiling", value: fmt(data.max), color: "text-chalk" },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <div className={`font-display font-bold text-lg ${item.color}`}>
                            {item.value}
                          </div>
                          <div className="text-chalk-dim/60 text-xs font-mono mt-1">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      suppressHydrationWarning
                      onClick={handleReset}
                      className="btn-ghost-border flex-1 py-3 rounded-xl text-sm font-display cursor-none"
                    >
                      Try Another Role
                    </button>
                    <button suppressHydrationWarning className="btn-electric flex-1 py-3 rounded-xl text-sm font-display cursor-none">
                      Get Full Salary Guide →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-chalk-dim/40 text-xs font-mono mt-4">
            Data from 800+ placements · Updated quarterly · GBP unless stated
          </p>
        </div>
      </div>
    </section>
  );
}
