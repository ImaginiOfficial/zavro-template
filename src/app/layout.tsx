import type { Metadata } from "next";
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AURORA | Haute Couture & Modern Ready-to-Wear",
  description:
    "Discover Aurora, a luxurious fashion ecommerce collection offering timeless silhouettes, sustainable cashmere, and artisanal European tailoring.",
  keywords: [
    "Aurora",
    "Fashion Ecommerce",
    "Luxury Fashion",
    "Cashmere",
    "Zavro Template",
    "Ready-to-Wear",
  ],
  authors: [{ name: "Zavro" }],
  openGraph: {
    title: "AURORA — Haute Couture & Modern Ready-to-Wear",
    description:
      "A complete, premium fashion ecommerce experience. Tailored silhouettes, luxury materials, and timeless design.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Aurora Luxury Fashion",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#C5A880]/30 selection:text-neutral-950">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

