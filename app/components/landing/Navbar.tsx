"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 md:px-8">
      <nav className="w-full max-w-7xl glass px-4 py-3 rounded-full flex items-center justify-between shadow-2xl bg-black/40 backdrop-blur-xl border border-white/10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-primary transition-colors">
            <span className="relative top-[1px]">D</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
            DYVE
          </span>
        </Link>

        {/* Links (Centered absolute on desktop or flex in middle) */}
        {/* Using absolute positioning to ensure perfect centering if no overlap, or just flex-1 justify-center */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="#" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            DeFi App
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Assets
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Pricing
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 border border-white/5"
          >
            Dashboard <ArrowUpRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
