"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  promoDiscount: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shippingFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoPercent, setPromoPercent] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("aurora_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedPromo = localStorage.getItem("aurora_promo");
      if (savedPromo) {
        const { code, percent } = JSON.parse(savedPromo);
        setAppliedPromo(code);
        setPromoPercent(percent);
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("aurora_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [cart, isInitialized]);

  // Save promo to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (appliedPromo) {
        localStorage.setItem(
          "aurora_promo",
          JSON.stringify({ code: appliedPromo, percent: promoPercent })
        );
      } else {
        localStorage.removeItem("aurora_promo");
      }
    } catch (e) {
      console.error("Failed to save promo to storage", e);
    }
  }, [appliedPromo, promoPercent, isInitialized]);

  const addToCart = (
    product: Product,
    quantity = 1,
    color = product.colors[0]?.name || "Default",
    size = product.sizes[0] || "Standard"
  ) => {
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "AURORA15") {
      setAppliedPromo("AURORA15");
      setPromoPercent(15);
      return { success: true, message: "Promo code AURORA15 applied (15% off)!" };
    } else if (cleanCode === "WELCOME10") {
      setAppliedPromo("WELCOME10");
      setPromoPercent(10);
      return { success: true, message: "Welcome promo applied (10% off)!" };
    } else if (cleanCode === "FREESHIP") {
      setAppliedPromo("FREESHIP");
      setPromoPercent(0);
      return { success: true, message: "Complimentary shipping applied!" };
    } else {
      return { success: false, message: "Invalid promo code. Try AURORA15 or WELCOME10" };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoPercent(0);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const promoDiscount = subtotal > 0 ? Math.round((subtotal * promoPercent) / 100) : 0;
  const shippingFee =
    subtotal === 0 || appliedPromo === "FREESHIP" || subtotal >= 200 ? 0 : 25;
  const total = Math.max(0, subtotal - promoDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

