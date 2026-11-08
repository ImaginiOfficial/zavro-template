"use client";

import React, { useState } from "react";
import { Mail, Check, ArrowRight } from "lucide-react";

interface NewsletterProps {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

export default function Newsletter({
  heading = "Join The Aurora Atelier",
  subheading = "Receive invitations to private seasonal sales, runway previews, and enjoy 15% off your initial acquisition.",
  buttonText = "Subscribe",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-[#121212] text-white border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Icon */}
        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-5 h-5 text-[#C5A880]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white mb-3">
          {heading}
        </h2>

        {/* Subheading */}
        <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mx-auto mb-8 leading-relaxed">
          {subheading}
        </p>

        {/* Subscription Form */}
        {subscribed ? (
          <div className="p-4 bg-neutral-900 border border-[#C5A880]/50 max-w-md mx-auto text-center animate-fadeIn">
            <div className="flex items-center justify-center gap-2 text-[#C5A880] text-sm font-medium mb-1">
              <Check className="w-4 h-4" />
              <span>Welcome to the Atelier</span>
            </div>
            <p className="text-xs text-neutral-300">
              Your 15% invitation code <strong>AURORA15</strong> is ready to use at checkout.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch justify-center max-w-md mx-auto gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 px-4 py-3.5 text-xs tracking-wider focus:outline-none focus:border-[#C5A880] flex-1 rounded-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-neutral-950 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#C5A880] hover:text-white transition-all flex items-center justify-center gap-2 shrink-0 group"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-neutral-500 mt-5 font-light">
          By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
