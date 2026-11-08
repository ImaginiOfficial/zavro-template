"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";

interface HeroProps {
  badge?: string;
  headline?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
}

export default function Hero({
  badge = "AUTUMN / WINTER 2026",
  headline = "Timeless Elegance, Modern Silhouette",
  description = "Meticulously crafted silhouettes in sustainable cashmere, structured wool, and fluid silk designed for effortless distinction.",
  primaryButtonText = "Explore Collection",
  primaryButtonLink = "/products",
  secondaryButtonText = "Shop New Arrivals",
  secondaryButtonLink = "/products?filter=new",
  backgroundImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&auto=format&fit=crop&q=85",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#121212] text-white">
      {/* Background Hero Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Aurora Fashion Autumn Winter Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-44 flex flex-col justify-center min-h-[85vh]">
        <div className="max-w-2xl space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#E5D2BA] text-xs font-semibold tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-white">
            {headline}
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
            {description}
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={primaryButtonLink}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 text-xs uppercase font-semibold tracking-[0.2em] hover:bg-[#C5A880] hover:text-white transition-all duration-300 shadow-md group"
            >
              <span>{primaryButtonText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={secondaryButtonLink}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/50 text-white text-xs uppercase font-semibold tracking-[0.2em] hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-xs"
            >
              <span>{secondaryButtonText}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Value Proposition Micro-Banner */}
      <div className="relative z-10 border-t border-white/15 bg-black/40 backdrop-blur-md py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs tracking-wider text-neutral-300">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Truck className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>Complimentary Express Delivery Over $200</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>Sustainably Sourced & Responsibly Made</span>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-3">
            <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>Handcrafted in European Ateliers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

