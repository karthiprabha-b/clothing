"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp, CartItem } from "@/context/AppContext";
import { Trash2, ShoppingBag, ArrowRight, Check, CreditCard, Landmark, Apple } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, placeOrder } = useApp();
  const [step, setStep] = useState<"cart" | "shipping" | "payment">("cart");
  
  // Checkout Info
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("apple-pay");

  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1500 ? 0 : 50;
  const vat = Math.round(subtotal * 0.08); // 8% luxury sales tax
  const total = subtotal + shipping + vat;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "shipping") {
      setStep("payment");
    } else if (step === "payment") {
      setPaying(true);
      setTimeout(() => {
        setPaying(false);
        setPaymentSuccess(true);
        placeOrder(`${address}, ${city}, ${zip}`, paymentMethod.toUpperCase());
      }, 2500); // simulated luxury payment loading
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-luxury-black text-luxury-white flex flex-col justify-between pt-28">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24 px-6 space-y-6 flex-grow flex flex-col justify-center">
          <motion.div
            className="w-20 h-20 rounded-full bg-luxury-gold/10 border border-luxury-gold flex items-center justify-center mx-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Check className="w-10 h-10 text-luxury-gold" />
          </motion.div>
          
          <h2 className="font-serif-luxury text-3xl font-bold tracking-wide">ORDER PLACED</h2>
          <p className="text-xs text-luxury-grey leading-relaxed">
            Your transaction has been securely processed. A courier invoice and campaign tracking link will be sent to your inbox shortly.
          </p>

          <div className="pt-8 space-y-4">
            <Link href="/dashboard" className="block w-full py-4 bg-luxury-white text-luxury-black font-semibold text-[10px] tracking-[0.3em] hover:bg-luxury-gold transition-colors duration-300">
              VIEW ORDER STATUS
            </Link>
            <Link href="/shop" className="block w-full py-4 border border-luxury-charcoal text-luxury-white font-semibold text-[10px] tracking-[0.3em] hover:border-luxury-white transition-colors duration-300">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-luxury-white flex flex-col pt-28">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 w-full flex-grow py-12">
        
        {/* Header and Step Indicators */}
        <div className="border-b border-luxury-charcoal/50 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[9px] tracking-[0.4em] text-luxury-gold uppercase font-medium">
              TRANSACTION FLOW
            </span>
            <h1 className="font-serif-luxury text-3xl lg:text-5xl font-bold tracking-tight text-luxury-white mt-3">
              Checkout
            </h1>
          </div>

          {/* Stepper indicators */}
          <div className="flex items-center space-x-4 md:space-x-8 text-[9px] tracking-[0.25em] font-semibold text-luxury-grey">
            <span className={step === "cart" ? "text-luxury-gold" : "text-luxury-white/60"}>01 / BAG</span>
            <span className="w-8 h-[1px] bg-luxury-charcoal" />
            <span className={step === "shipping" ? "text-luxury-gold" : "text-luxury-white/60"}>02 / DELIVERY</span>
            <span className="w-8 h-[1px] bg-luxury-charcoal" />
            <span className={step === "payment" ? "text-luxury-gold" : "text-luxury-white/60"}>03 / SETTLEMENT</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag className="w-12 h-12 text-luxury-grey mb-6" />
            <span className="font-serif-luxury text-xl text-luxury-grey">Your shopping bag is empty.</span>
            <Link href="/shop" className="mt-8 py-4 px-10 bg-luxury-white text-luxury-black text-[10px] tracking-[0.3em] font-semibold hover:bg-luxury-gold transition-colors duration-300">
              DISCOVER PIECES
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Step Content: Left Side (cols 1-7) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: CART LIST */}
                {step === "cart" && (
                  <motion.div
                    key="step-cart"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-luxury-charcoal/30 pb-4 hidden sm:grid grid-cols-12 text-[9px] tracking-widest text-luxury-grey font-semibold">
                      <div className="col-span-6">OBJECT DETAILS</div>
                      <div className="col-span-2 text-center">SIZE</div>
                      <div className="col-span-2 text-center">QTY</div>
                      <div className="col-span-2 text-right">TOTAL</div>
                    </div>

                    {cart.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-b border-luxury-charcoal/30 pb-6"
                      >
                        {/* Img + Title */}
                        <div className="col-span-1 sm:col-span-6 flex items-center space-x-4">
                          <Link href={`/product/${item.product.id}`} className="w-16 aspect-[3/4] bg-luxury-charcoal overflow-hidden flex-shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </Link>
                          <div>
                            <Link href={`/product/${item.product.id}`} className="font-serif-luxury text-sm font-semibold hover:text-luxury-gold transition-colors block">
                              {item.product.name}
                            </Link>
                            {/* Color Swatch */}
                            <div className="flex items-center space-x-2 mt-1.5">
                              <span className="w-3 h-3 rounded-full border border-white/10" style={{ backgroundColor: item.selectedColor }} />
                              <span className="text-[9px] tracking-wider text-luxury-grey uppercase">SHADE</span>
                            </div>
                          </div>
                        </div>

                        {/* Size */}
                        <div className="col-span-1 sm:col-span-2 text-center">
                          <span className="text-[10px] font-mono border border-luxury-charcoal py-1 px-3 bg-luxury-charcoal/20">
                            {item.selectedSize}
                          </span>
                        </div>

                        {/* Qty Selector */}
                        <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
                          <div className="flex items-center border border-luxury-charcoal bg-luxury-charcoal/20">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                              className="px-2.5 py-1 text-xs hover:text-luxury-gold"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                              className="px-2.5 py-1 text-xs hover:text-luxury-gold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total + Delete */}
                        <div className="col-span-1 sm:col-span-2 flex items-center justify-between sm:justify-end space-x-4">
                          <span className="text-xs font-semibold text-luxury-gold font-mono">${item.product.price * item.quantity}</span>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                            className="text-luxury-grey hover:text-luxury-red transition-colors duration-300"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-6 flex justify-end">
                      <button
                        onClick={() => setStep("shipping")}
                        className="py-4.5 px-10 bg-luxury-white text-luxury-black font-semibold text-[10px] tracking-[0.3em] hover:bg-luxury-gold transition-colors duration-300 flex items-center space-x-3 cursor-none"
                      >
                        <span>PROCEED TO DELIVERY</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SHIPPING FORM */}
                {step === "shipping" && (
                  <motion.form
                    key="step-shipping"
                    onSubmit={handleCheckoutSubmit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif-luxury text-lg font-semibold tracking-wide">SHIPPING ADDRESS</h3>
                    
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">FULL NAME</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-luxury-charcoal/20 border border-luxury-charcoal py-3 px-4 focus:outline-none focus:border-luxury-gold text-xs tracking-wider placeholder:text-luxury-grey/65 text-luxury-white"
                          placeholder="e.g. KARTHIKEYAN BALASUBRAMANIAN"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">STREET ADDRESS</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="bg-luxury-charcoal/20 border border-luxury-charcoal py-3 px-4 focus:outline-none focus:border-luxury-gold text-xs tracking-wider placeholder:text-luxury-grey/65 text-luxury-white"
                          placeholder="e.g. 14 VIA MONTENAPOLEONE"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">CITY</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-luxury-charcoal/20 border border-luxury-charcoal py-3 px-4 focus:outline-none focus:border-luxury-gold text-xs tracking-wider placeholder:text-luxury-grey/65 text-luxury-white"
                            placeholder="MILAN"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[9px] tracking-widest text-luxury-grey mb-2 uppercase">ZIP CODE</label>
                          <input
                            type="text"
                            required
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            className="bg-luxury-charcoal/20 border border-luxury-charcoal py-3 px-4 focus:outline-none focus:border-luxury-gold text-xs tracking-wider placeholder:text-luxury-grey/65 text-luxury-white"
                            placeholder="20121"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep("cart")}
                        className="py-4.5 px-8 border border-luxury-charcoal hover:border-white text-luxury-white font-semibold text-[10px] tracking-[0.3em] transition-colors duration-300"
                      >
                        BACK TO BAG
                      </button>
                      <button
                        type="submit"
                        className="py-4.5 px-8 bg-luxury-white text-luxury-black font-semibold text-[10px] tracking-[0.3em] hover:bg-luxury-gold transition-colors duration-300 flex items-center space-x-3 cursor-none"
                      >
                        <span>PROCEED TO PAYMENT</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 3: PAYMENT METHOD */}
                {step === "payment" && (
                  <motion.form
                    key="step-payment"
                    onSubmit={handleCheckoutSubmit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="font-serif-luxury text-lg font-semibold tracking-wide">SECURE PAYMENT METHOD</h3>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Apple Pay */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("apple-pay")}
                        className={`p-4 border flex flex-col items-center space-y-2 transition-all duration-300 ${
                          paymentMethod === "apple-pay" ? "border-luxury-gold bg-luxury-gold/5" : "border-luxury-charcoal"
                        }`}
                      >
                        <Apple className="w-6 h-6 text-luxury-white" />
                        <span className="text-[9px] tracking-widest font-bold">APPLE PAY</span>
                      </button>

                      {/* Stripe */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("stripe")}
                        className={`p-4 border flex flex-col items-center space-y-2 transition-all duration-300 ${
                          paymentMethod === "stripe" ? "border-luxury-gold bg-luxury-gold/5" : "border-luxury-charcoal"
                        }`}
                      >
                        <CreditCard className="w-6 h-6 text-luxury-white" />
                        <span className="text-[9px] tracking-widest font-bold">STRIPE</span>
                      </button>

                      {/* Razorpay */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("razorpay")}
                        className={`p-4 border flex flex-col items-center space-y-2 transition-all duration-300 ${
                          paymentMethod === "razorpay" ? "border-luxury-gold bg-luxury-gold/5" : "border-luxury-charcoal"
                        }`}
                      >
                        <Landmark className="w-6 h-6 text-luxury-white" />
                        <span className="text-[9px] tracking-widest font-bold">RAZORPAY</span>
                      </button>
                    </div>

                    <div className="bg-luxury-charcoal/20 border border-luxury-charcoal p-6 space-y-4">
                      {paymentMethod === "apple-pay" && (
                        <p className="text-xs text-luxury-grey leading-relaxed">
                          Double-click or authenticate on your Apple device to authorize the transaction.
                        </p>
                      )}
                      {paymentMethod === "stripe" && (
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="CARD NUMBER"
                            className="bg-transparent border-b border-luxury-charcoal py-2 w-full focus:outline-none focus:border-luxury-gold text-xs tracking-widest"
                            required
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="EXPIRY (MM/YY)"
                              className="bg-transparent border-b border-luxury-charcoal py-2 w-full focus:outline-none focus:border-luxury-gold text-xs tracking-widest"
                              required
                            />
                            <input
                              type="text"
                              placeholder="CVC"
                              className="bg-transparent border-b border-luxury-charcoal py-2 w-full focus:outline-none focus:border-luxury-gold text-xs tracking-widest"
                              required
                            />
                          </div>
                        </div>
                      )}
                      {paymentMethod === "razorpay" && (
                        <p className="text-xs text-luxury-grey leading-relaxed">
                          Secure redirect to Razorpay portal to complete Netbanking, UPI, or wallet settlements.
                        </p>
                      )}
                    </div>

                    <div className="pt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep("shipping")}
                        className="py-4.5 px-8 border border-luxury-charcoal hover:border-white text-luxury-white font-semibold text-[10px] tracking-[0.3em] transition-colors duration-300"
                        disabled={paying}
                      >
                        BACK TO DELIVERY
                      </button>
                      <button
                        type="submit"
                        className="py-4.5 px-8 bg-luxury-gold text-luxury-black font-bold text-[10px] tracking-[0.3em] hover:bg-luxury-white transition-colors duration-300 flex items-center space-x-3 cursor-none"
                        disabled={paying}
                      >
                        {paying ? (
                          <span className="animate-pulse">AUTHORIZING SETTLEMENT...</span>
                        ) : (
                          <>
                            <span>PLACE ORDER (${total})</span>
                            <Check className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}

              </AnimatePresence>
            </div>

            {/* Order Summary Right Side (cols 8-12) */}
            <div className="lg:col-span-5 bg-luxury-charcoal/20 border border-luxury-charcoal p-8 space-y-6 relative z-10">
              <h3 className="font-serif-luxury text-xl font-bold tracking-wide">ORDER STATEMENT</h3>
              
              {/* Items recap */}
              <div className="space-y-4 border-b border-luxury-charcoal pb-6 max-h-48 overflow-y-auto scrollbar-none">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between items-center text-xs">
                    <span className="text-luxury-white/80 max-w-[70%] truncate">
                      {item.product.name} (x{item.quantity})
                    </span>
                    <span className="font-mono text-luxury-grey">${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Subtotal, tax, shipping */}
              <div className="space-y-3 border-b border-luxury-charcoal pb-6 text-xs text-luxury-grey">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-mono text-luxury-white">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Luxury Sales Tax (8%)</span>
                  <span className="font-mono text-luxury-white">${vat}</span>
                </div>
                <div className="flex justify-between">
                  <span>DHL Priority Courier</span>
                  <span className="font-mono text-luxury-white">
                    {shipping === 0 ? "FREE" : `$${shipping}`}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-end">
                <span className="text-xs tracking-wider font-semibold">Grand Total</span>
                <span className="text-xl font-bold text-luxury-gold tracking-wider font-mono">${total}</span>
              </div>

            </div>

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
