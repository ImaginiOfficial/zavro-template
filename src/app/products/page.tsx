"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category") || "all";
  const filterParam = searchParams.get("filter") || "all";
  const queryParam = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedTag, setSelectedTag] = useState<string>(filterParam);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(1000);

  // Sync state if URL params change
  React.useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (filterParam) setSelectedTag(filterParam);
    if (queryParam) setSearchQuery(queryParam);
  }, [categoryParam, filterParam, queryParam]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }

        // Tag filter
        if (selectedTag === "new" && !p.isNew && p.badge !== "New") {
          return false;
        }
        if (selectedTag === "bestseller" && !p.isBestSeller && p.badge !== "Bestseller") {
          return false;
        }
        if (selectedTag === "sale" && p.badge !== "Sale" && !p.compareAtPrice) {
          return false;
        }

        // Price filter
        if (p.price > priceMax) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.categoryName.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // default featured
      });
  }, [selectedCategory, selectedTag, sortBy, searchQuery, priceMax]);

  const activeCategoryObject = categories.find((c) => c.slug === selectedCategory);

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSelectedTag("all");
    setSortBy("featured");
    setSearchQuery("");
    setPriceMax(1000);
    router.push("/products");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTag !== "all" ||
    searchQuery.trim() !== "" ||
    priceMax < 1000;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Header */}
      <div className="border-b border-neutral-100 bg-[#FAF9F6] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs text-neutral-400 space-x-2 mb-3">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Collection</span>
            {activeCategoryObject && (
              <>
                <span>/</span>
                <span className="text-[#C5A880] font-medium">
                  {activeCategoryObject.name}
                </span>
              </>
            )}
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
            {activeCategoryObject
              ? activeCategoryObject.name
              : searchQuery
              ? `Results for "${searchQuery}"`
              : "All Editions"}
          </h1>

          <p className="mt-2 text-sm text-neutral-500 font-light max-w-xl">
            {activeCategoryObject
              ? activeCategoryObject.description
              : "Discover modern wardrobe staples, deconstructed tailoring, and bespoke craftsmanship."}
          </p>
        </div>
      </div>

      {/* Main Listing Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-neutral-200 gap-4">
          {/* Category Tabs (Desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                selectedCategory === "all"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
              }`}
            >
              All ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Toolbar Actions: Sort & Mobile Filters */}
          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
            {/* Filter Toggle Mobile */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 border border-neutral-300 text-xs uppercase font-medium text-neutral-800"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 hidden sm:inline">
                Sort:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-neutral-50 border border-neutral-300 py-2 pl-3 pr-8 text-xs font-medium uppercase tracking-wider text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-6 border-r border-neutral-100">
            {/* Search within list */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter by keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 py-2 pl-8 pr-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                />
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Tag / Collection Filters */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-3">
                Condition & Status
              </h3>
              <div className="space-y-2">
                {[
                  { id: "all", label: "All Items" },
                  { id: "new", label: "New Arrivals" },
                  { id: "bestseller", label: "Best Sellers" },
                  { id: "sale", label: "Special Offers / Sale" },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-black cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="tag_filter"
                      checked={selectedTag === item.id}
                      onChange={() => setSelectedTag(item.id)}
                      className="accent-neutral-900"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-3">
                <span>Max Price</span>
                <span className="text-[#C5A880]">${priceMax}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                <span>$100</span>
                <span>$1,000</span>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="w-full py-2.5 px-3 border border-neutral-300 text-xs uppercase tracking-wider font-semibold text-neutral-800 hover:bg-neutral-900 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </aside>

          {/* Product Grid Area (3 cols on desktop) */}
          <div className="lg:col-span-3">
            {/* Active Filters Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-neutral-600">
                <span className="text-neutral-400 font-medium">Applied:</span>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-xs text-[11px] font-medium">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="text-neutral-500 hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedTag !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-xs text-[11px] font-medium">
                    Filter: {selectedTag}
                    <button
                      onClick={() => setSelectedTag("all")}
                      className="text-neutral-500 hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-xs text-[11px] font-medium">
                    Query: &quot;{searchQuery}&quot;
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-neutral-500 hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {priceMax < 1000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 rounded-xs text-[11px] font-medium">
                    Under ${priceMax}
                    <button
                      onClick={() => setPriceMax(1000)}
                      className="text-neutral-500 hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-[#C5A880] underline hover:text-neutral-900 ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Count Header */}
            <div className="text-xs uppercase tracking-wider text-neutral-400 mb-6 font-medium">
              Showing {filteredProducts.length} of {products.length} Masterpieces
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-neutral-200 p-8">
                <p className="font-serif text-xl text-neutral-900 mb-2">
                  No editions found matching your criteria
                </p>
                <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
                  Try adjusting your category selection, removing search terms, or expanding your price range.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <span className="font-serif text-lg text-neutral-900">
                  Filter Editions
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-neutral-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tag filters mobile */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-3">
                  Status
                </h4>
                <div className="space-y-2">
                  {[
                    { id: "all", label: "All Items" },
                    { id: "new", label: "New Arrivals" },
                    { id: "bestseller", label: "Best Sellers" },
                    { id: "sale", label: "On Sale" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="m_tag_filter"
                        checked={selectedTag === item.id}
                        onChange={() => setSelectedTag(item.id)}
                        className="accent-neutral-900"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price filter mobile */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                  <span>Max Price:</span>
                  <span className="text-[#C5A880]">${priceMax}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-neutral-900"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 space-y-3">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-neutral-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  resetAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2.5 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-widest font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center text-xs uppercase tracking-widest text-neutral-400">
          Loading Aurora Atelier Collection...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
