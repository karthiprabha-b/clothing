"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { MoveRight } from "lucide-react";

interface CollectionItem {
  title: string;
  subtitle: string;
  image: string;
  categoryLink: string;
  number: string;
}

const ITEMS: CollectionItem[] = [
  {
    title: "STRUCTURED JACKETS",
    subtitle: "Raw edges and double-faced Italian virgin wool tailoring.",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800",
    categoryLink: "/shop?category=Jackets",
    number: "01",
  },
  {
    title: "TEXTURAL SHIRTS",
    subtitle: "Loose silk silhouettes presenting crumpled, resort-collar styling.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
    categoryLink: "/shop?category=Shirts",
    number: "02",
  },
  {
    title: "OVERSIZED SEAM TEES",
    subtitle: "Heavyweight combed cotton built with rear accent lines.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
    categoryLink: "/shop?category=Oversized Tees",
    number: "03",
  },
  {
    title: "CREPE SOLE FOOTWEAR",
    subtitle: "Italian calfskin suede boots finished with golden heel hot-stamps.",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
    categoryLink: "/shop?category=Footwear",
    number: "04",
  },
  {
    title: "CONCENTRIC ACCESSORIES",
    subtitle: "Vermeil rings and hand-forged minimal hardware pieces.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    categoryLink: "/shop?category=Accessories",
    number: "05",
  },
];

export default function HorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Custom horizontal wheel trigger support
  const handleScroll = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      // If user scrolls vertically, translate it to horizontal scroll
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section className="bg-luxury-charcoal py-32 overflow-hidden z-20 relative border-y border-luxury-charcoal/50">
      
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <span className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-medium">
            THE ANTHOLOGY
          </span>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-bold tracking-wide mt-3 text-luxury-white">
            Campaign Banners
          </h2>
        </div>
        <p className="text-xs text-luxury-grey max-w-sm mt-4 md:mt-0 leading-relaxed font-light">
          Swipe or scroll sideways to traverse our architectural silhouettes and editorial menswear categories.
        </p>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollRef}
        onWheel={handleScroll}
        className="flex overflow-x-auto space-x-8 px-6 lg:px-12 pb-12 cursor-grab active:cursor-grabbing scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex-shrink-0 w-[300px] sm:w-[400px] md:w-[500px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image Wrap */}
            <Link href={item.categoryLink} className="relative block aspect-[16/10] overflow-hidden bg-luxury-black mb-6 group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-[1.2s] ease-[0.16,1,0.3,1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Category code / banner overlay */}
              <div className="absolute top-6 left-6 text-xs text-luxury-gold tracking-widest font-mono">
                {item.number}
              </div>
              <div className="absolute bottom-6 right-6 text-luxury-white/0 group-hover:text-luxury-gold transition-all duration-500 flex items-center space-x-2">
                <span className="text-[9px] tracking-widest">DISCOVER</span>
                <MoveRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Metadata Text */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif-luxury text-lg md:text-xl font-bold tracking-wide text-luxury-white">
                  {item.title}
                </h3>
                <p className="text-xs text-luxury-grey mt-2 max-w-[90%] leading-relaxed font-light">
                  {item.subtitle}
                </p>
              </div>
              
              <Link href={item.categoryLink}>
                <span className="text-[9px] tracking-[0.25em] text-luxury-gold hover:text-luxury-white transition-colors duration-300 font-semibold mt-1 block">
                  EXPLORE
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
