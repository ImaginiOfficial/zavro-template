"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  // Find product by id or slug
  const product = products.find(
    (p) => p.id === unwrappedParams.id || p.slug === unwrappedParams.id
  );

  if (!product) {
    notFound();
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Default"
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0] || "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push("/cart");
  };

  // Related products from same category or fallback
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const fallbackRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : products.filter((p) => p.id !== product.id).slice(0, 4);

  const discountPercentage = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-neutral-100 bg-[#FAF9F6] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs text-neutral-400 space-x-2">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-neutral-900 transition-colors"
            >
              Collection
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-neutral-900 transition-colors capitalize"
            >
              {product.categoryName}
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Featured Image */}
            <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden shadow-xs">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-all duration-500"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-neutral-900 text-white text-[11px] uppercase tracking-[0.2em] font-semibold">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Carousel / Grid */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[3/4] bg-neutral-100 overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? "ring-2 ring-neutral-900 opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Controls (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            {/* Category, Rating & Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A880]">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-neutral-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-neutral-400">
                    ({product.reviewCount} Reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-neutral-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-2xl font-medium text-neutral-900">
                  ${product.price}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-neutral-400 line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 bg-red-100 text-red-800 uppercase tracking-wider">
                    Save {discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="border-t border-neutral-100 pt-6 space-y-6">
              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2.5">
                    <span>Color</span>
                    <span className="text-neutral-500 font-normal">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative p-0.5 rounded-full border transition-all ${
                          selectedColor === color.name
                            ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                            : "border-transparent hover:border-neutral-400"
                        }`}
                        title={color.name}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2.5">
                    <span>Size</span>
                    <span className="text-neutral-400 font-normal underline cursor-pointer hover:text-black">
                      Size & Fit Guide
                    </span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-medium uppercase tracking-wider transition-all border ${
                          selectedSize === size
                            ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                            : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-300 h-12">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 text-neutral-600 hover:text-black text-sm font-semibold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 text-neutral-600 hover:text-black text-sm font-semibold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-1 h-12 px-6 text-xs uppercase font-semibold tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-md ${
                      isAdded
                        ? "bg-green-700 text-white"
                        : "bg-neutral-900 hover:bg-[#C5A880] text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added To Your Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add To Bag — ${(product.price * quantity).toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full h-12 border border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-900 text-xs uppercase font-semibold tracking-[0.2em] transition-colors"
                >
                  Buy Now with 1-Click
                </button>
              </div>

              {/* Value Propositions */}
              <div className="space-y-2.5 pt-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#C5A880]" />
                  <span>Complimentary worldwide express shipping on this order</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>Handcrafted in Europe using certified ethical fabrics</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-[#C5A880]" />
                  <span>30-day effortless worldwide returns & size exchanges</span>
                </div>
              </div>

              {/* Expandable Accordions */}
              <div className="border-t border-neutral-200 divide-y divide-neutral-200 pt-2">
                {/* Details Accordion */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("details")}
                    className="w-full flex items-center justify-between text-left text-xs uppercase font-semibold tracking-wider text-neutral-900"
                  >
                    <span>Tailoring & Silhouette Details</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        activeAccordion === "details" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "details" && (
                    <div className="mt-3 text-xs text-neutral-600 font-light space-y-2 leading-relaxed">
                      <p>{product.description}</p>
                      <ul className="list-disc pl-4 space-y-1 mt-2">
                        {product.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Composition & Care Accordion */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("care")}
                    className="w-full flex items-center justify-between text-left text-xs uppercase font-semibold tracking-wider text-neutral-900"
                  >
                    <span>Composition & Garment Care</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        activeAccordion === "care" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "care" && (
                    <div className="mt-3 text-xs text-neutral-600 font-light space-y-2 leading-relaxed">
                      <p className="font-medium text-neutral-900">
                        {product.composition}
                      </p>
                      <ul className="list-disc pl-4 space-y-1">
                        {product.care.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Shipping & Delivery Accordion */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("shipping")}
                    className="w-full flex items-center justify-between text-left text-xs uppercase font-semibold tracking-wider text-neutral-900"
                  >
                    <span>Shipping, Delivery & Returns</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        activeAccordion === "shipping" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "shipping" && (
                    <div className="mt-3 text-xs text-neutral-600 font-light space-y-2 leading-relaxed">
                      <p>
                        Orders placed before 2:00 PM CET ship same-day via DHL
                        Express. All deliveries are packaged in plastic-free, FSC-certified luxury presentation boxes.
                      </p>
                      <p>
                        Enjoy 30 days to return or exchange in pristine, unworn condition with all atelier tags intact.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended & Related Pieces */}
        <div className="mt-24 pt-16 border-t border-neutral-200">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-1">
              CURATED ENSEMBLE
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-light">
              You May Also Admire
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8">
            {fallbackRelated.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

