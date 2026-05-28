"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useApp } from "@/context/AppContext";
import { SlidersHorizontal, ArrowUpDown, ChevronDown, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useApp();

  // Filter & Sort States
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCollection, setSelectedCollection] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<string>("default");

  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Sync search queries
  useEffect(() => {
    const col = searchParams.get("collection");
    const cat = searchParams.get("category");
    if (col) setSelectedCollection(col);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Extract unique filters
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const collections = ["All", ...Array.from(new Set(products.map((p) => p.collection)))];
  const sizes = ["All", "S", "M", "L", "XL", "8", "9", "10", "30", "32", "34", "40", "41", "42", "43", "44"];
  const colors = [
    { name: "All", hex: "" },
    { name: "Matte Black", hex: "#0D0D0D" },
    { name: "Soft White", hex: "#F5F5F5" },
    { name: "Royal Gold", hex: "#C5A059" },
    { name: "Crimson Red", hex: "#8B1E22" },
    { name: "Slate Grey", hex: "#7E7E7E" },
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // Search query from URL
    const query = searchParams.get("q")?.toLowerCase() || "";
    if (query && !product.name.toLowerCase().includes(query) && !product.description.toLowerCase().includes(query)) {
      return false;
    }

    if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
    if (selectedCollection !== "All" && product.collection !== selectedCollection) return false;
    if (selectedSize !== "All" && !product.sizes.includes(selectedSize)) return false;
    
    if (selectedColor !== "All") {
      const colorHex = colors.find((c) => c.name === selectedColor)?.hex;
      if (colorHex && !product.colors.includes(colorHex)) return false;
    }

    if (product.price > priceRange) return false;

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0; // default
  });

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedCollection("All");
    setSelectedSize("All");
    setSelectedColor("All");
    setPriceRange(3000);
    setSortBy("default");
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxury-black text-luxury-white relative pt-28">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full flex-grow py-12">
        
        {/* Editorial Header */}
        <div className="border-b border-luxury-charcoal/50 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-medium">
              THE PRESENT CATALOGUE
            </span>
            <h1 className="font-serif-luxury text-4xl lg:text-6xl font-bold tracking-tight text-luxury-white mt-3">
              Shop Archive
            </h1>
          </div>
          <span className="text-[10px] tracking-widest text-luxury-grey mt-4 md:mt-0 font-mono">
            SHOWING {sortedProducts.length} OF {products.length} OBJECTS
          </span>
        </div>

        {/* Toolbar: Filters and Sorting controls */}
        <div className="flex items-center justify-between border-b border-luxury-charcoal/30 pb-6 mb-12 relative z-30">
          <button
            onClick={() => setFilterSidebarOpen(true)}
            className="flex items-center space-x-3 py-2 px-4 border border-luxury-charcoal hover:border-luxury-gold transition-colors duration-300 text-xs tracking-widest font-semibold cursor-none"
          >
            <SlidersHorizontal className="w-4 h-4 text-luxury-gold" />
            <span>FILTER ARCHIVE</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center space-x-3 py-2 px-4 border border-luxury-charcoal hover:border-luxury-gold transition-colors duration-300 text-xs tracking-widest font-semibold cursor-none"
            >
              <ArrowUpDown className="w-4 h-4 text-luxury-gold" />
              <span>SORT BY</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {sortDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortDropdownOpen(false)} />
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-luxury-charcoal border border-luxury-charcoal/80 shadow-2xl z-20 flex flex-col"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {[
                      { value: "default", label: "Default Sort" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "name-asc", label: "Product Name A-Z" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setSortDropdownOpen(false);
                        }}
                        className={`text-left text-xs tracking-wider py-3 px-4 hover:bg-luxury-black transition-colors duration-300 flex items-center justify-between ${
                          sortBy === opt.value ? "text-luxury-gold" : "text-luxury-white/80"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.value && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Masonry Grid */}
        {sortedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="font-serif-luxury text-xl text-luxury-grey">No products conform to filters.</span>
            <button
              onClick={clearAllFilters}
              className="mt-6 text-[10px] tracking-[0.25em] text-luxury-gold border-b border-luxury-gold pb-1 hover:text-luxury-white hover:border-luxury-white transition-colors duration-300"
            >
              RESET ALL SELECTIONS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {sortedProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}

      </div>

      {/* Floating Filter Sidebar Drawer */}
      <AnimatePresence>
        {filterSidebarOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Overlay closer */}
            <motion.div
              className="absolute inset-0 bg-luxury-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterSidebarOpen(false)}
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                className="w-screen max-w-md bg-luxury-black border-l border-luxury-charcoal p-8 flex flex-col justify-between"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-luxury-charcoal pb-4">
                  <h3 className="font-serif-luxury text-lg font-bold tracking-wide">FILTER DESIGNS</h3>
                  <button
                    onClick={() => setFilterSidebarOpen(false)}
                    className="text-luxury-grey hover:text-luxury-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Filters Content (Scrollable) */}
                <div className="flex-grow overflow-y-auto py-8 space-y-8 scrollbar-none">
                  
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-medium">CATEGORY</span>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`py-2 px-4 border text-[9px] font-bold tracking-wider transition-all duration-300 ${
                            selectedCategory === cat
                              ? "bg-luxury-white border-luxury-white text-luxury-black"
                              : "border-luxury-charcoal text-luxury-white/70 hover:border-luxury-grey"
                          }`}
                        >
                          {cat.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Collection Filter */}
                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-medium">COLLECTION</span>
                    <div className="flex flex-wrap gap-2">
                      {collections.map((col) => (
                        <button
                          key={col}
                          onClick={() => setSelectedCollection(col)}
                          className={`py-2 px-4 border text-[9px] font-bold tracking-wider transition-all duration-300 ${
                            selectedCollection === col
                              ? "bg-luxury-white border-luxury-white text-luxury-black"
                              : "border-luxury-charcoal text-luxury-white/70 hover:border-luxury-grey"
                          }`}
                        >
                          {col.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-medium">SIZING</span>
                    <div className="grid grid-cols-5 gap-2">
                      {sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`h-10 border text-[9px] font-bold tracking-wider flex items-center justify-center transition-all duration-300 ${
                            selectedSize === sz
                              ? "bg-luxury-white border-luxury-white text-luxury-black"
                              : "border-luxury-charcoal text-luxury-white/70 hover:border-luxury-grey"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-medium">SHADES</span>
                    <div className="flex flex-wrap gap-3">
                      {colors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`group flex items-center space-x-2 py-1.5 px-3 rounded-full border transition-all duration-300 ${
                            selectedColor === col.name
                              ? "border-luxury-gold bg-luxury-gold/5"
                              : "border-luxury-charcoal hover:border-luxury-grey"
                          }`}
                        >
                          {col.hex && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/10"
                              style={{ backgroundColor: col.hex }}
                            />
                          )}
                          <span className="text-[9px] tracking-widest text-luxury-white">{col.name.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-medium">MAX PRICE</span>
                      <span className="text-xs font-semibold tracking-wider text-luxury-white font-mono">${priceRange}</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="3000"
                      step="50"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-luxury-gold bg-luxury-charcoal h-1 rounded"
                    />
                  </div>

                </div>

                {/* Footer Controls */}
                <div className="border-t border-luxury-charcoal pt-6 flex gap-4">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 py-4 border border-luxury-charcoal hover:border-luxury-white transition-colors duration-300 text-[10px] tracking-[0.25em] font-semibold"
                  >
                    RESET ALL
                  </button>
                  <button
                    onClick={() => setFilterSidebarOpen(false)}
                    className="flex-1 py-4 bg-luxury-white text-luxury-black hover:bg-luxury-gold transition-colors duration-300 text-[10px] tracking-[0.25em] font-bold"
                  >
                    APPLY FILTERS
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <span className="text-xs tracking-[0.3em] text-luxury-gold font-mono">LOADING CATALOGUE...</span>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
