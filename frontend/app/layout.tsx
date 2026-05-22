import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aura Coffee | Fresh Coffee, Warm Moments",
  description: "Experience the finest handcrafted coffee in a cozy minimalist atmosphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunito.variable} antialiased font-sans bg-cream text-warm-black`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
