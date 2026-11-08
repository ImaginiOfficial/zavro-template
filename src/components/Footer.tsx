"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

interface FooterProps {
  brandDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  copyrightText?: string;
}

export default function Footer({
  brandDescription = "Aurora celebrates modern minimalism with an uncompromising devotion to master craftsmanship, enduring fabrics, and responsible luxury.",
  contactEmail = "concierge@aurorafashion.com",
  contactPhone = "+1 (800) 458-2971",
  copyrightText = "© 2026 AURORA. All rights reserved. Built for Zavro.",
}: FooterProps) {
  return (
    <footer className="bg-[#0B0B0B] text-neutral-400 text-xs border-t border-neutral-900">
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info & Mission (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.25em] font-medium text-white block">
                AURORA
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                Haute Couture & Ready-to-Wear
              </span>
            </Link>

            <p className="text-neutral-400 font-light leading-relaxed max-w-sm">
              {brandDescription}
            </p>

            {/* Direct Contact Info */}
            <div className="space-y-2 pt-2 text-[11px] text-neutral-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <a
                  href={`tel:${contactPhone}`}
                  className="hover:text-white transition-colors"
                >
                  {contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Atelier: 442 Avenue Montaigne, 75008 Paris</span>
              </div>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-wider uppercase text-white font-normal">
              Collections
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/products?filter=new"
                  className="hover:text-white transition-colors inline-block"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=women"
                  className="hover:text-white transition-colors inline-block"
                >
                  Women&apos;s Ready-to-Wear
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=men"
                  className="hover:text-white transition-colors inline-block"
                >
                  Men&apos;s Tailoring
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=outerwear"
                  className="hover:text-white transition-colors inline-block"
                >
                  Structured Outerwear
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=bags"
                  className="hover:text-white transition-colors inline-block"
                >
                  Handcrafted Bags
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=accessories"
                  className="hover:text-white transition-colors inline-block"
                >
                  Fine Jewelry & Accents
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Client Concierge */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-wider uppercase text-white font-normal">
              Client Concierge
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/cart"
                  className="hover:text-white transition-colors inline-block"
                >
                  View Shopping Bag
                </Link>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Complimentary Returns
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Sartorial Size Guide
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Garment & Fabric Care
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Track Your Order
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Book Private Fitting
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: The Maison */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm tracking-wider uppercase text-white font-normal">
              The Maison
            </h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Our Atelier Philosophy
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Sustainable Sourcing
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  European Artisans
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Press & Editorial
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-not-allowed">
                  Zavro Template Specs
                </span>
              </li>
            </ul>

            {/* Social links */}
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-2.5">
                Connect With Us
              </p>
              <div className="flex items-center space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Aurora on Instagram"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Aurora on X"
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            <p>{copyrightText}</p>
          </div>

          {/* Payment & Security Badges */}
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="px-2 py-0.5 border border-neutral-800 rounded-xs text-[10px] tracking-wider uppercase">
              VISA
            </span>
            <span className="px-2 py-0.5 border border-neutral-800 rounded-xs text-[10px] tracking-wider uppercase">
              MC
            </span>
            <span className="px-2 py-0.5 border border-neutral-800 rounded-xs text-[10px] tracking-wider uppercase">
              AMEX
            </span>
            <span className="px-2 py-0.5 border border-neutral-800 rounded-xs text-[10px] tracking-wider uppercase">
              APPLE PAY
            </span>
            <span className="text-[10px] text-[#C5A880] font-medium">
              256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
