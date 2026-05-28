"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Category {
  name: string;
  href: string;
  angle: number; // base rotation angle in degrees
  radius: number; // distance from origin in pixels
}

export default function CurvedNav() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories: Category[] = [
    { name: "NEW ARRIVALS", href: "/shop?collection=New Arrivals", angle: -30, radius: 180 },
    { name: "STREETWEAR", href: "/shop?collection=Streetwear", angle: -18, radius: 220 },
    { name: "OVERSIZED", href: "/shop?collection=Oversized", angle: -6, radius: 260 },
    { name: "ESSENTIALS", href: "/shop?collection=Essentials", angle: 6, radius: 300 },
    { name: "PREMIUM", href: "/shop?collection=Premium Collection", angle: 18, radius: 340 },
    { name: "FORMAL WEAR", href: "/shop?collection=Formal Wear", angle: 30, radius: 380 },
  ];

  return (
    <div className="hidden xl:flex fixed left-0 top-1/2 -translate-y-1/2 z-35 pointer-events-none items-center justify-start h-screen w-[450px]">
      
      {/* Curved Concentric Background Arcs */}
      <div className="absolute -left-[200px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        {categories.map((cat, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          
          return (
            <motion.div
              key={idx}
              className="absolute top-1/2 left-0 rounded-full border-r border-t border-b border-luxury-gold/5"
              style={{
                width: cat.radius * 2,
                height: cat.radius * 2,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                borderColor: isHovered
                  ? "rgba(212, 175, 55, 0.4)"
                  : isAnyHovered
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(255, 255, 255, 0.05)",
                scale: isHovered ? 1.05 : 1,
                rotate: isHovered ? cat.angle + 3 : cat.angle,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            />
          );
        })}
      </div>

      {/* Floating category buttons along concentric curves */}
      <div className="relative w-full h-[600px] flex items-center justify-start pointer-events-auto">
        {categories.map((cat, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          
          // Calculate the positions on a circular arc
          const rad = (cat.angle * Math.PI) / 180;
          const x = cat.radius * Math.cos(rad) - 100; // offset inside screen
          const y = cat.radius * Math.sin(rad);

          return (
            <motion.div
              key={cat.name}
              className="absolute"
              style={{
                left: 0,
                top: "50%",
                x: x,
                y: y,
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: x,
                y: y,
                scale: isHovered ? 1.15 : isAnyHovered ? 0.9 : 1,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <Link
                href={cat.href}
                className="group flex items-center space-x-4 py-2 px-4 focus:outline-none"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Micro arc dot indicator */}
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-luxury-gold/40 group-hover:bg-luxury-gold group-hover:scale-150 transition-all duration-300"
                  animate={{
                    boxShadow: isHovered
                      ? "0 0 12px #D4AF37, 0 0 4px #D4AF37"
                      : "none",
                  }}
                />
                
                {/* Category Label */}
                <div className="flex flex-col">
                  <span
                    className={`text-[10px] tracking-[0.35em] font-medium transition-all duration-500 ${
                      isHovered ? "text-luxury-gold" : "text-luxury-white/60 group-hover:text-luxury-white"
                    }`}
                  >
                    {cat.name}
                  </span>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[7px] tracking-[0.2em] text-luxury-red font-semibold uppercase mt-0.5"
                    >
                      EXPLORE ARCHIVE
                    </motion.span>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
