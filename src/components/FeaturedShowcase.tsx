"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function FeaturedShowcase() {
  const { products } = useApp();

  // Pick three prominent products for the showcase
  const featured = products.slice(0, 3);

  if (featured.length < 3) return null;

  return (
    <section id="collections" className="bg-luxury-black py-32 px-6 lg:px-12 relative overflow-hidden z-20">
      
      {/* Background Graphic Ornaments */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[15vw] font-bold tracking-[0.25em] text-luxury-charcoal/10 font-serif-luxury select-none pointer-events-none z-0">
        CURATED
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-medium"
          >
            A/W CAMPAIGN SELECTIONS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl md:text-5xl font-bold tracking-wide mt-3 text-luxury-white"
          >
            Featured Pieces
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-[1px] bg-luxury-gold mt-6"
          />
        </div>

        {/* Asymmetrical Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Product 1 (Smaller) */}
          <div className="col-span-1 lg:col-span-3 lg:pt-24 order-2 lg:order-1">
            <div className="space-y-4">
              <ProductCard product={featured[1]} index={1} />
              <div className="hidden lg:block border-t border-luxury-charcoal pt-4 mt-6">
                <p className="text-[10px] tracking-widest text-luxury-grey leading-relaxed">
                  02 / ARCHITECTURAL LAYER<br />
                  A dynamic representation of modern drapery. Heavy terry cotton tailored with dropped shoulders.
                </p>
              </div>
            </div>
          </div>

          {/* Center Product: Product 0 (Large Primary Card) */}
          <div className="col-span-1 lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-[500px] space-y-6">
              <span className="text-[8px] tracking-[0.5em] text-luxury-red font-bold text-center block mb-2">
                • THE MASTERPIECE
              </span>
              <ProductCard product={featured[0]} index={0} className="scale-100 md:scale-105" />
              <div className="text-center mt-6">
                <span className="font-serif-luxury text-lg italic text-luxury-grey">
                  "Perfect symmetry in structure."
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Product 2 (Smaller) */}
          <div className="col-span-1 lg:col-span-3 lg:pb-24 order-3">
            <div className="space-y-4">
              <div className="hidden lg:block border-b border-luxury-charcoal pb-4 mb-6">
                <p className="text-[10px] tracking-widest text-luxury-grey text-right leading-relaxed">
                  03 / RAW TEXTILE CRAFT<br />
                  Blending organic silk textures with modern resort-style silhouettes.
                </p>
              </div>
              <ProductCard product={featured[2]} index={2} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
