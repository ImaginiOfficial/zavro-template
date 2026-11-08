"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Default"
  );
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedColor, product.sizes[0] || "Standard");
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discountPercentage = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  return (
    <div
      className="group relative flex flex-col bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          {/* Primary image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              product.images[1] && isHovered
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100 group-hover:scale-105"
            }`}
          />

          {/* Secondary image on hover if available */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-[0.15em] ${
                product.badge === "Sale"
                  ? "bg-red-700 text-white"
                  : product.badge === "New"
                  ? "bg-neutral-900 text-white"
                  : "bg-[#C5A880] text-neutral-950"
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/95 text-neutral-900 tracking-wider shadow-xs">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Quick Add Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`w-full py-3 px-4 text-xs uppercase font-semibold tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg ${
              isAdded
                ? "bg-green-700 text-white"
                : "bg-white/95 hover:bg-neutral-900 text-neutral-900 hover:text-white backdrop-blur-xs"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-4 pb-2 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
          <span className="uppercase tracking-[0.15em] text-[10px] font-medium text-[#A3A3A3]">
            {product.categoryName}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-neutral-600">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-neutral-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/product/${product.id}`}
          className="font-serif text-base text-neutral-900 font-normal hover:text-[#C5A880] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price & Color Swatches */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900 tracking-tight">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.compareAtPrice}
              </span>
            )}
          </div>

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5" title="Available Colors">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(c.name);
                  }}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? "ring-1 ring-offset-1 ring-neutral-900 scale-110"
                      : "border-neutral-300 opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
