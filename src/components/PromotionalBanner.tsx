"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface PromotionalBannerProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
}

export default function PromotionalBanner({
  eyebrow = "THE CASHMERE CAPSULE",
  title = "Pure Mongolian Cashmere, Tailored For Eternity",
  description = "Every thread is spun from certified sustainable Mongolian fibers, offering an ultra-soft hand feel, zero-waste knitting, and enduring thermal insulation.",
  buttonText = "Discover The Capsule",
  buttonLink = "/products?category=outerwear",
  image = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=85",
}: PromotionalBannerProps) {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#1A1A1A] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 relative z-10 bg-gradient-to-r from-black/90 to-black/60 lg:bg-transparent">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{eyebrow}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-white">
                {title}
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-lg">
                {description}
              </p>

              <div className="pt-2">
                <Link
                  href={buttonLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C5A880] text-neutral-950 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-neutral-950 transition-all duration-300 group shadow-md"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-full">
              <Image
                src={image}
                alt="Aurora Exclusive Capsule Collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
