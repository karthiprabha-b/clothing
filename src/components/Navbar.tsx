"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Sliders, Menu, X } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { cart, wishlist } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks = [
    { name: "SHOP", href: "/shop" },
    { name: "EDITORIAL", href: "/#editorial" },
    { name: "COLLECTIONS", href: "/#collections" },
    { name: "ACCOUNT", href: "/dashboard" },
    { name: "ADMIN", href: "/admin" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          
          {/* Logo Left */}
          <Link href="/" className="group flex flex-col items-start">
            <span className="font-serif-luxury text-xl lg:text-2xl tracking-[0.25em] text-luxury-white group-hover:text-luxury-gold transition-colors duration-500 font-semibold">
              RIGHT NOW
            </span>
            <span className="text-[7px] tracking-[0.4em] text-luxury-grey group-hover:text-luxury-white transition-colors duration-500 uppercase mt-0.5">
              EST. PRESENT
            </span>
          </Link>

          {/* Menu Center */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-xs tracking-[0.25em] font-medium text-luxury-white/70 hover:text-luxury-white transition-colors duration-300 py-1"
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-luxury-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Icons Right */}
          <div className="flex items-center space-x-6">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-luxury-white/80 hover:text-luxury-gold transition-colors duration-300 p-1"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/dashboard?tab=wishlist"
              className="relative text-luxury-white/80 hover:text-luxury-gold transition-colors duration-300 p-1"
              aria-label="Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-luxury-red text-[8px] flex items-center justify-center rounded-full font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative text-luxury-white/80 hover:text-luxury-gold transition-colors duration-300 p-1"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-luxury-gold text-[8px] flex items-center justify-center rounded-full font-bold text-luxury-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account Icon */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-block text-luxury-white/80 hover:text-luxury-gold transition-colors duration-300 p-1"
              aria-label="Account"
            >
              <User className="w-4.5 h-4.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-luxury-white/80 hover:text-luxury-white p-1"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Floating Interactive Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-luxury-black/95 backdrop-blur-md flex flex-col justify-start pt-32 px-6 lg:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-[1200px] mx-auto w-full">
              <div className="flex justify-between items-center border-b border-luxury-charcoal pb-6">
                <input
                  type="text"
                  placeholder="SEARCH THE PRESENT COLLECTION..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xl lg:text-3xl font-serif-luxury text-luxury-white placeholder:text-luxury-grey focus:outline-none tracking-wider"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-luxury-grey hover:text-luxury-white transition-colors duration-300"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {searchQuery && (
                <div className="mt-12">
                  <h3 className="text-xs tracking-[0.3em] text-luxury-grey mb-6">SUGGESTIONS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      href={`/shop?q=${searchQuery}`}
                      onClick={() => setSearchOpen(false)}
                      className="text-sm text-luxury-white/80 hover:text-luxury-gold hover:translate-x-2 transition-all duration-300"
                    >
                      View all results for "{searchQuery}"
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-luxury-black/98 flex flex-col justify-between p-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
          >
            <div>
              <div className="flex justify-between items-center mb-16">
                <span className="font-serif-luxury text-xl tracking-[0.2em]">RIGHT NOW</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-luxury-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-serif-luxury tracking-widest text-luxury-white hover:text-luxury-gold block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t border-luxury-charcoal pt-8">
              <p className="text-[10px] tracking-[0.2em] text-luxury-grey">
                © {new Date().getFullYear()} RIGHT NOW. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
