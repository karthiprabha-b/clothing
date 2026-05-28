"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Eye, X } from "lucide-react";
import { useApp, Product } from "@/context/AppContext";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export default function ProductCard({ product, index = 0, className = "" }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1, selectedColor, selectedSize);
  };

  return (
    <>
      <motion.div
        className={`group relative flex flex-col justify-between ${className}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full glassmorphism flex items-center justify-center text-luxury-white hover:text-luxury-red transition-colors duration-300"
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-luxury-red text-luxury-red" : ""}`} />
        </button>

        {/* Product Image Frame */}
        <Link href={`/product/${product.id}`} className="relative block aspect-[3/4] overflow-hidden bg-luxury-charcoal w-full mb-6">
          
          {/* Main Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transform transition-all duration-1000 ease-[0.16,1,0.3,1]"
            style={{
              scale: hovered ? 1.05 : 1,
              filter: hovered ? "brightness(0.9) blur(1px)" : "brightness(1) blur(0px)",
            }}
          />

          {/* Hover Image Swap */}
          {product.imageAlt && (
            <motion.img
              src={product.imageAlt}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-1000 ease-[0.16,1,0.3,1] pointer-events-none"
              style={{
                opacity: hovered ? 1 : 0,
                scale: hovered ? 1.05 : 1,
              }}
            />
          )}

          {/* Hover Menu Overlay */}
          <div className="absolute inset-0 bg-luxury-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6">
            
            {/* Quick Actions Container */}
            <div className="flex flex-col space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              
              {/* Quick View Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuickViewOpen(true);
                }}
                className="w-full py-3 bg-luxury-black/60 backdrop-blur-md text-luxury-white text-[9px] tracking-[0.25em] font-semibold border border-luxury-white/10 hover:border-luxury-gold hover:text-luxury-gold transition-colors duration-300 flex items-center justify-center space-x-2 cursor-none"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>QUICK VIEW</span>
              </button>

              {/* Add to Bag Button */}
              <button
                onClick={handleQuickAdd}
                className="w-full py-3 bg-luxury-white text-luxury-black text-[9px] tracking-[0.25em] font-bold hover:bg-luxury-gold transition-colors duration-300 flex items-center justify-center space-x-2 cursor-none"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO BAG</span>
              </button>
            </div>
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex flex-col space-y-2">
          {/* Collection Name */}
          <span className="text-[8px] tracking-[0.3em] text-luxury-grey uppercase">
            {product.collection}
          </span>
          
          <div className="flex justify-between items-start">
            {/* Product Name */}
            <Link
              href={`/product/${product.id}`}
              className="font-serif-luxury text-sm tracking-wide text-luxury-white hover:text-luxury-gold transition-colors duration-300 leading-tight max-w-[80%]"
            >
              {product.name}
            </Link>
            
            {/* Price */}
            <span className="text-xs font-semibold text-luxury-gold-bright tracking-widest font-mono">
              ${product.price}
            </span>
          </div>
        </div>

      </motion.div>

      {/* Quick View Lightbox Modal */}
      <AnimatePresence>
        {quickViewOpen && (
          <div className="fixed inset-0 z-50 bg-luxury-black/90 backdrop-blur-md flex items-center justify-center p-4">
            
            {/* Background Closer */}
            <div className="absolute inset-0" onClick={() => setQuickViewOpen(false)} />

            {/* Modal Body */}
            <motion.div
              className="relative w-full max-w-4xl bg-luxury-black border border-luxury-charcoal flex flex-col md:flex-row z-10 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewOpen(false)}
                className="absolute top-4 right-4 z-20 text-luxury-grey hover:text-luxury-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Images */}
              <div className="w-full md:w-1/2 aspect-[4/5] bg-luxury-charcoal relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] tracking-[0.35em] text-luxury-gold uppercase font-medium">
                      {product.category} — {product.collection}
                    </span>
                    <h2 className="font-serif-luxury text-2xl lg:text-3xl font-bold tracking-wide text-luxury-white mt-2 leading-tight">
                      {product.name}
                    </h2>
                    <p className="text-lg font-semibold text-luxury-gold-bright tracking-widest font-mono mt-2">
                      ${product.price}
                    </p>
                  </div>

                  <p className="text-xs text-luxury-grey leading-relaxed">
                    {product.description}
                  </p>

                  {/* Size selector */}
                  <div className="space-y-3">
                    <span className="text-[9px] tracking-[0.25em] text-luxury-white">SELECT SIZE</span>
                    <div className="flex space-x-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 border text-[9px] font-bold tracking-widest flex items-center justify-center transition-colors duration-300 ${
                            selectedSize === size
                              ? "bg-luxury-white border-luxury-white text-luxury-black"
                              : "border-luxury-charcoal text-luxury-white hover:border-luxury-grey"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color selector */}
                  <div className="space-y-3">
                    <span className="text-[9px] tracking-[0.25em] text-luxury-white">SELECT SHADE</span>
                    <div className="flex space-x-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            selectedColor === color
                              ? "border-luxury-gold scale-110"
                              : "border-transparent"
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div className="mt-8 space-y-4">
                  <button
                    onClick={() => {
                      addToCart(product, 1, selectedColor, selectedSize);
                      setQuickViewOpen(false);
                    }}
                    className="w-full py-4 bg-luxury-white text-luxury-black font-semibold text-[10px] tracking-[0.3em] hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>
                  <Link href={`/product/${product.id}`} className="block text-center">
                    <span className="text-[9px] tracking-[0.25em] text-luxury-grey hover:text-luxury-white transition-colors duration-300">
                      VIEW FULL DETAIL SHEET
                    </span>
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
