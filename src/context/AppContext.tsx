"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  collection: string;
  colors: string[];
  sizes: string[];
  description: string;
  image: string;
  imageAlt: string;
  inStock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  address: string;
  paymentMethod: string;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  orders: Order[];
  addToCart: (product: Product, quantity: number, color: string, size: string) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateCartQuantity: (productId: string, color: string, size: string, qty: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (address: string, paymentMethod: string) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, newStock: number) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "SCULPTED WOOL OVERCOAT",
    price: 1850,
    category: "Jackets",
    collection: "Premium Collection",
    colors: ["#1A1A1A", "#7E7E7E"],
    sizes: ["S", "M", "L", "XL"],
    description: "An architectural overcoat tailored in Italy from double-faced virgin wool. Features clean structured shoulders, minimal hidden button placket, and raw-cut edge finishing.",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800",
    imageAlt: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
    inStock: 12,
  },
  {
    id: "2",
    name: "ARCHITECTURAL OVERSIZED HOODIE",
    price: 680,
    category: "Oversized Tees",
    collection: "Oversized",
    colors: ["#0D0D0D", "#7E7E7E", "#C5A059"],
    sizes: ["S", "M", "L"],
    description: "Engineered heavy-terry cotton hoodie with curved back structural paneling. Dropped shoulders, seamless kangaroo pockets, and high-neck crossover hood styling.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    imageAlt: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    inStock: 25,
  },
  {
    id: "3",
    name: "RAW SILK CRUMPLED SHIRT",
    price: 790,
    category: "Shirts",
    collection: "New Arrivals",
    colors: ["#F5F5F5", "#8B1E22"],
    sizes: ["S", "M", "L", "XL"],
    description: "Relaxed resort-collar long sleeve shirt crafted from premium textured silk-linen blend. Distressed button closures and asymmetrical curved cuffs.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
    imageAlt: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
    inStock: 8,
  },
  {
    id: "4",
    name: "MONOLITH MOTO JACKET",
    price: 2450,
    category: "Jackets",
    collection: "Premium Collection",
    colors: ["#0D0D0D"],
    sizes: ["M", "L", "XL"],
    description: "Premium full-grain steerhide leather jacket with matte black hardware. Architectural collar construction, asymmetric double-zip closure, and satin interior lining.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
    imageAlt: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
    inStock: 5,
  },
  {
    id: "5",
    name: "CONCENTRIC GOLD SIGNET RING",
    price: 450,
    category: "Accessories",
    collection: "Essentials",
    colors: ["#C5A059"],
    sizes: ["8", "9", "10"],
    description: "Solid 18k gold vermeil signet ring featuring hand-carved concentric circle motifs. Subtle branding engraved on interior band.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    imageAlt: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800",
    inStock: 15,
  },
  {
    id: "6",
    name: "DESERT Suede CHELSEA BOOTS",
    price: 920,
    category: "Footwear",
    collection: "Essentials",
    colors: ["#C5A059", "#7E7E7E"],
    sizes: ["40", "41", "42", "43", "44"],
    description: "Slim-profile Chelsea boots in premium Italian suede. Custom crepe-rubber sole extension and gold hot-stamped heel pull tabs.",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800",
    imageAlt: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800",
    inStock: 14,
  },
  {
    id: "7",
    name: "CRIMSON DRAPED KNIT TEE",
    price: 320,
    category: "Oversized Tees",
    collection: "Streetwear",
    colors: ["#8B1E22", "#0D0D0D"],
    sizes: ["S", "M", "L"],
    description: "Mid-weight cotton knit t-shirt with signature back centerline stitch. Draped hem structure designed for layered minimal styling.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
    imageAlt: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    inStock: 30,
  },
  {
    id: "8",
    name: "RAW EDGE CARGO TROUSERS",
    price: 720,
    category: "Formal Wear",
    collection: "New Arrivals",
    colors: ["#1A1A1A", "#7E7E7E"],
    sizes: ["30", "32", "34"],
    description: "Relaxed tailored cargo trousers with unfinished hems. Feature low-profile cargo pocket seams, adjustable waist side-tabs, and metal hardware accents.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
    imageAlt: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=800",
    inStock: 18,
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("rn_cart");
    const savedWishlist = localStorage.getItem("rn_wishlist");
    const savedOrders = localStorage.getItem("rn_orders");
    const savedProducts = localStorage.getItem("rn_products");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("rn_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("rn_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("rn_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("rn_products", JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product, quantity: number, color: string, size: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size)
      )
    );
  };

  const updateCartQuantity = (productId: string, color: string, size: string, qty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevList) =>
      prevList.includes(productId)
        ? prevList.filter((id) => id !== productId)
        : [...prevList, productId]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (address: string, paymentMethod: string) => {
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const newOrder: Order = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      items: [...cart],
      total: total,
      status: "Processing",
      address,
      paymentMethod,
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProductStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: newStock } : p))
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        clearCart,
        placeOrder,
        addProduct,
        deleteProduct,
        updateProductStock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
