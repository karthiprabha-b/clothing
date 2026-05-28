"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurvedNav from "@/components/CurvedNav";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import HorizontalScroll from "@/components/HorizontalScroll";
import BrandExperience from "@/components/BrandExperience";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Cinematic loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
              <h2 className="font-serif-luxury text-4xl lg:text-5xl font-bold tracking-[0.3em] text-luxury-white">
                RIGHT NOW
              </h2>
              <div className="w-[100px] h-[1px] bg-luxury-gold/30 mt-6 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-luxury-gold"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
              </div>
              <span className="text-[7px] tracking-[0.45em] text-luxury-grey mt-6 uppercase">
                ESTABLISHED IN THE PRESENT
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen flex flex-col"
          >
            {/* Global Navbar */}
            <Navbar />

            {/* Left curved arc floating categories */}
            <CurvedNav />

            {/* Hero Section */}
            <Hero />

            {/* Section 3: Curated showcases */}
            <FeaturedShowcase />

            {/* Section 4: Collection Slider */}
            <HorizontalScroll />

            {/* Section 5: Brand Experience */}
            <BrandExperience />

            {/* Global Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
