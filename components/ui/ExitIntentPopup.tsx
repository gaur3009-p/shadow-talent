"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ExitIntentPopup — triggers when mouse moves to top of viewport (exit intent).
 * Shows once per session via sessionStorage.
 * Provides a conversion opportunity at the last moment.
 */
export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    const shown = sessionStorage.getItem("exit_popup_shown");
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setVisible(true);
        setHasShown(true);
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    };

    // Delay attaching listener so it doesn't fire on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const close = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9000]"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9001] w-full max-w-lg"
          >
            <div className="glass-card rounded-2xl p-10 mx-4 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-electric/10 blur-3xl" />

              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 text-chalk-dim hover:text-chalk transition-colors text-xl cursor-none"
              >
                ✕
              </button>

              <div className="relative z-10 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-display text-2xl font-bold text-chalk mb-3">
                  Wait — your next hire is{" "}
                  <span className="gradient-text-electric">7 days away</span>
                </h3>
                <p className="text-chalk-dim mb-6">
                  Get a free talent brief for your next role. No commitment, no
                  agency speak — just the right candidates, fast.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={close}
                    className="btn-electric w-full py-3 rounded-xl font-display font-semibold cursor-none"
                  >
                    Get My Free Talent Brief →
                  </button>
                  <button
                    onClick={close}
                    className="text-chalk-dim text-sm hover:text-chalk transition-colors cursor-none"
                  >
                    No thanks, I'll keep searching alone
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
