import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "RIGHT NOW | Futuristic Luxury Menswear System",
  description: "Operating System for high-end menswear. Built for Presence. Presenting the A/W cyber campaign.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="custom-cursor-active min-h-full flex flex-col bg-luxury-black text-luxury-white relative selection:bg-luxury-red selection:text-luxury-black">
        <AppProvider>
          {/* Film Grain Noise Overlay */}
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
