"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types";

interface CategoryGridProps {
  categories: Category[];
  heading?: string;
  subheading?: string;
}

export default function CategoryGrid({
  categories,
  heading = "Curated Categories",
  subheading = "Select by wardrobe pillars and artisanal essentials",
}: CategoryGridProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-2">
            The Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 text-sm text-neutral-500 font-light">
            {subheading}
          </p>
          <div className="w-12 h-[1px] bg-neutral-300 mx-auto mt-5" />
        </div>

        {/* Editorial Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden bg-neutral-100 aspect-[3/4] flex flex-col justify-end p-6 sm:p-8"
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Text Information */}
              <div className="relative z-10 text-white transform transition-transform duration-300">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-medium">
                    {category.itemCount} Editions
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-normal tracking-wide text-white">
                  {category.name}
                </h3>

                <p className="text-xs text-neutral-300 line-clamp-1 mt-1 font-light opacity-90">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
