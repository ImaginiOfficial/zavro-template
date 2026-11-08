"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

interface AnnouncementBarProps {
  text?: string;
  link?: string;
}

export default function AnnouncementBar({
  text = "Complimentary worldwide express shipping on orders over $200 | Use code AURORA15 for 15% off",
  link = "/products",
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative bg-[#121212] text-[#F3EDE2] text-xs font-medium tracking-wider uppercase py-2.5 px-4 border-b border-[#262626]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left spacer for balance on desktop */}
        <div className="hidden md:flex items-center space-x-2 text-[11px] text-[#A3A3A3]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
          <span>AUTUMN / WINTER 2026 ATELIER</span>
        </div>

        {/* Center message with link */}
        <div className="flex-1 text-center truncate px-2">
          <Link
            href={link}
            className="inline-flex items-center justify-center gap-1.5 hover:text-[#C5A880] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880] hidden sm:inline shrink-0" />
            <span className="truncate">{text}</span>
          </Link>
        </div>

        {/* Right side currency / close */}
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="hidden lg:inline text-[#A3A3A3]">USD ($)</span>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="text-[#A3A3A3] hover:text-white transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
