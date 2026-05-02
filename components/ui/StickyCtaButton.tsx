"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * StickyCtaButton — floats in the bottom-right after user scrolls 400px.
 * Pulses subtly to attract attention without being intrusive.
 */
export function StickyCtaButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            animate={{
              boxShadow: [
                "0 0 20px rgba(91,110,245,0.3)",
                "0 0 40px rgba(91,110,245,0.6)",
                "0 0 20px rgba(91,110,245,0.3)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="btn-electric px-6 py-3 rounded-full text-sm font-display font-semibold flex items-center gap-2 cursor-none"
            onClick={() => {
              document
                .getElementById("cta-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
            Book Hiring Call
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
