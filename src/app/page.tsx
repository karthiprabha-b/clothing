"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RadialNav from "@/components/RadialNav";
import FloatingProductSpace from "@/components/FloatingProductSpace";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [systemActive, setSystemActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Jackets");

  // Cinematic loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Determine active atmosphere class based on category
  const getAtmosphereGlow = () => {
    if (activeCategory === "Footwear") return "from-luxury-red/10 via-transparent to-transparent";
    if (activeCategory === "Jackets") return "from-luxury-silver/5 via-transparent to-transparent";
    if (activeCategory === "Oversized Tees") return "from-luxury-crimson/15 via-transparent to-transparent";
    if (activeCategory === "Essentials") return "from-luxury-gold/10 via-transparent to-transparent";
    return "from-luxury-silver/10 via-transparent to-transparent";
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 bg-luxury-black flex flex-col items-center justify-center selection:bg-transparent"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-serif-luxury text-4xl lg:text-5xl font-black tracking-[0.25em] text-luxury-white">
                RIGHT NOW
              </h2>
              <div className="w-[100px] h-[1px] bg-luxury-red/30 mt-6 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-luxury-red"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
              </div>
              <span className="text-[7px] tracking-[0.4em] font-mono text-luxury-grey mt-6 uppercase">
                INITIALIZING OPERATING SYSTEM...
              </span>
            </motion.div>
          </motion.div>
        ) : !systemActive ? (
          <motion.div
            key="hero-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <Hero onEnter={() => setSystemActive(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="system-interface"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-screen flex flex-col bg-luxury-black text-luxury-white selection:bg-luxury-red selection:text-luxury-black"
          >
            {/* Global Navbar */}
            <Navbar />

            {/* Atmosphere ambient background light */}
            <div className={`absolute inset-0 bg-radial-[circle_at_30%_50%,var(--tw-gradient-stops)] ${getAtmosphereGlow()} transition-all duration-1000 pointer-events-none z-0`} />

            {/* Futuristic Grid Line Separator */}
            <div className="absolute top-[88px] left-0 right-0 h-[1px] bg-white/5 z-20 pointer-events-none" />

            {/* Core Operating Dashboard Section */}
            <div className="flex-grow flex flex-col lg:flex-row items-center justify-between relative max-w-[1600px] mx-auto w-full px-6 lg:px-12 py-24 z-10 min-h-[calc(100vh-80px)] mt-16 overflow-visible">
              
              {/* Radial control column left */}
              <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-start h-[300px] lg:h-auto overflow-visible relative">
                <RadialNav
                  activeCategory={activeCategory}
                  onCategoryChange={(cat) => setActiveCategory(cat)}
                />
              </div>

              {/* Floating product space column right */}
              <div className="w-full lg:w-2/3 flex items-center justify-center overflow-visible">
                <FloatingProductSpace activeCategory={activeCategory} />
              </div>

            </div>

            {/* Global Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
