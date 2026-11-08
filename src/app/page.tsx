import React from "react";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import PromotionalBanner from "@/components/PromotionalBanner";
import Newsletter from "@/components/Newsletter";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import Link from "next/link";
import { Sparkles, Award, Compass, RefreshCw } from "lucide-react";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNew || p.badge === "New");
  const bestSellers = products.filter((p) => p.isBestSeller || p.badge === "Bestseller");

  return (
    <div>
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Curated Categories */}
      <CategoryGrid categories={categories} />

      {/* 3. Featured Products */}
      <ProductGrid
        products={featuredProducts}
        heading="Featured Editions"
        subheading="ARTISANAL ATELIER"
        viewAllLink="/products"
        viewAllText="View Entire Collection"
        columns={4}
      />

      {/* 4. Promotional Campaign Banner */}
      <PromotionalBanner />

      {/* 5. New Arrivals */}
      <ProductGrid
        products={newArrivals}
        heading="New Arrivals"
        subheading="FRESH SILHOUETTES"
        viewAllLink="/products?filter=new"
        viewAllText="Explore New Season"
        columns={4}
      />

      {/* Editorial Quote / Maison Manifesto */}
      <section className="py-24 bg-[#FAF9F6] border-y border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A880]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE AURORA PHILOSOPHY</span>
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-900 leading-relaxed italic">
            &ldquo;True luxury is never loud. It is felt in the weight of cold-spun cashmere, observed in the precision of a shoulder seam, and cherished across decades of timeless wear.&rdquo;
          </blockquote>

          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
            — HÉLÈNE VAUCLIN, CREATIVE DIRECTOR
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 text-center">
            <div className="space-y-2">
              <Award className="w-6 h-6 text-[#C5A880] mx-auto" />
              <h4 className="text-xs uppercase font-semibold tracking-wider text-neutral-900">
                100% Certified
              </h4>
              <p className="text-[11px] text-neutral-500">
                Grade-A ethical fiber sourcing
              </p>
            </div>
            <div className="space-y-2">
              <Compass className="w-6 h-6 text-[#C5A880] mx-auto" />
              <h4 className="text-xs uppercase font-semibold tracking-wider text-neutral-900">
                European Heritage
              </h4>
              <p className="text-[11px] text-neutral-500">
                Crafted in historic regional ateliers
              </p>
            </div>
            <div className="space-y-2">
              <RefreshCw className="w-6 h-6 text-[#C5A880] mx-auto" />
              <h4 className="text-xs uppercase font-semibold tracking-wider text-neutral-900">
                Circular Design
              </h4>
              <p className="text-[11px] text-neutral-500">
                Garments tailored to endure a lifetime
              </p>
            </div>
            <div className="space-y-2">
              <Sparkles className="w-6 h-6 text-[#C5A880] mx-auto" />
              <h4 className="text-xs uppercase font-semibold tracking-wider text-neutral-900">
                Bespoke Finish
              </h4>
              <p className="text-[11px] text-neutral-500">
                Hand-inspected before packaging
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Best-Selling Products */}
      <ProductGrid
        products={bestSellers}
        heading="Best-Selling Classics"
        subheading="CLIENT FAVORITES"
        viewAllLink="/products?filter=bestseller"
        viewAllText="Shop All Bestsellers"
        columns={4}
      />

      {/* 7. Newsletter Subscription */}
      <Newsletter />
    </div>
  );
}

