"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const addHoverListeners = () => {
      const targets = document.querySelectorAll("a, button, select, input, [role='button'], .interactive-hover");
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setIsHovered(true));
        target.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    // Run listeners immediately
    addHoverListeners();

    // Re-bind listeners on DOM mutations (when route changes or items load)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* Background glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-80 rounded-full pointer-events-none z-40 bg-radial from-luxury-gold/5 via-luxury-red/1 to-transparent blur-3xl"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Main cursor dot/ring */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-50 mix-blend-difference bg-luxury-white"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 4 : 1,
        }}
        animate={{
          backgroundColor: isHovered ? "#C5A059" : "#F5F5F5",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
      {/* Outer elegant ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-luxury-gold/30 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-38%",
          translateY: "-38%",
          scale: isHovered ? 1.6 : 1,
        }}
        animate={{
          borderColor: isHovered ? "#8B1E22" : "rgba(197, 160, 89, 0.3)",
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      />
    </>
  );
}
