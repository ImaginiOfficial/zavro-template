"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Check,
  X,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    promoDiscount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    shippingFee,
    total,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput("");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Bar */}
      <div className="border-b border-neutral-100 bg-[#FAF9F6] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-xs text-neutral-400 space-x-2 mb-3">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Shopping Bag</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight">
            Shopping Bag {totalItems > 0 ? `(${totalItems})` : ""}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cart.length === 0 ? (
          /* Empty Bag State */
          <div className="py-20 text-center max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-neutral-900 font-light mb-2">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                Explore our curated autumn/winter collection and discover timeless
                silhouettes crafted from sustainable cashmere and structured wool.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/products?filter=new"
                className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 text-white text-xs uppercase font-semibold tracking-[0.2em] hover:bg-[#C5A880] transition-colors"
              >
                Shop New Arrivals
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto px-6 py-3.5 border border-neutral-300 text-neutral-800 text-xs uppercase font-semibold tracking-[0.2em] hover:border-black transition-colors"
              >
                Browse All Editions
              </Link>
            </div>
          </div>
        ) : (
          /* Populated Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Bag Items (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-900">
                  Item Details
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-red-700 transition-colors underline"
                >
                  Clear Bag
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-100">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                  >
                    {/* Item Image + Details */}
                    <div className="flex gap-4 items-center">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="relative w-20 h-24 bg-neutral-100 overflow-hidden shrink-0 group"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                          {item.product.categoryName}
                        </span>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="font-serif text-sm sm:text-base text-neutral-900 hover:text-[#C5A880] transition-colors block line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-xs text-neutral-500 flex items-center gap-3">
                          <span>Color: {item.selectedColor}</span>
                          <span>&bull;</span>
                          <span>Size: {item.selectedSize}</span>
                        </div>
                        <div className="text-xs font-semibold text-neutral-900 sm:hidden pt-1">
                          ${item.product.price} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price & Delete */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-300 h-9">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 text-neutral-600 hover:text-black text-sm"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 text-neutral-600 hover:text-black text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right min-w-[70px]">
                        <span className="text-sm font-semibold text-neutral-900 block">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-neutral-400 block">
                            ${item.product.price} each
                          </span>
                        )}
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-700 hover:text-neutral-950 transition-colors"
                >
                  <span>&larr; Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary Card (5 cols on lg) */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF9F6] border border-neutral-200 p-6 sm:p-8 space-y-6">
                <h2 className="font-serif text-xl text-neutral-900 font-light border-b border-neutral-200 pb-4">
                  Order Summary
                </h2>

                {/* Subtotal & Breakdown */}
                <div className="space-y-3 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Bag Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-neutral-900">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-700 font-medium">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>-${promoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-medium text-neutral-900">
                      {shippingFee === 0 ? (
                        <span className="text-[#C5A880] font-semibold">
                          Complimentary
                        </span>
                      ) : (
                        `$${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Import Tax</span>
                    <span className="text-neutral-500 italic">
                      Included in Price
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-4 border-t border-neutral-200">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-white border border-green-300 text-xs">
                      <div className="flex items-center gap-2 text-green-800 font-medium">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Code &quot;{appliedPromo}&quot; Active</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-neutral-400 hover:text-red-600"
                        title="Remove promo code"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-2">
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-600 font-semibold">
                        Promo Code or Gift Card
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Try AURORA15"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="bg-white border border-neutral-300 px-3 py-2 text-xs uppercase tracking-wider flex-1 focus:outline-none focus:border-neutral-900"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#C5A880] transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoFeedback && (
                        <p
                          className={`text-xs ${
                            promoFeedback.success
                              ? "text-green-700 font-medium"
                              : "text-red-600"
                          }`}
                        >
                          {promoFeedback.message}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-base text-neutral-900 font-normal">
                      Estimated Total
                    </span>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                      Includes all applicable duties
                    </p>
                  </div>
                  <span className="font-serif text-2xl font-semibold text-neutral-900">
                    ${total.toLocaleString()}
                  </span>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-4 bg-neutral-900 text-white text-xs uppercase font-semibold tracking-[0.2em] hover:bg-[#C5A880] hover:text-neutral-950 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Proceed to Checkout</span>
                </button>

                {/* Reassurance Badges */}
                <div className="pt-4 space-y-2.5 text-xs text-neutral-500 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Free express delivery on orders over $200</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Secure 256-Bit SSL payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Preview Modal for Template Developers */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setCheckoutModalOpen(false)}
          />
          <div className="relative bg-white max-w-lg w-full p-8 shadow-2xl border border-neutral-200 space-y-6 animate-fadeIn">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
                Aurora Reference Template
              </span>
              <h3 className="font-serif text-2xl text-neutral-900 font-light mt-1">
                Checkout Integration Ready
              </h3>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed font-light">
              This standalone template is engineered for seamless pairing with
              Zavro store backends or headless ecommerce APIs (Shopify Storefront,
              Stripe Checkout, Medusa, or custom Zavro API endpoints).
            </p>

            <div className="p-4 bg-[#FAF9F6] border border-neutral-200 text-xs text-neutral-700 space-y-1.5">
              <div className="font-semibold text-neutral-900">
                Order Payload Preview:
              </div>
              <div>Items count: {totalItems}</div>
              <div>Subtotal: ${subtotal}</div>
              <div>Discount: ${promoDiscount}</div>
              <div>Shipping: ${shippingFee}</div>
              <div className="font-bold text-neutral-950 pt-1 border-t border-neutral-300">
                Final Payable Amount: ${total}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="flex-1 py-3 bg-neutral-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setCheckoutModalOpen(false);
                }}
                className="py-3 px-4 border border-neutral-300 text-neutral-700 text-xs uppercase tracking-wider font-semibold hover:border-black"
              >
                Simulate Order Placed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
