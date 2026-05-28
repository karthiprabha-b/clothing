"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useApp, Product } from "@/context/AppContext";
import { ShoppingBag, Eye, Heart } from "lucide-react";

interface FloatingProductSpaceProps {
  activeCategory: string;
}

export default function FloatingProductSpace({ activeCategory }: FloatingProductSpaceProps) {
  const { products, addToCart, toggleWishlist, wishlist } = useApp();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Filter products by active category
  const activeProducts = products.filter((p) => p.category === activeCategory).slice(0, 3);

  // Fallback to first products if none conform
  const displayProducts = activeProducts.length > 0 ? activeProducts : products.slice(0, 3);

  return (
    <div className="relative w-full min-h-[500px] h-full flex items-center justify-center p-6 md:p-12 z-20 overflow-visible">
      
      {/* Absolute category spotlight backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          key={activeCategory}
          className="w-[400px] h-[400px] rounded-full blur-[160px] opacity-25"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.3 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundColor:
              activeCategory === "Footwear"
                ? "#D2143A" // Red
                : activeCategory === "Jackets"
                ? "#E5E5E5" // Silver
                : activeCategory === "Oversized Tees"
                ? "#8B1E22" // Crimson
                : "#C5A059", // Gold
          }}
        />
      </div>

      {/* Floating Space Layout (Asymmetrical offset elements) */}
      <div className="relative w-full max-w-[900px] h-[550px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10 pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {displayProducts.map((p, idx) => {
            const isHovered = hoveredProduct === p.id;
            const isWishlisted = wishlist.includes(p.id);

            return (
              <motion.div
                key={p.id}
                className={`relative flex flex-col justify-between glassmorphism border border-white/5 p-6 hover:border-luxury-red/30 transition-colors duration-500 overflow-hidden ${
                  idx === 0
                    ? "col-span-1 h-[420px] self-start"
                    : idx === 1
                    ? "col-span-1 h-[350px] md:translate-y-16"
                    : "col-span-1 md:col-span-2 h-[320px] max-w-lg mx-auto md:-translate-y-8"
                }`}
                style={{
                  boxShadow: isHovered ? "0 0 30px rgba(210,20,58,0.15)" : "none",
                }}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProduct(p.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                
                {/* Independent internal floating animation container */}
                <motion.div
                  className="w-full h-full flex flex-col justify-between"
                  animate={{
                    y: idx === 0 ? [0, -12, 0] : idx === 1 ? [0, 12, 0] : [0, -8, 0],
                    rotate: idx === 0 ? [0.3, -0.3, 0.3] : [-0.3, 0.3, -0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: idx === 0 ? 5 : idx === 1 ? 6 : 5.5,
                    ease: "easeInOut",
                  }}
                >
                  {/* corner frame styling accents */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-luxury-grey/30" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-luxury-grey/30" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-luxury-grey/30" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-luxury-grey/30" />

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(p.id);
                    }}
                    className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-luxury-black/60 border border-white/5 flex items-center justify-center text-luxury-white hover:text-luxury-red transition-colors duration-300"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-luxury-red text-luxury-red" : ""}`} />
                  </button>

                  {/* Floating Image Core */}
                  <Link href={`/product/${p.id}`} className="relative block h-[70%] w-full overflow-hidden bg-luxury-black mb-4">
                    <motion.img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-center"
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                    
                    {/* Subtle scan gradient line */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-x-0 h-[2px] bg-luxury-red/50 shadow-[0_0_8px_#D2143A] pointer-events-none"
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      />
                    )}
                    
                    {/* Hover Actions Drawer */}
                    <div className="absolute inset-0 bg-luxury-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(p, 1, p.colors[0], p.sizes[0]);
                        }}
                        className="w-10 h-10 rounded-full bg-luxury-white text-luxury-black flex items-center justify-center hover:bg-luxury-red hover:text-luxury-white transition-colors"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/product/${p.id}`}
                        className="w-10 h-10 rounded-full bg-luxury-black/80 text-luxury-white flex items-center justify-center hover:bg-luxury-white hover:text-luxury-black border border-white/10 transition-colors"
                        aria-label="View sheet"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </Link>

                  {/* Product Metadata Info */}
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[7px] tracking-[0.25em] font-mono text-luxury-grey block mb-1">
                        SYS_MODEL_{p.id}
                      </span>
                      <h3 className="font-serif-luxury text-[11px] tracking-widest font-black text-luxury-white hover:text-luxury-red transition-colors duration-300">
                        {p.name}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-luxury-red tracking-wider">
                      ${p.price}
                    </span>
                  </div>
                </motion.div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
