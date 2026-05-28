"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-luxury-black border-t border-luxury-charcoal/50 text-luxury-white pt-24 pb-12 z-20 relative">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <span className="font-serif-luxury text-2xl tracking-[0.25em] text-luxury-gold block font-semibold">
              RIGHT NOW
            </span>
            <p className="text-xs text-luxury-grey leading-relaxed max-w-[280px]">
              Modern menswear for the present generation. Architecturally minimalist designs blending luxury craft and clean contours.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-luxury-charcoal flex items-center justify-center text-luxury-grey hover:text-luxury-gold hover:border-luxury-gold transition-colors duration-300" aria-label="Instagram">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-luxury-charcoal flex items-center justify-center text-luxury-grey hover:text-luxury-gold hover:border-luxury-gold transition-colors duration-300" aria-label="Twitter">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-luxury-charcoal flex items-center justify-center text-luxury-grey hover:text-luxury-gold hover:border-luxury-gold transition-colors duration-300" aria-label="Location">
                <Compass className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-medium text-luxury-white/90">SHOPPING</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-xs text-luxury-grey hover:text-luxury-gold transition-colors duration-300">
                  Shop All Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Jackets" className="text-xs text-luxury-grey hover:text-luxury-gold transition-colors duration-300">
                  Jackets & Outerwear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Oversized Tees" className="text-xs text-luxury-grey hover:text-luxury-gold transition-colors duration-300">
                  Oversized Silhouettes
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=Essentials" className="text-xs text-luxury-grey hover:text-luxury-gold transition-colors duration-300">
                  Everyday Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-medium text-luxury-white/90">INFORMATION</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-xs text-luxury-grey hover:text-luxury-gold transition-colors duration-300">
                  Account Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-luxury-grey hover:text-luxury-gold transition-colors duration-300">
                  Admin Analytics
                </Link>
              </li>
              <li>
                <a href="#" className="text-xs text-luxury-grey hover:text-luxury-gold transition-colors duration-300">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-luxury-grey hover:text-luxury-gold transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-6">
            <h4 className="text-xs tracking-[0.3em] font-medium text-luxury-white/90">THE PRESENCE</h4>
            <p className="text-xs text-luxury-grey leading-relaxed">
              Subscribe to unlock seasonal campaign catalogs and early access releases.
            </p>
            {subscribed ? (
              <p className="text-xs text-luxury-gold font-medium tracking-wide">
                You are now subscribed to RIGHT NOW Editorial updates.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-luxury-charcoal focus-within:border-luxury-gold transition-colors duration-300 py-1">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none placeholder:text-luxury-grey text-luxury-white tracking-widest"
                  required
                />
                <button type="submit" className="text-luxury-grey hover:text-luxury-gold p-1" aria-label="Submit Email">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-luxury-charcoal/50 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.25em] text-luxury-grey">
          <p>© {new Date().getFullYear()} RIGHT NOW. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span>CRAFTED IN ITALY</span>
            <span>DEVELOPED FOR PRESENT</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
