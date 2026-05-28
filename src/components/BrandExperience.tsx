"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BrandExperience() {
  return (
    <section id="editorial" className="bg-luxury-black py-32 px-6 lg:px-12 relative overflow-hidden z-20">
      
      {/* Background radial reflections */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-luxury-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Large typography and editorial story */}
          <div className="space-y-12">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[9px] tracking-[0.45em] text-luxury-gold uppercase font-medium block mb-4"
              >
                THE BRAND PHILOSOPHY
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif-luxury text-4xl md:text-6xl font-bold tracking-tight text-luxury-white leading-tight"
              >
                Crafted for <br />
                <span className="text-stroke hover:text-luxury-white transition-all duration-700">modern movement.</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 max-w-lg border-l border-luxury-gold/20 pl-6 lg:pl-8"
            >
              <p className="text-sm text-luxury-light-grey leading-relaxed font-light">
                RIGHT NOW stems from a desire to reduce menswear to its purest architectural essence. We strip away the unnecessary, leaving only contours, drape, and textural contrast.
              </p>
              
              <p className="text-xs text-luxury-grey leading-relaxed font-light">
                Our materials are sourced from heritage Italian spinners and assembled under precise conditions. Every stitch, every raw seam, and every seam drape serves a purpose.
              </p>

              <blockquote className="font-serif-luxury text-lg italic text-luxury-gold pt-4">
                “Minimal fashion with maximum presence.”
              </blockquote>
            </motion.div>

            {/* Micro details stats grid */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-luxury-charcoal/50 max-w-md">
              <div>
                <span className="block text-xl font-serif-luxury text-luxury-white font-semibold">100%</span>
                <span className="block text-[8px] tracking-widest text-luxury-grey mt-1 uppercase">ITALIAN YARN</span>
              </div>
              <div>
                <span className="block text-xl font-serif-luxury text-luxury-white font-semibold">EST.</span>
                <span className="block text-[8px] tracking-widest text-luxury-grey mt-1 uppercase">PRESENT GEN</span>
              </div>
              <div>
                <span className="block text-xl font-serif-luxury text-luxury-white font-semibold">AW26</span>
                <span className="block text-[8px] tracking-widest text-luxury-grey mt-1 uppercase">COLLECTION</span>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Model Photography with slow zoom overlay */}
          <motion.div
            className="relative aspect-[3/4] overflow-hidden bg-luxury-charcoal shadow-2xl border border-luxury-charcoal/55"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=800"
              alt="RIGHT NOW Model Autumn Winter Campaign"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-all duration-[2s] ease-[0.16,1,0.3,1]"
            />
            
            {/* Minimal overlay statement */}
            <div className="absolute bottom-10 left-10 right-10 p-8 glassmorphism border border-white/5 flex justify-between items-center z-10">
              <div>
                <span className="text-[7px] tracking-[0.3em] text-luxury-gold uppercase font-bold">CAMPAIGN LOOK 14</span>
                <p className="font-serif-luxury text-sm text-luxury-white font-medium mt-1">Wool Overcoat & Cargo Trousers</p>
              </div>
              
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-red animate-pulse" />
            </div>

            {/* Dark vignetting overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
