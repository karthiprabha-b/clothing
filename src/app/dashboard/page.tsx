"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import { ShoppingBag, Heart, User, MapPin, Settings, Check, LogOut, ArrowRight, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function DashboardContent() {
  const searchParams = useSearchParams();
  const { wishlist, orders, products, toggleWishlist, addToCart } = useApp();
  
  // Tab states: 'orders' | 'wishlist' | 'address' | 'settings'
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "address" | "settings">("orders");

  // Sync tab with search parameters (?tab=wishlist)
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "wishlist") setActiveTab("wishlist");
    else if (tab === "orders") setActiveTab("orders");
    else if (tab === "address") setActiveTab("address");
    else if (tab === "settings") setActiveTab("settings");
  }, [searchParams]);

  // Profile Form States
  const [profileName, setProfileName] = useState("Karthikeyan Balasubramanian");
  const [profileEmail, setProfileEmail] = useState("karthikeyan@present.luxury");
  const [profileSaved, setProfileSaved] = useState(false);

  // Address States
  const [savedAddresses, setSavedAddresses] = useState([
    { id: "1", title: "Milan Atelier", address: "14 Via Montenapoleone, Milan, 20121, Italy" },
    { id: "2", title: "Corporate Residence", address: "88 Apple Loop, Cupertino, CA, 95014, USA" },
  ]);
  const [newAddrTitle, setNewAddrTitle] = useState("");
  const [newAddrContent, setNewAddrContent] = useState("");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddrTitle.trim() && newAddrContent.trim()) {
      setSavedAddresses([...savedAddresses, { id: Math.random().toString(), title: newAddrTitle, address: newAddrContent }]);
      setNewAddrTitle("");
      setNewAddrContent("");
    }
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses(savedAddresses.filter((a) => a.id !== id));
  };

  // Find wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white flex flex-col pt-28">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full flex-grow py-12">
        
        {/* Header */}
        <div className="border-b border-luxury-charcoal/50 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-medium">
              CUSTOMER SUITE
            </span>
            <h1 className="font-serif-luxury text-4xl lg:text-5xl font-bold tracking-tight text-luxury-white mt-3">
              Dashboard
            </h1>
          </div>
          <span className="text-xs text-luxury-grey mt-4 md:mt-0 font-light">
            WELCOME BACK, <strong className="text-luxury-white font-semibold">{profileName.toUpperCase()}</strong>
          </span>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Side Menu (cols 1-3) */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "orders", label: "ORDER ARCHIVES", icon: ShoppingBag, count: orders.length },
              { id: "wishlist", label: "WISHLIST CATALOG", icon: Heart, count: wishlist.length },
              { id: "address", label: "SAVED ADRESSES", icon: MapPin },
              { id: "settings", label: "PROFILE SETTINGS", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-4 px-6 border text-left text-[10px] tracking-[0.25em] font-semibold flex items-center justify-between transition-colors duration-300 cursor-none ${
                    isActive
                      ? "bg-luxury-white border-luxury-white text-luxury-black"
                      : "border-luxury-charcoal text-luxury-white hover:border-luxury-grey"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                      isActive ? "bg-luxury-black text-luxury-white" : "bg-luxury-charcoal text-luxury-gold"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Area: (cols 4-12) */}
          <div className="lg:col-span-9 glassmorphism border border-luxury-charcoal p-8 lg:p-12 min-h-[450px]">
            
            {/* 1. ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-8">
                <h3 className="font-serif-luxury text-xl font-bold tracking-wide">ORDER HISTORY</h3>
                {orders.length === 0 ? (
                  <div className="py-16 text-center text-luxury-grey text-xs tracking-wider space-y-6">
                    <p>You have not placed any orders yet.</p>
                    <Link href="/shop" className="inline-block py-4 px-10 bg-luxury-white text-luxury-black font-bold text-[9px] tracking-[0.3em]">
                      DISCOVER CATALOGUE
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-luxury-charcoal/80 p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] tracking-wider text-luxury-grey border-b border-luxury-charcoal pb-4 gap-2">
                          <div>
                            ORDER ID: <span className="text-luxury-white font-mono font-semibold">#{order.id}</span>
                          </div>
                          <div>
                            DATE: <span className="text-luxury-white font-semibold">{order.date}</span>
                          </div>
                          <div>
                            PAYMENT: <span className="text-luxury-gold font-semibold">{order.paymentMethod}</span>
                          </div>
                          <div>
                            STATUS: <span className="text-emerald-500 font-semibold uppercase">{order.status}</span>
                          </div>
                        </div>

                        {/* Order items */}
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between items-center text-xs">
                              <div className="flex items-center space-x-3">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.selectedColor }} />
                                <span>
                                  {item.product.name} (Size {item.selectedSize}) <span className="text-luxury-grey">x{item.quantity}</span>
                                </span>
                              </div>
                              <span className="font-mono text-luxury-grey">${item.product.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-luxury-charcoal pt-4 flex justify-between items-center text-xs">
                          <span className="text-luxury-grey">Total Settlement</span>
                          <span className="font-mono font-bold text-luxury-gold text-sm">${order.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="space-y-8">
                <h3 className="font-serif-luxury text-xl font-bold tracking-wide">MY WISHLIST</h3>
                {wishlistProducts.length === 0 ? (
                  <div className="py-16 text-center text-luxury-grey text-xs tracking-wider space-y-6">
                    <p>No objects saved in your wishlist archive.</p>
                    <Link href="/shop" className="inline-block py-4 px-10 bg-luxury-white text-luxury-black font-bold text-[9px] tracking-[0.3em]">
                      DISCOVER CATALOGUE
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {wishlistProducts.map((p) => (
                      <div key={p.id} className="border border-luxury-charcoal/80 p-4 space-y-4 flex flex-col justify-between">
                        <Link href={`/product/${p.id}`} className="aspect-[3/4] overflow-hidden bg-luxury-black block">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </Link>
                        <div>
                          <Link href={`/product/${p.id}`} className="font-serif-luxury text-sm font-semibold hover:text-luxury-gold block leading-tight truncate">
                            {p.name}
                          </Link>
                          <span className="text-xs text-luxury-gold font-mono block mt-1">${p.price}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              addToCart(p, 1, p.colors[0], p.sizes[0]);
                              toggleWishlist(p.id);
                            }}
                            className="flex-grow py-2.5 bg-luxury-white text-luxury-black text-[9px] tracking-widest font-bold hover:bg-luxury-gold transition-colors"
                          >
                            ADD BAG
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="w-10 border border-luxury-charcoal text-luxury-grey hover:text-luxury-red transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. ADDRESS TAB */}
            {activeTab === "address" && (
              <div className="space-y-8">
                <h3 className="font-serif-luxury text-xl font-bold tracking-wide">SAVED ADDRESSES</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedAddresses.map((addr) => (
                    <div key={addr.id} className="border border-luxury-charcoal p-6 space-y-4 relative">
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="absolute top-4 right-4 text-luxury-grey hover:text-luxury-red"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <h4 className="text-[10px] tracking-widest text-luxury-gold font-bold">{addr.title.toUpperCase()}</h4>
                      <p className="text-xs text-luxury-grey leading-relaxed">{addr.address}</p>
                    </div>
                  ))}
                </div>

                {/* Add address form */}
                <form onSubmit={handleAddAddress} className="border-t border-luxury-charcoal pt-8 space-y-4">
                  <h4 className="text-[10px] tracking-widest text-luxury-white font-bold">ADD NEW DELIVERY POINT</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="LABEL (e.g. HOME, STUDIO)"
                      required
                      value={newAddrTitle}
                      onChange={(e) => setNewAddrTitle(e.target.value)}
                      className="bg-luxury-charcoal/20 border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none focus:border-luxury-gold"
                    />
                    <input
                      type="text"
                      placeholder="FULL ADDRESS TEXT"
                      required
                      value={newAddrContent}
                      onChange={(e) => setNewAddrContent(e.target.value)}
                      className="bg-luxury-charcoal/20 border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none focus:border-luxury-gold md:col-span-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-8 bg-luxury-white text-luxury-black hover:bg-luxury-gold text-[9px] tracking-widest font-bold transition-colors"
                  >
                    SAVE LOCATION
                  </button>
                </form>
              </div>
            )}

            {/* 4. SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="space-y-8">
                <h3 className="font-serif-luxury text-xl font-bold tracking-wide">ACCOUNT PROFILE</h3>
                <form onSubmit={handleProfileSave} className="space-y-6 max-w-md">
                  <div className="flex flex-col">
                    <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="bg-luxury-charcoal/20 border border-luxury-charcoal py-3 px-4 focus:outline-none focus:border-luxury-gold text-xs tracking-wider"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="bg-luxury-charcoal/20 border border-luxury-charcoal py-3 px-4 focus:outline-none focus:border-luxury-gold text-xs tracking-wider"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-4 px-8 bg-luxury-white text-luxury-black hover:bg-luxury-gold text-[9px] tracking-widest font-bold transition-colors flex items-center space-x-2"
                  >
                    <span>{profileSaved ? "SETTINGS RECORDED" : "SAVE PROFILE"}</span>
                    {profileSaved && <Check className="w-3.5 h-3.5" />}
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <span className="text-xs tracking-[0.3em] text-luxury-gold font-mono">LOADING SUITE...</span>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
