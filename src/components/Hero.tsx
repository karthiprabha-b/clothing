"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, ArrowRight } from "lucide-react";

interface HeroProps {
  onEnter: () => void;
}

export default function Hero({ onEnter }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const x = (e.clientX / clientWidth - 0.5) * 30; // max shift 30px
      const y = (e.clientY / clientHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnterClick = () => {
    setIsEntering(true);
    setTimeout(() => {
      onEnter();
    }, 1200); // Wait for screen morph animation
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-luxury-black flex items-center justify-center select-none"
      animate={{
        scale: isEntering ? 1.1 : 1,
        filter: isEntering ? "blur(15px)" : "blur(0px)",
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Immersive Cinematic Video Background Placeholder (Image + Spotlight) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600')`,
          transform: `translate3d(${mousePosition.x * -0.6}px, ${mousePosition.y * -0.6}px, 0) scale(1.05)`,
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      {/* Cybernetic High-Tech Grid & Scanner lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black pointer-events-none z-5" />
      
      {/* Pulsing Cyber Red Spotlight Overlay */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-luxury-red/10 blur-[150px] pointer-events-none z-5"
        animate={{
          x: [mousePosition.x * 2.5, mousePosition.x * -2.5],
          y: [mousePosition.y * 2.5, mousePosition.y * -2.5],
        }}
        transition={{ type: "spring", damping: 40, stiffness: 20 }}
      />

      {/* Futuristic Scanner Line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-luxury-red/40 z-5 shadow-[0_0_10px_#D2143A]"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />

      {/* Interface System Telemetry */}
      <div className="absolute top-8 left-8 z-10 text-[8px] font-mono tracking-[0.3em] text-luxury-grey hidden sm:flex items-center space-x-3">
        <Terminal className="w-3 h-3 text-luxury-red" />
        <span>SYS_LOADED // AUTH: OK</span>
      </div>

      <div className="absolute top-8 right-8 z-10 text-[8px] font-mono tracking-[0.3em] text-luxury-grey hidden sm:flex items-center space-x-3">
        <Shield className="w-3 h-3 text-luxury-silver" />
        <span>ENCRYPTED CONNECTION [TLS_1.3]</span>
      </div>

      {/* Hero Core Content */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-4xl px-6">
        
        {/* Editorial caption */}
        <span className="text-[9px] tracking-[0.5em] font-bold text-luxury-red uppercase mb-8 block font-mono">
          FUTURISTIC LUXURY OPERATING SYSTEM
        </span>

        {/* Giant Wide Syne Typography */}
        <h1 className="font-serif-luxury text-6xl md:text-8xl lg:text-[130px] font-extrabold tracking-[0.15em] text-luxury-white leading-none relative">
          RIGHT NOW
          {/* Subtle metal shadow */}
          <span className="absolute left-0 right-0 -bottom-8 font-serif-luxury text-6xl md:text-8xl lg:text-[130px] font-extrabold tracking-[0.15em] text-luxury-red/5 leading-none select-none blur-[4px] transform scale-y-[-0.3] pointer-events-none">
            RIGHT NOW
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs tracking-[0.4em] text-luxury-silver uppercase mt-16 mb-20 font-light leading-relaxed max-w-md font-mono">
          “Built For Presence”
        </p>

        {/* High-tech morphing button */}
        <button
          onClick={handleEnterClick}
          disabled={isEntering}
          className="group relative py-5 px-14 border border-luxury-red/40 hover:border-luxury-red transition-colors duration-500 overflow-hidden cursor-none"
        >
          {/* Laser edge glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-red/0 via-luxury-red/20 to-luxury-red/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <span className="relative z-10 text-[10px] tracking-[0.45em] font-bold text-luxury-white group-hover:text-luxury-red transition-colors duration-500 font-mono flex items-center space-x-3">
            <span>{isEntering ? "CONNECTING..." : "ENTER SYSTEM"}</span>
            {!isEntering && <ArrowRight className="w-4 h-4 text-luxury-red animate-pulse" />}
          </span>
        </button>

      </div>

      {/* Grid footer info */}
      <div className="absolute bottom-8 left-8 right-8 z-10 flex justify-between items-center text-[7px] font-mono tracking-[0.3em] text-luxury-grey">
        <span>PRODUCT DATA MODEL: V2.8</span>
        <span>LATENCY: 12ms</span>
      </div>
    </motion.div>
  );
}
