"use client";

import { useEffect } from "react";

/**
 * CustomCursor — replaces the default cursor with a branded dot + ring.
 * The dot follows exactly, the ring lags slightly for a premium feel.
 * Hidden on touch/mobile devices via CSS.
 */
export function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      dot.style.left = `${mouseX - 4}px`;
      dot.style.top = `${mouseY - 4}px`;
    };

    // Ring follows with lerp for smoothness
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };

    // Expand ring on hoverable elements
    const expandRing = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(91, 110, 245, 0.8)";
    };

    const contractRing = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(91, 110, 245, 0.5)";
    };

    window.addEventListener("mousemove", moveCursor);
    document
      .querySelectorAll("a, button, [data-cursor-expand]")
      .forEach((el) => {
        el.addEventListener("mouseenter", expandRing);
        el.addEventListener("mouseleave", contractRing);
      });

    animateRing();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
}
