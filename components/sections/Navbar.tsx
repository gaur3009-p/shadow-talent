"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  userMode: "recruiter" | "candidate";
  setUserMode: (mode: "recruiter" | "candidate") => void;
}

/**
 * Navbar — sticky top nav with glass blur on scroll.
 * Includes the recruiter/candidate mode toggle for personalization.
 */
export function Navbar({ userMode, setUserMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Tools", href: "#calculator" },
    { label: "Jobs", href: "#jobs" },
    { label: "About", href: "#testimonials" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-obsidian/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 cursor-none">
          <div className="w-7 h-7 rounded-lg bg-electric glow-electric flex items-center justify-center">
            <span className="text-white text-xs font-display font-bold">TF</span>
          </div>
          <span className="font-display font-semibold text-chalk text-lg tracking-tight">
            TalentFlow
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-chalk-dim hover:text-chalk text-sm font-medium transition-colors duration-200 cursor-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Mode Toggle */}
          <div className="hidden md:flex items-center gap-1 bg-obsidian-3 border border-white/6 rounded-full p-1">
            {(["recruiter", "candidate"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setUserMode(mode)}
                className={`px-3 py-1 rounded-full text-xs font-display font-medium transition-all duration-200 cursor-none capitalize ${
                  userMode === mode
                    ? "bg-electric text-white shadow-lg"
                    : "text-chalk-dim hover:text-chalk"
                }`}
              >
                {mode === "recruiter" ? "🏢 Hiring" : "👤 Seeking"}
              </button>
            ))}
          </div>

          <button className="btn-electric hidden md:flex px-4 py-2 rounded-full text-sm cursor-none">
            Get Started →
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-chalk p-2 cursor-none"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-chalk transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-6 bg-chalk transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-chalk transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-obsidian-2 border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-chalk-dim hover:text-chalk font-medium py-1"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 flex gap-2">
                {(["recruiter", "candidate"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setUserMode(mode)}
                    className={`flex-1 py-2 rounded-lg text-sm font-display font-medium transition-all capitalize ${
                      userMode === mode
                        ? "bg-electric text-white"
                        : "bg-obsidian-3 text-chalk-dim"
                    }`}
                  >
                    {mode === "recruiter" ? "🏢 Hiring" : "👤 Seeking"}
                  </button>
                ))}
              </div>
              <button className="btn-electric w-full py-3 rounded-xl font-display text-sm">
                Get Started →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
