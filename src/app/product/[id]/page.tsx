"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useApp } from "@/context/AppContext";
import { Heart, ShoppingBag, ArrowLeft, ShieldCheck, RefreshCw, Truck } from "lucide-react";
import { motion } from "framer-motion";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: ProductPageProps) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { products, addToCart, toggleWishlist, wishlist } = useApp();
  const [product, setProduct] = useState<any>(null);
  
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.image);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [productId, products]);

  if (!product) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <span className="text-xs tracking-[0.3em] text-luxury-gold font-mono">LOADING OBJECT SHEET...</span>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Find related products (same category)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-luxury-black text-luxury-white pt-28">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full flex-grow py-8">
        
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-luxury-grey hover:text-luxury-white transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ARCHIVE</span>
        </Link>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Immersive Gallery (cols 1-7) */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Thumbnails list left (cols 1-2) */}
            <div className="md:col-span-2 flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
              {[product.image, product.imageAlt].filter(Boolean).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-[3/4] w-20 md:w-full bg-luxury-charcoal overflow-hidden border flex-shrink-0 transition-colors duration-300 ${
                    activeImage === img ? "border-luxury-gold" : "border-luxury-charcoal hover:border-luxury-grey"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} detail view ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Large Active Preview (cols 3-12) */}
            <div className="md:col-span-10 aspect-[3/4] bg-luxury-charcoal overflow-hidden relative order-1 md:order-2">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_60%,rgba(13,13,13,0.3)_90%] pointer-events-none" />
            </div>

          </div>

          {/* Sticky Purchase Details (cols 8-12) */}
          <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            
            {/* Title / Description */}
            <div className="space-y-4">
              <span className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-medium">
                {product.category} — {product.collection}
              </span>
              <h1 className="font-serif-luxury text-3xl lg:text-4xl font-bold tracking-wide text-luxury-white leading-tight">
                {product.name}
              </h1>
              <p className="text-xl font-semibold text-luxury-gold-bright tracking-widest font-mono">
                ${product.price}
              </p>
              <div className="h-[1px] bg-luxury-charcoal/50 w-full pt-4" />
              <p className="text-xs text-luxury-grey leading-relaxed font-light pt-2">
                {product.description}
              </p>
            </div>

            {/* Colors Selectors */}
            <div className="space-y-3">
              <span className="text-[9px] tracking-[0.3em] text-luxury-white uppercase font-medium">SHADE</span>
              <div className="flex space-x-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      selectedColor === color ? "border-luxury-gold scale-110" : "border-transparent"
                    }`}
                  >
                    <span
                      className="w-5.5 h-5.5 rounded-full border border-white/5"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Selectors */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] tracking-[0.3em] text-luxury-white uppercase font-medium">SIZE</span>
                <span className="text-[8px] tracking-widest text-luxury-grey hover:text-luxury-white underline transition-colors cursor-pointer">
                  SIZE GUIDE
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-[10px] font-bold tracking-widest flex items-center justify-center transition-colors duration-300 ${
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

            {/* Quantity */}
            <div className="space-y-3">
              <span className="text-[9px] tracking-[0.3em] text-luxury-white uppercase font-medium">QUANTITY</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-luxury-charcoal bg-luxury-charcoal/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-luxury-white hover:text-luxury-gold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-luxury-white hover:text-luxury-gold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-grow py-4.5 bg-luxury-white text-luxury-black font-semibold text-[10px] tracking-[0.3em] hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? "ADDED TO BAG" : "ADD TO CART"}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 h-14 border flex items-center justify-center transition-colors duration-300 ${
                  isWishlisted
                    ? "bg-luxury-charcoal border-luxury-charcoal text-luxury-red"
                    : "border-luxury-charcoal text-luxury-white hover:border-luxury-grey"
                }`}
                aria-label="Add to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-luxury-red" : ""}`} />
              </button>
            </div>

            {/* Luxury Shipping Perks Info */}
            <div className="border-t border-luxury-charcoal pt-6 space-y-4 text-[10px] text-luxury-grey tracking-wide">
              <div className="flex items-center space-x-3">
                <Truck className="w-4.5 h-4.5 text-luxury-gold" />
                <span>FREE PREMIUM GLOBAL DELIVERY (DHL EXPRESS)</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-4.5 h-4.5 text-luxury-gold" />
                <span>COMPLIMENTARY 14-DAY ARCHIVE EXCHANGES</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-4.5 h-4.5 text-luxury-gold" />
                <span>AUTHENTICITY GUARANTEED & SECURED CHECKOUT</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Section */}
        {related.length > 0 && (
          <div className="mt-32 border-t border-luxury-charcoal/50 pt-20 pb-12">
            <h3 className="font-serif-luxury text-2xl font-bold tracking-wide text-center mb-16 text-luxury-white">
              Related Creations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
