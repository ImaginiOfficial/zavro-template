"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

interface HeaderProps {
  brandName?: string;
  tagline?: string;
}

export default function Header({
  brandName = "AURORA",
  tagline = "Haute Couture & Ready-to-Wear",
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync current URL path & search query
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.pathname + window.location.search);
    }
  }, [pathname]);

  // Scroll listener for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Filtered products for quick search
  const filteredProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: "New Arrivals", href: "/products?filter=new" },
    { label: "Women", href: "/products?category=women" },
    { label: "Men", href: "/products?category=men" },
    { label: "Outerwear", href: "/products?category=outerwear" },
    { label: "Leather Goods", href: "/products?category=bags" },
    { label: "Accessories", href: "/products?category=accessories" },
    { label: "All Editions", href: "/products" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100"
          : "bg-white border-b border-neutral-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 -ml-2 text-neutral-800 hover:text-black focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Open search"
              className="p-2 ml-1 text-neutral-800 hover:text-black focus:outline-none"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="shrink-0 flex-1 lg:flex-initial text-center lg:text-left mr-3 lg:mr-8 xl:mr-12">
            <Link href="/" className="inline-block group text-center lg:text-left">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] xl:tracking-[0.25em] font-semibold text-neutral-900 block group-hover:text-neutral-700 transition-colors">
                {brandName}
              </span>
              <span className="hidden sm:block text-[8.5px] xl:text-[9px] uppercase tracking-[0.28em] xl:tracking-[0.35em] text-neutral-400 font-medium whitespace-nowrap">
                {tagline}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 2xl:gap-8 flex-1">
            {navLinks.map((link) => {
              const isActive =
                currentUrl === link.href ||
                (link.href === "/products" && currentUrl === "/products");

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative py-2 text-[11px] xl:text-xs uppercase tracking-[0.14em] xl:tracking-[0.18em] font-medium whitespace-nowrap transition-colors duration-200"
                >
                  <span
                    className={
                      isActive
                        ? "text-neutral-950 font-semibold"
                        : "text-neutral-600 group-hover:text-neutral-950"
                    }
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-neutral-950 transition-all duration-300 origin-left ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Header Action Icons */}
          <div className="shrink-0 flex items-center space-x-3 sm:space-x-5 ml-2 lg:ml-4">
            {/* Desktop Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search collection"
              className="hidden lg:flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors p-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Search</span>
            </button>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              aria-label={`Shopping Bag with ${totalItems} items`}
              className="relative p-2 text-neutral-900 hover:text-neutral-600 transition-colors group flex items-center gap-2"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                Bag {totalItems > 0 ? `(${totalItems})` : ""}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Search Overlay */}
      {searchOpen && (
        <div className="border-t border-neutral-100 bg-[#FAF9F6] py-5 px-4 shadow-lg animate-fadeIn">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search cashmere coats, silk shirts, leather bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-none px-4 py-3 pl-11 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
              />
              <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-12 top-3.5 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-3.5 top-3.5 text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 font-medium"
              >
                Close
              </button>
            </form>

            {/* Quick Live Search Results */}
            {searchQuery.trim() && (
              <div className="mt-4 bg-white border border-neutral-200 divide-y divide-neutral-100 shadow-sm">
                {filteredProducts.length > 0 ? (
                  <>
                    <div className="p-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-50">
                      Suggested Matches ({filteredProducts.length})
                    </div>
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-3 hover:bg-[#FAF9F6] transition-colors group"
                      >
                        <div className="relative w-12 h-14 bg-neutral-100 shrink-0 overflow-hidden">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs uppercase tracking-wider text-neutral-500">
                            {p.categoryName}
                          </p>
                          <p className="text-sm font-medium text-neutral-900 truncate">
                            {p.name}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-neutral-900">
                          ${p.price}
                        </span>
                      </Link>
                    ))}
                    <div className="p-3 text-center bg-neutral-50">
                      <Link
                        href={`/products?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setSearchOpen(false)}
                        className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-[#C5A880] inline-flex items-center gap-1"
                      >
                        View all results for &ldquo;{searchQuery}&rdquo;
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center text-sm text-neutral-500">
                    No items found matching &ldquo;{searchQuery}&rdquo;. Try browsing our{" "}
                    <Link
                      href="/products"
                      onClick={() => setSearchOpen(false)}
                      className="text-neutral-900 underline font-medium"
                    >
                      all products
                    </Link>{" "}
                    collection.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer header */}
              <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="font-serif text-xl tracking-[0.2em] font-semibold text-neutral-900 block">
                    {brandName}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                    Atelier
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-neutral-500 hover:text-neutral-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="py-4 px-3 divide-y divide-neutral-100">
                <div className="space-y-1 pb-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-3 rounded-sm text-sm uppercase tracking-wider font-medium text-neutral-800 hover:bg-neutral-50 hover:text-black transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>
                  ))}
                </div>

                <div className="pt-4 space-y-2 px-3">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-2">
                    Client Services
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-wider text-neutral-600 hover:text-neutral-900 py-1"
                  >
                    Lookbook 2026
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-wider text-neutral-600 hover:text-neutral-900 py-1"
                  >
                    Shopping Bag
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer footer */}
            <div className="p-5 border-t border-neutral-100 bg-[#FAF9F6]">
              <p className="text-xs text-neutral-500">
                Need concierge assistance?
              </p>
              <p className="text-xs font-semibold text-neutral-900 mt-0.5">
                concierge@aurorafashion.com
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

