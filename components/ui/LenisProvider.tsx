"use client";

import { useEffect, useRef, ReactNode } from "react";

interface LenisProviderProps {
  children: ReactNode;
}

/**
 * LenisProvider — wraps the app in Lenis smooth scrolling.
 * Lenis intercepts scroll events and provides buttery smooth physics-based scrolling.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // RAF loop for Lenis
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Sync scroll progress bar
      lenis.on("scroll", (e: any) => {
        const progress = document.getElementById("scroll-progress");
        if (progress) {
          const scrollPercent =
            (e.scroll / (document.body.scrollHeight - window.innerHeight)) *
            100;
          progress.style.width = `${scrollPercent}%`;
        }
      });
    };

    initLenis();

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
