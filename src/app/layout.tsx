import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "RIGHT NOW | Modern Luxury Menswear",
  description: "Crafted for modern movement. Minimal fashion with maximum presence. Presenting the luxury autumn/winter campaign.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="custom-cursor-active min-h-full flex flex-col bg-luxury-black text-luxury-white relative selection:bg-luxury-gold selection:text-luxury-black">
        <AppProvider>
          {/* Grain Noise Overlay */}
          <div className="grain-overlay" />
          
          {/* Interactive Custom Cursor */}
          <CustomCursor />
          
          {/* Page Content */}
          <main className="flex-grow z-10">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
