"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface RadialNavItem {
  id: string;
  label: string;
  categoryName: string; // mapped to products category
  angle: number; // base position angle in degrees
}

interface RadialNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function RadialNav({ activeCategory, onCategoryChange }: RadialNavProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const items: RadialNavItem[] = [
    { id: "jackets", label: "JACKETS", categoryName: "Jackets", angle: -60 },
    { id: "shoes", label: "SHOES", categoryName: "Footwear", angle: -36 },
    { id: "oversized", label: "OVERSIZED", categoryName: "Oversized Tees", angle: -12 },
    { id: "essentials", label: "ESSENTIALS", categoryName: "Essentials", angle: 12 },
    { id: "watches", label: "WATCHES", categoryName: "Accessories", angle: 36 },
    { id: "accessories", label: "ACCESSORIES", categoryName: "Accessories", angle: 60 },
  ];

  // Base layout config
  const radius = 260; // radius of orbit in pixels
  const activeItem = items.find((item) => item.categoryName === activeCategory) || items[0];

  // Calculate rotation offset to bring the active item to the center-right focal point (0 degrees)
  const rotationOffset = -activeItem.angle;

  return (
    <div className="absolute left-[-200px] md:left-[-150px] top-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none z-30 flex items-center justify-center">
      
      {/* Outer Concentric Glowing Orbit Lines */}
      <motion.div
        className="absolute rounded-full border border-luxury-red/20 shadow-[0_0_50px_rgba(210,20,58,0.05)] flex items-center justify-center"
        style={{ width: radius * 2.2, height: radius * 2.2 }}
        animate={{ rotate: rotationOffset }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        {/* Tick marks along orbit to look like automotive dashboard */}
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-3 bg-luxury-grey/25"
            style={{
              transform: `rotate(${i * 15}deg) translateY(-${radius * 1.1}px)`,
            }}
          />
        ))}
      </motion.div>

      {/* Primary Interactive Rotating Circle */}
      <motion.div
        className="absolute rounded-full border border-luxury-silver/5 glassmorphism pointer-events-auto flex items-center justify-center cursor-none"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: rotationOffset }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      >
        
        {/* Inner high-tech circular grid layout */}
        <div className="absolute inset-4 rounded-full border border-dashed border-luxury-red/10 animate-spin-slow pointer-events-none" style={{ animationDuration: "30s" }} />

        {/* Orbit Category Buttons */}
        {items.map((item, idx) => {
          const isSelected = activeCategory === item.categoryName;
          const isHovered = hoveredIdx === idx;
          const rad = (item.angle * Math.PI) / 180;
          
          // Calculate polar coordinate coordinates
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <motion.button
              key={item.id}
              onClick={() => onCategoryChange(item.categoryName)}
              onMouseEnter={() => {
                setHoveredIdx(idx);
                onCategoryChange(item.categoryName);
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              className="absolute w-28 h-10 flex items-center justify-center focus:outline-none cursor-none z-30"
              style={{
                left: "50%",
                top: "50%",
                x: x - 56, // half width
                y: y - 20, // half height
              }}
              // Prevent button rotation relative to text (keeps text upright)
              animate={{
                rotate: -rotationOffset,
                scale: isSelected ? 1.15 : isHovered ? 1.05 : 0.9,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <div className="relative flex flex-col items-center select-none">
                {/* Micro tech indicator box */}
                <motion.div
                  className={`absolute -inset-x-3 -inset-y-1.5 border border-dashed transition-colors duration-500 ${
                    isSelected ? "border-luxury-red" : "border-transparent"
                  }`}
                  animate={{
                    borderColor: isSelected ? "#D2143A" : "rgba(255,255,255,0)",
                    boxShadow: isSelected ? "0 0 10px rgba(210,20,58,0.2)" : "none",
                  }}
                />

                <span
                  className={`text-[10px] tracking-[0.3em] font-bold font-mono transition-colors duration-500 ${
                    isSelected ? "text-luxury-red" : isHovered ? "text-luxury-white" : "text-luxury-grey"
                  }`}
                >
                  {item.label}
                </span>

                {/* Orbit index notation */}
                <span className="text-[6px] tracking-widest font-mono text-luxury-grey/60 mt-1 block">
                  0{idx + 1}
                </span>
              </div>
            </motion.button>
          );
        })}

      </motion.div>

      {/* Centered Collection Dial (Fixed inside rotating ring) */}
      <div className="absolute w-[200px] h-[200px] rounded-full border border-luxury-red/30 bg-luxury-black flex flex-col items-center justify-center text-center p-4 z-20 pointer-events-auto">
        <div className="absolute inset-1 rounded-full border border-luxury-charcoal" />
        {/* Animated radar scanning circle */}
        <motion.div
          className="absolute inset-2 rounded-full border border-t-luxury-red border-r-transparent border-b-transparent border-l-transparent animate-spin"
          style={{ animationDuration: "4s" }}
        />
        
        <span className="text-[7px] tracking-[0.4em] font-mono text-luxury-red font-bold uppercase mb-2">
          COLLECTION ACTIVE
        </span>
        <h4 className="font-serif-luxury text-sm tracking-[0.15em] font-black text-luxury-white max-w-[120px] leading-tight">
          {activeItem.label}
        </h4>
        <span className="text-[6px] tracking-[0.3em] font-mono text-luxury-grey mt-2">
          SYS_STABLE: 100%
        </span>
      </div>

    </div>
  );
}
