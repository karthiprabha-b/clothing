"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const x = (e.clientX / clientWidth - 0.5) * 20; // max shift 20px
      const y = (e.clientY / clientHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollY } = useScroll();
  // slow zoom out based on scroll
  const imageScale = useTransform(scrollY, [0, 800], [1.1, 1.25]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-luxury-black flex items-center justify-center"
    >
      {/* Background Cinematic Image Wrapper */}
      <motion.div
        className="absolute inset-0 z-0 origin-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600')`,
          scale: imageScale,
          x: mousePosition.x * -0.5,
          y: mousePosition.y * -0.5,
        }}
      />

      {/* Dark Luxury Cinematic Vignette & Red/Gold lighting reflection */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(13,13,13,0.9)_90%] z-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/70 z-5 pointer-events-none" />
      
      {/* Floating Light Reflection */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-luxury-red/10 blur-[120px] pointer-events-none z-5"
        animate={{
          x: [mousePosition.x * 2, mousePosition.x * -2],
          y: [mousePosition.y * 2, mousePosition.y * -2],
        }}
        transition={{ type: "spring", damping: 50, stiffness: 20 }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center max-w-4xl px-6 select-none"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Editorial Subtitle top */}
        <span className="text-[10px] tracking-[0.45em] font-medium text-luxury-gold uppercase mb-6 block drop-shadow-md">
          A/W EDITORIAL PRESENTATION
        </span>

        {/* Massive Logo */}
        <h1 className="font-serif-luxury text-6xl md:text-8xl lg:text-[110px] font-bold tracking-[0.25em] text-luxury-white leading-none relative">
          RIGHT NOW
          {/* Subtle logo reflection shadow */}
          <span className="absolute left-0 right-0 -bottom-8 font-serif-luxury text-6xl md:text-8xl lg:text-[110px] font-bold tracking-[0.25em] text-luxury-white/5 leading-none select-none blur-[2px] transform scale-y-[-0.3]">
            RIGHT NOW
          </span>
        </h1>

        {/* Small subtitle underneath */}
        <p className="text-[11px] md:text-xs tracking-[0.3em] text-luxury-light-grey uppercase mt-12 mb-16 font-light leading-relaxed max-w-md">
          Modern Menswear For The Present Generation
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
          <Link href="/shop" className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-56 py-4.5 px-8 bg-luxury-white text-luxury-black font-semibold text-[10px] tracking-[0.3em] overflow-hidden transition-all duration-500 hover:text-luxury-white active:scale-95 cursor-none">
              <span className="absolute inset-0 bg-luxury-red transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10">SHOP NOW</span>
            </button>
          </Link>
          
          <Link href="#collections" className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-56 py-4.5 px-8 glassmorphism text-luxury-white border border-luxury-white/20 font-semibold text-[10px] tracking-[0.3em] overflow-hidden transition-all duration-500 hover:border-luxury-gold active:scale-95 cursor-none">
              <span className="absolute inset-0 bg-luxury-gold transform scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 group-hover:text-luxury-black transition-colors duration-500">EXPLORE COLLECTION</span>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-[8px] tracking-[0.4em] text-luxury-grey font-medium uppercase">SCROLL</span>
        <ArrowDown className="w-3.5 h-3.5 text-luxury-gold" />
      </motion.div>
    </div>
  );
}
