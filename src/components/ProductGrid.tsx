"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  heading?: string;
  subheading?: string;
  viewAllLink?: string;
  viewAllText?: string;
  columns?: 3 | 4;
}

export default function ProductGrid({
  products,
  heading,
  subheading,
  viewAllLink,
  viewAllText = "Explore All",
  columns = 4,
}: ProductGridProps) {
  const gridColsClass =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(heading || viewAllLink) && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-100 gap-4">
            <div>
              {subheading && (
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-1">
                  {subheading}
                </p>
              )}
              {heading && (
                <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-light tracking-tight">
                  {heading}
                </h2>
              )}
            </div>

            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 hover:text-[#C5A880] transition-colors shrink-0 group"
              >
                <span>{viewAllText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className={`grid ${gridColsClass} gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

