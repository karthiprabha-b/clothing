"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp, Product } from "@/context/AppContext";
import { TrendingUp, Users, ShoppingBag, Plus, Trash2, Edit, Check, Settings, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { products, orders, addProduct, deleteProduct, updateProductStock } = useApp();

  // Tab: 'overview' | 'products' | 'orders'
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">("overview");

  // Add Product Form States
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState(0);
  const [newProdCategory, setNewProdCategory] = useState("Jackets");
  const [newProdCollection, setNewProdCollection] = useState("New Arrivals");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdAdded, setNewProdAdded] = useState(false);

  // Stats calculation
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = orders.reduce((count, o) => count + o.items.reduce((c, i) => c + i.quantity, 0), 0);
  const activeCustomers = new Set(orders.map((o) => o.address)).size || 3;

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProdName.trim() && newProdPrice > 0 && newProdImage.trim()) {
      const newProduct: Product = {
        id: Math.random().toString(),
        name: newProdName.toUpperCase(),
        price: newProdPrice,
        category: newProdCategory,
        collection: newProdCollection,
        colors: ["#0D0D0D", "#7E7E7E"],
        sizes: ["S", "M", "L"],
        description: newProdDesc || "High-end minimal construction styled for the modern menswear generation.",
        image: newProdImage,
        imageAlt: newProdImage,
        inStock: newProdStock,
      };
      
      addProduct(newProduct);
      setNewProdAdded(true);
      
      // Reset form
      setNewProdName("");
      setNewProdPrice(0);
      setNewProdImage("");
      setNewProdStock(10);
      setNewProdDesc("");

      setTimeout(() => setNewProdAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white flex flex-col pt-28">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full flex-grow py-12">
        
        {/* Header */}
        <div className="border-b border-luxury-charcoal/50 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-medium">
              MANAGEMENT CONSOLE
            </span>
            <h1 className="font-serif-luxury text-4xl lg:text-5xl font-bold tracking-tight text-luxury-white mt-3">
              Admin Suite
            </h1>
          </div>

          {/* Tab buttons */}
          <div className="flex space-x-2 mt-6 md:mt-0">
            {[
              { id: "overview", label: "OVERVIEW" },
              { id: "products", label: "PRODUCTS" },
              { id: "orders", label: "ORDERS" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-6 border text-[9px] tracking-[0.25em] font-semibold transition-colors duration-300 cursor-none ${
                  activeTab === tab.id
                    ? "bg-luxury-white border-luxury-white text-luxury-black"
                    : "border-luxury-charcoal text-luxury-white hover:border-luxury-grey"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            {/* Metric Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Sales Card */}
              <div className="glassmorphism p-8 border border-luxury-charcoal space-y-4">
                <div className="flex justify-between items-center text-luxury-grey">
                  <span className="text-[10px] tracking-widest font-bold">TOTAL TURNOVER</span>
                  <TrendingUp className="w-5 h-5 text-luxury-gold" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold font-mono text-luxury-white">${totalSales + 5200}</h3>
                  <p className="text-[9px] tracking-widest text-emerald-500 font-bold">+18.4% FROM PREVIOUS QUARTER</p>
                </div>
              </div>

              {/* Orders Card */}
              <div className="glassmorphism p-8 border border-luxury-charcoal space-y-4">
                <div className="flex justify-between items-center text-luxury-grey">
                  <span className="text-[10px] tracking-widest font-bold">TOTAL ORDERS</span>
                  <ShoppingBag className="w-5 h-5 text-luxury-gold" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold font-mono text-luxury-white">{orders.length + 15}</h3>
                  <p className="text-[9px] tracking-widest text-luxury-grey">SIMULATED + PRESENT TRANSACTIONS</p>
                </div>
              </div>

              {/* Customers Card */}
              <div className="glassmorphism p-8 border border-luxury-charcoal space-y-4">
                <div className="flex justify-between items-center text-luxury-grey">
                  <span className="text-[10px] tracking-widest font-bold">ACTIVE CUSTOMERS</span>
                  <Users className="w-5 h-5 text-luxury-gold" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold font-mono text-luxury-white">{activeCustomers}</h3>
                  <p className="text-[9px] tracking-widest text-luxury-grey">UNIQUE CLIENT BILLING LOCALES</p>
                </div>
              </div>

            </div>

            {/* Sales Chart Simulation Container */}
            <div className="glassmorphism border border-luxury-charcoal p-8 space-y-6">
              <h3 className="font-serif-luxury text-lg font-bold tracking-wide">QUARTERLY SALES VELOCITY</h3>
              
              {/* Graphic bars graph */}
              <div className="h-64 flex items-end justify-between pt-8 gap-4 border-b border-luxury-charcoal">
                {[
                  { month: "JAN", val: 40 },
                  { month: "FEB", val: 55 },
                  { month: "MAR", val: 75 },
                  { month: "APR", val: 60 },
                  { month: "MAY", val: 85 },
                  { month: "JUN", val: 95 },
                ].map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-4">
                    <span className="text-[9px] text-luxury-gold font-mono font-semibold">{item.val * 150}$</span>
                    <div
                      className="w-full bg-gradient-to-t from-luxury-red to-luxury-gold transition-all duration-1000 origin-bottom"
                      style={{ height: `${item.val}%` }}
                    />
                    <span className="text-[9px] text-luxury-grey tracking-wider font-semibold">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Products Table (cols 1-8) */}
            <div className="lg:col-span-8 glassmorphism border border-luxury-charcoal p-8 space-y-6 overflow-x-auto">
              <h3 className="font-serif-luxury text-lg font-bold tracking-wide">PRODUCT CATALOG ARCHIVE</h3>
              
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-luxury-charcoal text-[9px] tracking-widest text-luxury-grey font-bold">
                    <th className="pb-4">NAME</th>
                    <th className="pb-4">CATEGORY</th>
                    <th className="pb-4">PRICE</th>
                    <th className="pb-4">STOCK</th>
                    <th className="pb-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-luxury-charcoal/50 hover:bg-luxury-charcoal/20">
                      <td className="py-4 font-serif-luxury font-semibold text-luxury-white">
                        {p.name}
                      </td>
                      <td className="py-4 text-luxury-grey">{p.category}</td>
                      <td className="py-4 text-luxury-gold font-mono">${p.price}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            value={p.inStock}
                            onChange={(e) => updateProductStock(p.id, parseInt(e.target.value) || 0)}
                            className="w-12 bg-luxury-charcoal/30 border border-luxury-charcoal py-1 px-2 text-center text-xs focus:outline-none"
                          />
                          <span className="text-[9px] text-luxury-grey">PCS</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-luxury-grey hover:text-luxury-red transition-colors"
                          aria-label="Delete Product"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Product Form (cols 9-12) */}
            <form onSubmit={handleAddProductSubmit} className="lg:col-span-4 glassmorphism border border-luxury-charcoal p-8 space-y-6">
              <h3 className="font-serif-luxury text-lg font-bold tracking-wide">ADD NEW DESIGN</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">DESIGN NAME</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="bg-luxury-charcoal/20 border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none focus:border-luxury-gold"
                    placeholder="e.g. SCULPTED LEATHER TRENCH"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">PRICE ($)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newProdPrice || ""}
                      onChange={(e) => setNewProdPrice(parseFloat(e.target.value) || 0)}
                      className="bg-luxury-charcoal/20 border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none focus:border-luxury-gold"
                      placeholder="950"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">STOCK</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(parseInt(e.target.value) || 0)}
                      className="bg-luxury-charcoal/20 border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">CATEGORY</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="bg-luxury-charcoal border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none"
                    >
                      <option value="Jackets">Jackets</option>
                      <option value="Shirts">Shirts</option>
                      <option value="Oversized Tees">Oversized Tees</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">COLLECTION</label>
                    <select
                      value={newProdCollection}
                      onChange={(e) => setNewProdCollection(e.target.value)}
                      className="bg-luxury-charcoal border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none"
                    >
                      <option value="New Arrivals">New Arrivals</option>
                      <option value="Streetwear">Streetwear</option>
                      <option value="Oversized">Oversized</option>
                      <option value="Essentials">Essentials</option>
                      <option value="Premium Collection">Premium Collection</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">IMAGE LINK (UNSPLASH)</label>
                  <input
                    type="url"
                    required
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="bg-luxury-charcoal/20 border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none focus:border-luxury-gold"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">DESCRIPTION</label>
                  <textarea
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="bg-luxury-charcoal/20 border border-luxury-charcoal p-3 text-xs tracking-wider focus:outline-none h-20"
                    placeholder="Material specs and contour tailoring details..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4.5 bg-luxury-white text-luxury-black hover:bg-luxury-gold text-[10px] tracking-[0.25em] font-bold transition-all flex items-center justify-center space-x-2"
              >
                <span>{newProdAdded ? "PRODUCT CREATED" : "INDUCT PRODUCT"}</span>
                {newProdAdded && <Check className="w-4 h-4" />}
              </button>
            </form>

          </div>
        )}

        {/* 3. ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="glassmorphism border border-luxury-charcoal p-8 space-y-6">
            <h3 className="font-serif-luxury text-lg font-bold tracking-wide">Fulfillment Panel</h3>
            {orders.length === 0 ? (
              <div className="py-16 text-center text-luxury-grey text-xs tracking-wider">
                No orders placed currently to fulfill.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-luxury-charcoal p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-luxury-white">
                        ORDER ID: <span className="font-mono">#{order.id}</span>
                      </div>
                      <p className="text-xs text-luxury-grey">{order.address}</p>
                      <div className="text-[10px] tracking-wider text-luxury-grey">
                        TOTAL: <span className="font-mono text-luxury-gold">${order.total}</span> | PAYMENT: {order.paymentMethod}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-[10px] tracking-wider text-luxury-grey font-bold">STATUS:</span>
                      <div className="flex gap-2">
                        {["Processing", "Shipped", "Delivered"].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              // Direct order status manipulation
                              order.status = status as any;
                              // Force component state update
                              setActiveTab("overview");
                              setTimeout(() => setActiveTab("orders"), 10);
                            }}
                            className={`py-1.5 px-3 border text-[8px] font-bold tracking-widest transition-colors ${
                              order.status === status
                                ? "bg-luxury-gold border-luxury-gold text-luxury-black"
                                : "border-luxury-charcoal text-luxury-white hover:border-luxury-grey"
                            }`}
                          >
                            {status.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
